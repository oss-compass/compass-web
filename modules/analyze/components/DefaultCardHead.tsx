import React from 'react';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';

export interface CardHeadProps {
  id?: string;
  title?: string;
  description?: string;
  fullScreen: boolean;
  onFullScreen: (v: boolean) => void;
}

const DefaultCardHead: React.FC<CardHeadProps> = ({
  id,
  title,
  description,
  onFullScreen,
  fullScreen,
}) => {
  return (
    <>
      <h2
        className="group -mt-[88px] mb-2 pt-[88px] text-lg font-semibold"
        id={id}
      >
        {title}
        <a href={`#${id}`}>
          <span className="invisible ml-2 cursor-pointer group-hover:visible group-hover:text-primary">
            #
          </span>
        </a>
      </h2>
      <span
        className="absolute right-4 top-4 cursor-pointer p-2 md:hidden"
        onClick={() => {
          onFullScreen(!fullScreen);
        }}
      >
        {fullScreen ? <BiExitFullscreen /> : <BiFullscreen />}
      </span>
      <p className="mb-4 text-sm">{description}</p>
    </>
  );
};

export default DefaultCardHead;
