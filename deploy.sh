#!/bin/bash

npm run build
cd dist || exit
git init
git remote add origin git@github.com:octo_camo/frontend.spb.ru.git
git checkout -b gh-pages
git add .
git commit -m 'deploy'
git push --set-upstream origin gh-pages -f
cd ..