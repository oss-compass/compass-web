import { resolve } from 'node:path';
import fs from 'fs-extra';
import simpleGit, { SimpleGitProgressEvent } from 'simple-git';
import yaml from 'yaml';
import Joi from 'joi';
import throttle from 'lodash/throttle';
import collectionConfig from './config.json';

const log = throttle(console.log.bind(null), 100);

const git = simpleGit({
  progress({ method, stage, progress }: SimpleGitProgressEvent) {
    log(`git.${method} ${stage} stage ${progress}% complete`);
  },
});

const GIT_ADDRESS =
  'https://github.com/oss-compass/compass-projects-information.git';
const LOCAL_PATH_REPO = './script/tmp/compass-projects-information';

const LEVEL_1_YML = './script/tmp/compass-projects-information/collections.yml';
const LEVEL_2_DIR_COLLECTIONS =
  './script/tmp/compass-projects-information/collections';

const DIST_MENU_JSON = './public/data/collections—menus.json';
const DIST_DATA_JSON = './public/data/collections.json';

async function cloneRepo() {
  console.log('clone repo...', GIT_ADDRESS);
  await fs.remove(LOCAL_PATH_REPO);
  const res = await git.clone(GIT_ADDRESS, LOCAL_PATH_REPO, {});

  if (res) {
    console.log(res);
  }
}

async function parseLevel1Yml() {
  const levelFile = await fs.readFile(LEVEL_1_YML, { encoding: 'utf-8' });
  return yaml.parse(levelFile);
}

async function validateLevel1Yml(data: any) {
  const LSchema = Joi.array().items(
    Joi.object({
      ident: Joi.string().min(1),
      name: Joi.string().min(1),
      name_cn: Joi.string().min(1),
      items: Joi.array().unique().items(Joi.string()),
    })
  );
  const { error } = LSchema.validate(data);
  if (error) {
    console.log(error);
    return false;
  }

  console.log('validateLevel1Yml success!');
  return true;
}

async function parseLevel2Yml() {
  const files = (await fs.readdir(LEVEL_2_DIR_COLLECTIONS)).filter((f) =>
    f.endsWith('.yml')
  );
  const collectionsData: Record<string, object> = {};

  for (const f of files) {
    const p = resolve(
      __dirname,
      `tmp/compass-projects-information/collections/${f}`
    );
    const ymlContent = await fs.readFile(p, { encoding: 'utf-8' });
    const jsonContent = yaml.parse(ymlContent);

    const ident = jsonContent.ident.toLowerCase();
    collectionsData[ident] = jsonContent;
  }
  return collectionsData;
}

async function validateLevel2Yml(data: any) {
  const hot_collections = collectionConfig.hot_collections;
  const hasHotItems = hot_collections.every((id) => {
    return data[id];
  });
  if (!hasHotItems) {
    console.log(
      'error: data should included hot collections: ',
      hot_collections
    );
    return false;
  }

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

  const v = keys.every((key) => {
    const obj = data[key];
    const { error } = CollectionSchema.validate(obj);
    if (error) {
      console.log(error);
      return false;
    }
    return true;
  });

  console.log('validateLevel2Yml success!');
  return v;
}

async function handle() {
  await cloneRepo();

  // first-level directory
  const level1Data = await parseLevel1Yml();
  const validate = await validateLevel1Yml(level1Data);
  if (!validate) {
    return;
  }

  // secondary directory and content
  const contentData = await parseLevel2Yml();
  const validateContent = await validateLevel2Yml(contentData);
  if (!validateContent) {
    return;
  }

  // extract name info
  const MenuData = level1Data.map((menu: any) => {
    menu.items_info = menu.items
      .map((id: any) => {
        const ident = id.toLowerCase();
        const info = contentData[ident] as any;
        if (!info) {
          console.log(
            'Warning: cant`t find this in collections.json -> ',
            ident
          );
          return;
        }

        return {
          ident: info.ident,
          name: info.name,
          name_cn: info.name_cn,
          slug: info.slug,
        };
      })
      .filter(Boolean);
    return menu;
  });

  console.log();
  await fs.writeJSON(DIST_MENU_JSON, MenuData);
  console.log('collections menu json generate success!');

  await fs.writeJSON(DIST_DATA_JSON, contentData);
  console.log('collections content generate success!');
  console.log();
}

handle().catch((e) => {
  console.log(e);
  console.log();
  process.exit(1);
});
