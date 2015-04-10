#!/bin/sh
set -e

chmod 600 .travis/deploy.pem
ssh-add .travis/deploy.pem

if [ "$1" = "develop" ]
then
    git remote add ci dokku@alpha.dashboardhub.io:ci && git push ci $GIT_TAG:master -f
    ssh dokku@alpha.dashboardhub.io run ci php app/console doctrine:schema:update --force
fi
