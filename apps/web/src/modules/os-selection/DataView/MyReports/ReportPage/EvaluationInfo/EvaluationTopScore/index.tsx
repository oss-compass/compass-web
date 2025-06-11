import React from 'react';
import Pie from './Pie';

const EvaluationTopScore = ({ items, score }) => {
  const clickAnchor = (e: any, id: string) => {
    e.preventDefault();
    let anchorElement = document.getElementById(id);
    if (anchorElement) {
      anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };
  return (
    <div className="mt-6 flex h-52 border bg-[#fafafa]">
      <div className="flex h-full w-40 items-center ">
        <Pie score={score} />
      </div>
      <div className="flex-1 px-6 pt-5">
        {items?.map(({ name, score }) => {
          return (
            <div key={name} className="mb-2 flex h-9 w-full  border bg-white">
              <div
                onClick={(e) => clickAnchor(e, name)}
                className="flex min-w-[175px]  cursor-pointer items-center justify-start px-3 font-semibold"
              >
                <a className="ml-1 mr-1 whitespace-nowrap font-semibold hover:underline">
                  {name}
                </a>
              </div>
              <div className="flex w-[50px] items-center justify-center bg-[#e5e5e5] px-2 font-semibold">
                {score}
              </div>
              <div className="flex flex-1 items-center justify-center px-3">
                <div className="h-1 w-full bg-[#e5e5e5]">
                  <div
                    className="h-1"
                    style={{
                      width: `${score}%`,
                      backgroundColor: score > 60 ? '#4ade80' : '#f8961e',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EvaluationTopScore;
