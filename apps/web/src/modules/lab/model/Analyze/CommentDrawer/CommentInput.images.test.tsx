import React, { createRef } from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { toast } from 'react-hot-toast';
import { convertBase64 } from '@common/utils/file';
import CommentInput, { InputRefProps } from './CommentInput';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
jest.mock('react-hot-toast', () => ({ toast: { error: jest.fn() } }));
jest.mock('@common/utils/file', () => ({ convertBase64: jest.fn() }));
jest.mock('@common/hooks/useImagePreview', () => ({
  __esModule: true,
  default: () => ({ ref: jest.fn(), open: jest.fn(), close: jest.fn() }),
}));
jest.mock('./ImageItem', () => ({
  __esModule: true,
  default: () => <span role="img" aria-label="attachment" />,
}));

const files = (count: number) =>
  Array.from(
    { length: count },
    (_, i) => new File(['image'], `image-${i}.png`, { type: 'image/png' })
  );

describe.each(['picker', 'paste'])('Lab comment images via %s', (source) => {
  beforeEach(() => {
    jest.clearAllMocks();
    (convertBase64 as jest.Mock).mockResolvedValue(
      'data:image/png;base64,aW1hZ2U='
    );
  });

  function add(container: HTMLElement, count: number) {
    if (source === 'picker') {
      fireEvent.change(
        screen.getByLabelText('', { selector: 'input[type="file"]' }),
        { target: { files: files(count) } }
      );
    } else {
      fireEvent.paste(screen.getByRole('textbox'), {
        clipboardData: { files: files(count) },
      });
    }
  }

  it('rejects a sixth image before conversion, matching create/update mutation limits', () => {
    const { container } = render(
      <CommentInput loading={false} onSubmit={jest.fn()} />
    );
    add(container, 6);
    expect(convertBase64).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('up to five pictures');
  });

  it('allows five images to be submitted', async () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <CommentInput loading={false} onSubmit={onSubmit} />
    );
    add(container, 5);
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(5));
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'comment' },
    });
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    expect(onSubmit.mock.calls[0][1]).toHaveLength(5);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('counts existing attachments when editing a comment', () => {
    const ref = createRef<InputRefProps>();
    const { container } = render(
      <CommentInput ref={ref} loading={false} onSubmit={jest.fn()} />
    );
    act(() =>
      ref.current.backFill(
        'comment',
        files(4).map((file, id) => ({
          id,
          name: file.name,
          base64: `/files/${id}.png`,
        }))
      )
    );
    add(container, 2);
    expect(convertBase64).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('up to five pictures');
  });
});
