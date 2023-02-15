import { resolve } from 'node:path';
import fs from 'fs-extra';
import simpleGit from 'simple-git';
import yaml from 'yaml';

const git = simpleGit();

const repoPath = './script/tmp/compass-projects-information';
const collectionsDir = './script/tmp/compass-projects-information/collections';
const gitAddress =
  'https://github.com/EdmondFrank/compass-projects-information.git';

async function handle() {
  console.log('start generate collections json...');

  await fs.remove(repoPath);
  const res = await git.clone(gitAddress, repoPath);
  console.log(res);
  const files = await fs.readdir(collectionsDir);
  const collectionsData: Record<string, object> = {};

  for (const f of files) {
    const p = resolve(
      __dirname,
      `tmp/compass-projects-information/collections/${f}`
    );
    const ymlContent = await fs.readFile(p, { encoding: 'utf-8' });
    const jsonContent = yaml.parse(ymlContent);
    const ident = jsonContent.ident;
    collectionsData[ident] = jsonContent;
  }

  await fs.writeJSON('./script/tmp/collections.json', collectionsData);

  console.log('collections.json generate success!');
  console.log();
}

handle().catch((e) => {
  console.log('collections.json generate failed!');
  console.log(e);
  console.log();
  process.exit(1);
});
