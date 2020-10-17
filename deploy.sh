#!/usr/bin/env sh

npm run build && cp CNAME dist -f && cd dist && git commit -am 'deploy' && git push origin gh-pages

cd - || return
