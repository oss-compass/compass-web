import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';

const Timer = ({
  time = 20,
  setActiveFun,
  stop,
}: {
  time?: number;
  setActiveFun: () => void;
  stop: boolean;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      !stop &&
        setProgress((prevProgress) => {
          if (prevProgress >= 101) {
            setActiveFun();
            return 0;
          } else {
            return prevProgress + 10 / time;
          }
        });
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [stop, time, setActiveFun]);

  return (
    <div>
      <Progress
        className="p-0"
        percent={progress}
        size="small"
        showInfo={false}
        strokeColor={'#52c41a'}
        trailColor={'transparent'}
      />
    </div>
  );
};
export default Timer;
