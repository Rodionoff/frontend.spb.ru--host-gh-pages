#!/usr/bin/env sh

rm -rf dist && npm run build && cd dist && git commit -am 'deploy' && git push origin master:gh-pages

cd - || return
