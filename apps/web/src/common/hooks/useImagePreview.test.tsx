import { fireEvent, render } from '@testing-library/react';

import useImagePreview from './useImagePreview';

jest.mock('viewerjs', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
    show: jest.fn(),
  })),
}));

const Viewer = require('viewerjs').default as jest.Mock;

const Harness = () => {
  const { ref, open, close } = useImagePreview();
  return (
    <>
      <div ref={ref} data-testid="gallery">
        <img alt="preview" />
      </div>
      <button onClick={open}>open</button>
      <button onClick={close}>close</button>
    </>
  );
};

describe('useImagePreview', () => {
  beforeEach(() => Viewer.mockClear());

  it('recreates a viewer after close instead of calling show on a destroyed instance', () => {
    const { getByText } = render(<Harness />);

    fireEvent.click(getByText('open'));
    const firstViewer = Viewer.mock.results[0].value;
    fireEvent.click(getByText('close'));
    expect(firstViewer.destroy).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText('open'));
    expect(Viewer).toHaveBeenCalledTimes(2);
    expect(Viewer.mock.results[1].value.show).toHaveBeenCalledTimes(1);
    expect(firstViewer.show).toHaveBeenCalledTimes(1);
  });

  it('does not destroy the same viewer twice during unmount cleanup', () => {
    const { unmount } = render(<Harness />);
    const viewer = Viewer.mock.results[0].value;

    unmount();
    expect(viewer.destroy).toHaveBeenCalledTimes(1);
  });
});
