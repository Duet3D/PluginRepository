#!/usr/bin/env sh

rm -rf src/.vuepress/dist/
rm -rf .vuepress

set -e

cd src
ln -s ../plugins/
cd ../

npm run build

cd src/.vuepress/dist

git init
git add -A
git commit -m "New Deployment"

git push -f git@github.com:Duet3D/PluginRepository.git master:gh-pages

cd -
