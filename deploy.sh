#!/usr/bin/env sh

npm run build && cd dist && git commit -am 'deploy' && git push origin master:gh-pages

cd - || return
