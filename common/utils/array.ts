export function padArrayStart<T>(arr: T[], len: number, padding: T): T[] {
  return Array(len - arr.length)
    .fill(padding)
    .concat(arr);
}
