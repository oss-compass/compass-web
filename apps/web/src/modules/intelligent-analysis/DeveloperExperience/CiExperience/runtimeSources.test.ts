/** @jest-environment node */
import fs from 'fs';
import path from 'path';

it('keeps report and overview runtime dependency graphs free of bundled datasets', () => {
  const base = __dirname;
  const visited = new Set<string>();
  const pending = [
    path.join(base, 'index.tsx'),
    path.join(base, 'components/CiOverviewPanel.tsx'),
  ];
  while (pending.length) {
    const file = pending.pop()!;
    if (visited.has(file)) continue;
    visited.add(file);
    const source = fs.readFileSync(file, 'utf8');
    expect(source).not.toMatch(/\bCI_DATA\b|\bCI_JOURNEY\b/);
    for (const match of Array.from(
      source.matchAll(
        /(?:from\s+|import\s*\(|require\s*\()\s*['"]([^'"]+)['"]/g
      )
    )) {
      const ref = match[1];
      if (!ref.startsWith('.')) continue;
      const target = path.resolve(path.dirname(file), ref);
      if (!target.startsWith(base + path.sep)) continue;
      expect(target).not.toMatch(/\.json$/);
      const resolved = [
        target + '.ts',
        target + '.tsx',
        path.join(target, 'index.ts'),
        path.join(target, 'index.tsx'),
      ].find((candidate) => fs.existsSync(candidate));
      if (resolved) pending.push(resolved);
    }
  }
  expect(visited.size).toBeGreaterThan(15);
});
