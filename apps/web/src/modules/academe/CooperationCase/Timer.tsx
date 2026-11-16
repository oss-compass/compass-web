import React, { useState, useEffect, useRef } from 'react';
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

  // setActiveFun 存 ref：父组件传的 inline 闭包每次渲染都是新引用，
  // 放在 effect deps 里导致 interval 频繁重建。
  const activeFunRef = useRef(setActiveFun);
  activeFunRef.current = setActiveFun;

  useEffect(() => {
    const interval = setInterval(() => {
      !stop &&
        setProgress((prevProgress) =>
          prevProgress >= 101 ? 0 : prevProgress + 10 / time
        );
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [stop, time]);

  // 到达终点在 effect 中推进（updater 必须是纯函数——React 在 StrictMode
  // 与中断渲染下可能重复调用 updater，其中的 setActiveFun 会双触发）。
  useEffect(() => {
    if (progress >= 101) {
      activeFunRef.current();
    }
  }, [progress]);

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
