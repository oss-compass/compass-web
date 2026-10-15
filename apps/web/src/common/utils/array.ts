export function padArrayStart<T>(arr: T[], len: number, padding: T): T[] {
  return Array(Math.max(0, len - arr.length))
    .fill(padding)
    .concat(arr);
}
