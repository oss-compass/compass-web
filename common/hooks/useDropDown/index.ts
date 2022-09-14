import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

interface Props {
  totalLength: number;
  onPressEnter: () => void;
}

const useDropDown = ({ totalLength, onPressEnter }: Props) => {
  const [active, setActive] = useState(-1);
  const max = totalLength - 1;

  useHotkeys(
    'up,down,enter',
    (e, he) => {
      e.preventDefault();
      const press = he.key;
      // press first time
      if ((press === 'up' || press === 'down') && active === -1) {
        setActive(0);
        return;
      }
      // press up
      if (press === 'up' && active > 0) {
        setActive((p) => --p);
        return;
      }
      // press down
      if (press === 'down' && active < max) {
        setActive((p) => ++p);
        return;
      }
      // press enter,  navigate to analyze page
      if (press === 'enter' && active > -1) {
        onPressEnter();
      }
    },
    { enableOnTags: ['INPUT'] }
  );

  return {
    active,
    setActive,
  };
};

export default useDropDown;
