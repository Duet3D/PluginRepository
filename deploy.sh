#!/usr/bin/env sh

rm -rf src/.vuepress/dist/
rm -rf .vuepress

set -e

npm run build

cd src/.vuepress/dist

# cd .vuepress/dist
# mv assets ./src/assets
# cd src

git init
git add -A
git commit -m "New Deployment"

git push -f git@ssh.github.com:Duet3D/PluginRepository.git master:gh-pages

cd -
