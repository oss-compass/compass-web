#!/usr/bin/env bash


GIT_COMMIT=$(git log -1 --format=%h)

echo "commit:$GIT_COMMIT"

docker buildx build --platform linux/amd64 \
  -t "compass-web:$GIT_COMMIT" \
  -t "compass-web:latest" \
  --build-arg GIT_COMMIT="$GIT_COMMIT" \
  --build-arg REGISTRY="https://registry.npmmirror.com/" \
  --progress=plain \
  --file "./Dockerfile" \
  .
