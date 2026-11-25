import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ImageItem from './ImageItem';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
jest.mock('react-icons/ai', () => ({
  AiOutlineClose: () => <span>remove image</span>,
}));

describe('comment image deletion', () => {
  it('deletes the attachment without opening its preview or submitting a surrounding form', () => {
    const onDelete = jest.fn();
    const onClick = jest.fn();
    const onSubmit = jest.fn((event) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <ImageItem
          id={7}
          src="/image.png"
          onDelete={onDelete}
          onClick={onClick}
        />
      </form>
    );
    fireEvent.click(screen.getByText('remove image'));
    expect(onDelete).toHaveBeenCalledWith(7);
    expect(onClick).not.toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('still opens the preview when clicking the image itself', () => {
    const onClick = jest.fn();
    const onDelete = jest.fn();
    render(
      <ImageItem
        id={7}
        src="/image.png"
        onClick={onClick}
        onDelete={onDelete}
      />
    );
    fireEvent.click(screen.getByAltText(''));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('keeps read-only comment images previewable without a delete control', () => {
    const onClick = jest.fn();
    render(<ImageItem id={7} src="/image.png" onClick={onClick} />);
    expect(screen.queryByText('remove image')).not.toBeInTheDocument();
    fireEvent.click(screen.getByAltText(''));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
