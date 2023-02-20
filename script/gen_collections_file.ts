import { resolve } from 'node:path';
import fs from 'fs-extra';
import simpleGit from 'simple-git';
import yaml from 'yaml';
import Joi from 'joi';

const git = simpleGit();

const gitAddress =
  'https://github.com/oss-compass/compass-projects-information.git';
const repoClonePath = './script/tmp/compass-projects-information';
const collectionsDir = './script/tmp/compass-projects-information/collections';

async function handle() {
  console.log('start generate collections json...');

  await fs.remove(repoClonePath);
  const res = await git.clone(gitAddress, repoClonePath);
  console.log(res);

  const files = (await fs.readdir(collectionsDir)).filter((f) =>
    f.endsWith('.yml')
  );
  console.log(files);
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

  validatorData(collectionsData);
  await fs.writeJSON('./script/tmp/collections.json', collectionsData);

  console.log('collections.json generate success!');
  console.log();
}

function validatorData(data: any) {
  const CollectionSchema = Joi.object({
    ident: Joi.string().min(1),
    name: Joi.string().min(1),
    name_cn: Joi.string().min(1),
    slug: Joi.string().min(1).pattern(/^\/.+/),
    items: Joi.array()
      .unique()
      .items(
        Joi.string().pattern(/^https?:\/\/(www\.)?(github\.com|gitee\.com).+/)
      ),
  });

  const keys = Object.keys(data);
  keys.some((key) => {
    const obj = data[key];
    const { error } = CollectionSchema.validate(obj);
    if (error) {
      throw error;
    }
    return false;
  });

  console.log('validate success！！！');
}

handle().catch((e) => {
  console.log('collections.json generate failed!');
  console.log(e);
  console.log();
  process.exit(1);
});
