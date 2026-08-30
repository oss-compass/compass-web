import path from 'path';

// dataset/userId 等外部输入最终会拼进文件系统路径，
// 带路径分隔符时可以逃出数据集目录（如 userId=../../secret 读取任意 json 文件）
export function isSafePathSegment(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    value !== '..' &&
    !value.includes('/') &&
    !value.includes('\\')
  );
}

// 在 dir 内解析文件路径，逃出 dir 时返回 null
export function resolveFileInsideDir(
  dir: string,
  fileName: string
): string | null {
  const resolved = path.resolve(dir, fileName);
  const dirWithSep = dir.endsWith(path.sep) ? dir : dir + path.sep;
  return resolved.startsWith(dirWithSep) ? resolved : null;
}
