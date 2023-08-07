export const sumPre = (index: number, values: number[]): number => {
  let sum = 0;
  for (let i = 0; i < index; i++) {
    sum += values[i];
  }
  return sum;
};

export const getItem = (
  arr: number[],
  index: number,
  diff: number
): { result: number; left?: number } => {
  const isLast = index === arr.length - 1;
  let value = 0;

  const preSum = sumPre(index, arr);
  if (preSum >= 100) {
    return { result: 0 };
  }

  value = arr[index] - diff;
  if (value < 0) {
    return { result: 0, left: Math.abs(value) };
  }

  if (isLast) {
    value = 100 - preSum;
  }

  return { result: value };
};

export const adjustmentArray = (
  arr: number[],
  index: number,
  value: number
): number[] => {
  const isLast = index === arr.length - 1;
  let diff = value - arr[index];

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
