import { toFixed } from '@common/utils';

const hundredMarkList = [
  [0, 60],
  [60, 65],
  [65, 75],
  [75, 80],
  [80, 85],
  [85, 90],
  [90, 95],
  [95, 100],
];
const oneMarkList = [
  [0, 0.1],
  [0.1, 0.2],
  [0.2, 0.3],
  [0.3, 0.5],
  [0.5, 0.6],
  [0.6, 0.7],
  [0.7, 0.8],
  [0.8, 1],
];

export const transMarkingSystem = (oneMark: number): number | null => {
  if (oneMark === null || oneMark < 0 || oneMark > 1) {
    return null;
  }
  let index = 0;
  if (oneMark === 1) {
    index = oneMarkList.length - 1;
  } else {
    index = oneMarkList.findIndex((i) => oneMark >= i[0] && oneMark < i[1]);
  }
  const oneMarkArr = oneMarkList[index];
  const hundredMarkArr = hundredMarkList[index];
  const hundredMark =
    ((hundredMarkArr[1] - hundredMarkArr[0]) * (oneMark - oneMarkArr[0])) /
      (oneMarkArr[1] - oneMarkArr[0]) +
    hundredMarkArr[0];
  return toFixed(hundredMark, 2);
};
