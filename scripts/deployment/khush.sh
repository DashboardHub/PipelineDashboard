#!/bin/bash

# FUNCTIONS
(cd functions; npm install)
(cd functions/src/environments; sed -i 's/{{ GITHUB_WEBHOOK_SECRET }}/'$GITHUB_WEBHOOK_SECRET'/g' environment.ts)
(cd functions/src/environments; sed -i 's/{{ FIREBASE_FUNCTIONS_URL }}/us-central1-pipelinedashboard-khush/g' environment.ts)

# WEB
(cd web/src/environments; sed -i 's/x\.x\.x/v0.11.khush-'$TRAVIS_BUILD_NUMBER'-ALPHA/g' environment.prod.ts)
(cd web/src/environments; sed -i 's/{{ FIREBASE_API_KEY }}/'$FIREBASE_API_KEY_KHUSH'/g' environment.prod.ts)
(cd web/src/environments; sed -i 's/{{ FIREBASE_AUTH_DOMAIN }}/'$FIREBASE_AUTH_DOMAIN_KHUSH'/g' environment.prod.ts)
(cd web/src/environments; sed -i 's/{{ FIREBASE_DATABASE_URL }}/'$FIREBASE_DATABASE_URL_KHUSH'/g' environment.prod.ts)
(cd web/src/environments; sed -i 's/{{ FIREBASE_PROJECT_ID }}/'$FIREBASE_PROJECT_ID_KHUSH'/g' environment.prod.ts)
(cd web/src/environments; sed -i 's/{{ FIREBASE_STORAGE_BUCKET }}/'$FIREBASE_STORAGE_BUCKET_KHUSH'/g' environment.prod.ts)
(cd web/src/environments; sed -i 's/{{ FIREBASE_MESSAGING_SEND_ID }}/'$FIREBASE_MESSAGING_SEND_ID_KHUSH'/g' environment.prod.ts)

# DEPLOY
npm --prefix web run build:prod
firebase deploy --project pipelinedashboard-khush --token $FIREBASE_TOKEN_KHUSH --force
