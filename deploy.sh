#!/bin/bash

CURRENT=$(git branch --show-current)

npm run build
cd dist || exit
git init
git remote add origin git@github.com:rodionov80/frontend.spb.ru.git
git checkout -b gh-pages
git add .
git commit -m 'deploy'
git push --set-upstream origin gh-pages -f
cd ..
git checkout "$CURRENT"