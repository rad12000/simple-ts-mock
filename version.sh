#!/bin/sh

newVersion="patch"

while [ $# -gt 0 ] ; do
    case $1 in
        -v | --version) newVersion="$2" ;;
    esac
    shift
done

npm run build &&
git add ./ && 
git commit -m "Generated new build for versioning" && 
versionOutput=$(npm version $newVersion) &&
git add ./ && 
git commit -m "Did a ${newVersion} package version -> ${versionOutput}" &&
git push &&
npm publish