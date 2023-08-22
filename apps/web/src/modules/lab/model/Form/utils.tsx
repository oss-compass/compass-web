import Big from 'big.js';

export const sumPre = (index: number, values: number[]): number => {
  let sum = new Big(0);
  for (let i = 0; i < index; i++) {
    sum = sum.plus(values[i]);
  }
  return sum.toNumber();
};

export const getItem = (
  arr: number[],
  index: number,
  diff: number
): { result: number; left?: number } => {
  const isLast = index === arr.length - 1;
  let value = new Big(0);

  const preSum = sumPre(index, arr);
  if (preSum >= 100) {
    return { result: 0 };
  }

  value = new Big(arr[index]).minus(diff);
  if (value < 0) {
    return { result: 0, left: Math.abs(value) };
  }

  if (isLast) {
    value = new Big(100).minus(preSum);
  }

  return { result: value.toNumber() };
};

export const adjustmentArray = (
  arr: number[],
  index: number,
  value: number
): number[] => {
  const isLast = index === arr.length - 1;
  let diff = new Big(value).minus(arr[index]).toNumber();

  if (isLast) {
    const newArr = [...arr].reverse();
    newArr[0] = value;

    for (let i = 1; i < arr.length; i++) {
      const { result, left = 0 } = getItem(newArr, i, diff);
      newArr[i] = result;
      diff = left;
    }
    return newArr.reverse();
  } else {
    const newArr = [...arr];
    newArr[index] = value;

    for (let i = index + 1; i < arr.length; i++) {
      const { result, left = 0 } = getItem(newArr, i, diff);
      newArr[i] = result;
      diff = left;
    }
    return newArr;
  }
};
