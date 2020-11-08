#!/usr/bin/env sh

CURRENT=$(git branch --show-current)

npm run build
git checkout gh-pages
git commit -am 'deploy'
git push
cd ..
git checkout "$CURRENT"