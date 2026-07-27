'use strict';

import { useGiteeReleases, useGithubReleases } from 'ym-publish';
import { join } from 'path';
import { readFileSync } from 'fs';
import { createRequire } from 'module';

const __dirname = import.meta.dirname;

const require = createRequire(import.meta.url);

const { version, name } = require('../package.json');

const { GITEE_TOKEN, GH_TOKEN } = process.env;

const giteeRelease = useGiteeReleases({
  token: GITEE_TOKEN,
  repo: name,
  owner: 'yxingyus',
});

const githubRelease = useGithubReleases({
  token: GH_TOKEN,
  repo: name,
  owner: '2514765066',
});

//获取更新内容
const getDoc = (version) => {
  const url = join(__dirname, '../docs/release-note.md');

  const doc = readFileSync(url).toString();

  const reg = new RegExp(`## ${version}([\\s\\S]*?)##`);

  const match = doc.match(reg);

  return match ? match[1].trim() : '';
};

const main = async () => {
  const body = getDoc(version);

  const updatePackPath = join(__dirname, `../dist/${name}-${version}.exe`);

  await giteeRelease({
    version,
    body,
    updatePack: updatePackPath,
  });

  await githubRelease({
    version,
    body,
    updatePack: updatePackPath,
  });
};

main();
