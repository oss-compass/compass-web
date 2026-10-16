import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ImageWithFallback from './ImageFallback';

const renderImage = (src?: string) =>
  render(
    <ImageWithFallback
      src={src}
      fallbackSrc="/images/default.png"
      width={80}
      height={80}
      alt="logo"
    />
  );

describe('ImageFallback', () => {
  it('renders the given src', () => {
    renderImage('/avatars/a.png');
    expect(screen.getByAltText('logo')).toHaveAttribute(
      'src',
      expect.stringContaining('a.png')
    );
  });

  it('shows the fallback when the image fails to load', () => {
    renderImage('/avatars/a.png');
    fireEvent.error(screen.getByAltText('logo'));
    expect(screen.getByAltText('logo')).toHaveAttribute(
      'src',
      expect.stringContaining('default.png')
    );
  });

  it('follows a later src change on the same instance', () => {
    const { rerender } = renderImage('/avatars/a.png');
    expect(screen.getByAltText('logo')).toHaveAttribute(
      'src',
      expect.stringContaining('a.png')
    );

    rerender(
      <ImageWithFallback
        src="/avatars/b.png"
        fallbackSrc="/images/default.png"
        width={80}
        height={80}
        alt="logo"
      />
    );

    expect(screen.getByAltText('logo')).toHaveAttribute(
      'src',
      expect.stringContaining('b.png')
    );
  });

  it('leaves the fallback state when a new src is provided', () => {
    const { rerender } = renderImage('/avatars/broken.png');
    fireEvent.error(screen.getByAltText('logo'));
    expect(screen.getByAltText('logo')).toHaveAttribute(
      'src',
      expect.stringContaining('default.png')
    );

    rerender(
      <ImageWithFallback
        src="/avatars/working.png"
        fallbackSrc="/images/default.png"
        width={80}
        height={80}
        alt="logo"
      />
    );

    expect(screen.getByAltText('logo')).toHaveAttribute(
      'src',
      expect.stringContaining('working.png')
    );
  });
});
