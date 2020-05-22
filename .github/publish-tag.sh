#!/usr/bin/env bash

# usage ./publish-tag $npm_package_version

# get current commit hash for tag
commit=$(git rev-parse HEAD)

version=$1

# get repo name from git
remote=$(git config --get remote.origin.url)
repo=$(basename $remote .git)

# POST a new ref to repo via Github API
curl -s -X POST https://api.github.com/repos/$REPO_OWNER/$repo/git/refs \
-H "Authorization: token $GITHUB_TOKEN" \
-d @- << EOF
{
  "ref": "refs/tags/$version",
  "sha": "$commit"
}
EOF