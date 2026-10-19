import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import useDropDown from './index';

// react-hotkeys-hook binds through hotkeys-js, which matches on keyCode
// and tracks held keys, so each keyDown is paired with a keyUp.
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;

const Probe: React.FC<{
  totalLength: number;
  onPressEnter: () => void;
}> = ({ totalLength, onPressEnter }) => {
  const { active } = useDropDown({ totalLength, onPressEnter });
  return (
    <>
      <input aria-label="search" />
      <span data-testid="active">{active}</span>
    </>
  );
};

const activeIndex = () => screen.getByTestId('active').textContent;

const pressKey = (key: string, keyCode: number) => {
  fireEvent.keyDown(screen.getByLabelText('search'), { key, keyCode });
  fireEvent.keyUp(screen.getByLabelText('search'), { key, keyCode });
};

const pressUp = () => pressKey('ArrowUp', KEY_UP);
const pressDown = () => pressKey('ArrowDown', KEY_DOWN);
const pressEnter = () => pressKey('Enter', KEY_ENTER);

describe('useDropDown', () => {
  it('moves active with arrow keys and fires onPressEnter in bounds', () => {
    const onPressEnter = jest.fn();
    render(<Probe totalLength={3} onPressEnter={onPressEnter} />);

    expect(activeIndex()).toBe('-1');
    // first press highlights the first item
    pressDown();
    expect(activeIndex()).toBe('0');
    pressDown();
    expect(activeIndex()).toBe('1');
    pressUp();
    expect(activeIndex()).toBe('0');
    // stops at the last item
    pressDown();
    pressDown();
    expect(activeIndex()).toBe('2');
    pressDown();
    expect(activeIndex()).toBe('2');
    // enter on an in-bounds index confirms
    pressEnter();
    expect(onPressEnter).toHaveBeenCalledTimes(1);
  });

  it('resets an out-of-bounds active index when totalLength shrinks', () => {
    const onPressEnter = jest.fn();
    const { rerender } = render(
      <Probe totalLength={5} onPressEnter={onPressEnter} />
    );

    pressDown();
    pressDown();
    pressDown();
    pressDown();
    expect(activeIndex()).toBe('3');

    // the list narrows while index 3 is highlighted
    rerender(<Probe totalLength={2} onPressEnter={onPressEnter} />);
    expect(activeIndex()).toBe('-1');

    // enter must not confirm with the stale index
    pressEnter();
    expect(onPressEnter).not.toHaveBeenCalled();

    // keyboard navigation still works on the shorter list
    pressDown();
    expect(activeIndex()).toBe('0');
    pressDown();
    expect(activeIndex()).toBe('1');
    pressEnter();
    expect(onPressEnter).toHaveBeenCalledTimes(1);
  });

  it('does not highlight an item when the list is empty', () => {
    const onPressEnter = jest.fn();
    render(<Probe totalLength={0} onPressEnter={onPressEnter} />);

    pressDown();
    pressUp();
    expect(activeIndex()).toBe('-1');

    pressEnter();
    expect(onPressEnter).not.toHaveBeenCalled();
  });
});
