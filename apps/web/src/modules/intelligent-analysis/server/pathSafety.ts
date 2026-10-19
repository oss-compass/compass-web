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
  // dir may be written with POSIX separators or without a drive letter, while
  // path.resolve() returns a normalised, platform-native path, so the prefix
  // has to be resolved too instead of compared as the raw argument.
  const base = path.resolve(dir);
  const baseWithSep = base.endsWith(path.sep) ? base : base + path.sep;
  return resolved.startsWith(baseWithSep) ? resolved : null;
}
