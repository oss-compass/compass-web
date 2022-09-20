#!/usr/bin/env bash

#jq is a lightweight and flexible command-line JSON processor.
if ! [ -x "$(command -v jq)" ]; then
  echo "jq must be installed first: https://stedolan.github.io/jq/download/" >&2
  exit 1
fi

WORKING_DIR="."
NPM_PACKAGE_VERSION=$(cat "$WORKING_DIR/package.json" | jq -r '.version')

GIT_COMMIT=$(git log -1 --format=%h)

echo "version:$NPM_PACKAGE_VERSION"
echo "commit:$GIT_COMMIT"

docker buildx build --platform linux/amd64 \
  -t "compass-web:$GIT_COMMIT" \
  -t "compass-web:$NPM_PACKAGE_VERSION" \
  -t "compass-web:$NPM_PACKAGE_VERSION-$GIT_COMMIT" \
  -t "compass-web:latest" \
  --build-arg COMPASS_WEB_VERSION="$NPM_PACKAGE_VERSION" \
  --build-arg GIT_COMMIT="$GIT_COMMIT" \
  -f "./docker/Dockerfile" \
  .
