import React from 'react';
import { Title, Paragraph } from './components';

const Board = () => {
  return (
    <>
      <Title>Board</Title>
      <Paragraph>
        Our members are a powerful force for open innovation.
      </Paragraph>

      <div className="bg-[#171717] p-16">
        <div className="grid grid-cols-3 gap-7">
          {new Array(8).fill(0).map((_, index) => {
            return (
              <div className="" key={index}>
                <div className="mb-4 h-[160px] w-full bg-gray-100"></div>
                <div className="mb-2">Ted Turner</div>
                <div className="text-xs">
                  Ted Turner is the Founder and Chairman of the UN Foundation,
                  as well as Turner Enterprises, Inc. and former Vice Chairman
                  of Time Warner Inc., the world’s leading media company. He is
                  also the Founder of CNN, the world’s first live, 24-hour
                  global news network.
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Board;
