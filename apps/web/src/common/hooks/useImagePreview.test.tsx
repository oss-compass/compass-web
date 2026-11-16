import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import Viewer from 'viewerjs';
import useImagePreview from './useImagePreview';

type PreviewViewer = Viewer & {
  images: HTMLImageElement[];
  items: HTMLLIElement[];
};

const Preview = ({ images }: { images: string[] }) => {
  const { ref, open } = useImagePreview();
  return (
    <>
      <button onClick={open}>Open preview</button>
      {images.length > 0 ? (
        <div ref={ref} data-testid="preview-gallery">
          {images.map((source) =>
            React.createElement('img', {
              key: source,
              src: source,
              alt: source,
            })
          )}
        </div>
      ) : null}
    </>
  );
};

const getViewer = () =>
  (
    screen.getByTestId('preview-gallery') as HTMLElement & {
      viewer: PreviewViewer;
    }
  ).viewer;

const getSources = (viewer: PreviewViewer) =>
  viewer.images.map((image) => image.getAttribute('src'));

describe('useImagePreview', () => {
  beforeAll(() => {
    Viewer.setDefaults({ transition: false });
  });

  afterAll(() => {
    Viewer.setDefaults({ transition: true });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('includes images added after the gallery mounts', async () => {
    const { rerender } = render(<Preview images={['first.png']} />);
    const viewer = getViewer();
    expect(getSources(viewer)).toEqual(['first.png']);

    rerender(<Preview images={['first.png', 'second.png']} />);

    await waitFor(() => {
      expect(getSources(viewer)).toEqual(['first.png', 'second.png']);
    });
    expect(getViewer()).toBe(viewer);
  });

  it('removes deleted images from the viewer', async () => {
    const { rerender } = render(
      <Preview images={['first.png', 'second.png']} />
    );
    const viewer = getViewer();

    rerender(<Preview images={['second.png']} />);

    await waitFor(() => {
      expect(getSources(viewer)).toEqual(['second.png']);
    });
  });

  it('keeps the viewer order in sync with the gallery', async () => {
    const { rerender } = render(
      <Preview images={['first.png', 'second.png']} />
    );
    const viewer = getViewer();

    rerender(<Preview images={['second.png', 'first.png']} />);

    await waitFor(() => {
      expect(getSources(viewer)).toEqual(['second.png', 'first.png']);
    });
  });

  it('refreshes an already opened viewer after an image is replaced', async () => {
    const { rerender } = render(<Preview images={['first.png']} />);
    const viewer = getViewer();
    fireEvent.click(screen.getByRole('button', { name: 'Open preview' }));

    rerender(<Preview images={['replacement.png']} />);

    await waitFor(() => {
      expect(
        within(viewer.items[0])
          .getByRole('img', { hidden: true })
          .getAttribute('src')
      ).toBe(new URL('replacement.png', window.location.href).href);
    });
  });

  it('destroys the old viewer when the last image is removed', () => {
    const { rerender } = render(<Preview images={['first.png']} />);
    const viewer = getViewer();
    const destroy = jest.spyOn(viewer, 'destroy');

    rerender(<Preview images={[]} />);
    expect(destroy).toHaveBeenCalledTimes(1);

    rerender(<Preview images={['new.png']} />);
    expect(getViewer()).not.toBe(viewer);
    expect(getSources(getViewer())).toEqual(['new.png']);
  });

  it('refreshes the viewer when an existing image source changes', async () => {
    render(<Preview images={['first.png']} />);
    const viewer = getViewer();
    fireEvent.click(screen.getByRole('button', { name: 'Open preview' }));

    fireEvent.load(
      within(screen.getByTestId('preview-gallery')).getByRole('img', {
        name: 'first.png',
      }),
      { target: { src: 'replacement.png' } }
    );

    await waitFor(() => {
      expect(
        within(viewer.items[0])
          .getByRole('img', { hidden: true })
          .getAttribute('src')
      ).toBe(new URL('replacement.png', window.location.href).href);
    });
  });

  it('destroys the viewer on unmount', () => {
    const { unmount } = render(<Preview images={['first.png']} />);
    const destroy = jest.spyOn(getViewer(), 'destroy');

    unmount();

    expect(destroy).toHaveBeenCalledTimes(1);
  });
});
