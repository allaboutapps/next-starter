#!/bin/bash

DOCKERFILE_VERSION=$(sed -n '1s/.*node:\([0-9]*\).*/\1/p' Dockerfile)

NVMRC_VERSION=$(cat .nvmrc)

if [[ "$DOCKERFILE_VERSION" == "$NVMRC_VERSION" ]]; then
  echo "Versions match: $DOCKERFILE_VERSION"
else
  echo "Error: Versions do not match!"
  echo "Dockerfile version: $DOCKERFILE_VERSION"
  echo ".nvmrc version: $NVMRC_VERSION"
  exit 1
fi
