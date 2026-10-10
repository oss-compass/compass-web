const fs = require('node:fs');
const path = require('node:path');

const fixtureRoot = 'apps/web/test-fixtures/intelligent-analysis/user-detail';

// Authored from the route contract, never from a downloaded contributor record.
// Fixed identifiers and values make regeneration independent of time/network.
function getFixtures() {
  const row = (id, score) => ({
    用户ID: `synthetic:developer-${id}`,
    中文用户ID: `合成开发者 ${id}`,
    用户类型: '个人',
    所属组织: '未知',
    国家: '未知',
    总得分: score,
    邮箱: `developer-${id}@example.test`,
    主页: `https://example.test/developers/${id}`,
    合成生态得分: score,
    合成生态2024年得分: 0,
    合成生态2025年得分: score,
    合成生态2025年角色得分拆解: {},
    简介: null,
  });
  const records = {
    'main.json': { 'synthetic:developer-001': row('001', 0) },
    'fallback.json': { 'synthetic:developer-002': row('002', 12.5) },
    'backup.json': [row('003', 0)],
  };
  return Object.fromEntries(
    Object.entries(records).map(([name, value]) => [
      `${fixtureRoot}/${name}`,
      Buffer.from(JSON.stringify(value, null, 2) + '\n'),
    ])
  );
}

function generate(root, check = false) {
  let valid = true;
  for (const [file, expected] of Object.entries(getFixtures())) {
    const target = path.join(root, file);
    if (check) {
      if (!fs.existsSync(target) || !fs.readFileSync(target).equals(expected)) {
        valid = false;
      }
    } else {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, expected);
    }
  }
  return valid;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 1 || args[0] !== '--check')) {
    console.error('Usage: node scripts/fixtures/generate.js [--check]');
    process.exitCode = 1;
  } else if (
    !generate(path.resolve(__dirname, '../..'), args[0] === '--check')
  ) {
    console.error('Synthetic fixtures differ. Run yarn fixtures:generate.');
    process.exitCode = 1;
  } else {
    console.log('Synthetic fixtures are reproducible.');
  }
}

module.exports = { getFixtures, generate };
