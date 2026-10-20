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
  // String comparison with path.sep only works when `dir` uses the platform
  // separator: on Windows `path.resolve` returns "C:\..." while the dataset
  // directories are addressed with "/", so every file was rejected.
  const relative = path.relative(path.resolve(dir), resolved);
  if (
    relative === '' ||
    relative === '..' ||
    relative.startsWith('..' + path.sep) ||
    path.isAbsolute(relative)
  ) {
    return null;
  }
  return resolved;
}
