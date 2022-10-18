#!/bin/sh

newVersion="patch"

while [ $# -gt 0 ] ; do
    case $1 in
        -v | --version) newVersion="$2" ;;
    esac
    shift
done

npm run build &&
if [[ $(git diff --stat) != '' ]]; then
    git add ./ && 
    git commit -m "Generated new build for versioning"
fi &&
versionOutput=$(npm version $newVersion) && 
echo $versionOutput && 
if [[ $(git diff --stat) != '' ]]; then
    git add ./ && 
    git commit -m "Did a ${newVersion} package version -> ${versionOutput}"
fi &&
git push &&
npm publish &&
echo "Published to NPM"