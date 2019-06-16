#!/bin/bash

# FUNCTIONS
(cd functions; npm install)

# WEB
(cd web/src/environments; sed -i 's/x\.x\.x/v0.11.6-'$TRAVIS_BUILD_NUMBER'-ALPHA/g' environment.prod.ts)
(cd web/src/environments; sed -i 's/{{ FIREBASE_API_KEY }}/'$FIREBASE_API_KEY_EDDIE'/g' environment.prod.ts)
(cd web/src/environments; sed -i 's/{{ FIREBASE_AUTH_DOMAIN }}/'$FIREBASE_AUTH_DOMAIN_EDDIE'/g' environment.prod.ts)
(cd web/src/environments; sed -i 's/{{ FIREBASE_DATABASE_URL }}/'$FIREBASE_DATABASE_URL_EDDIE'/g' environment.prod.ts)
(cd web/src/environments; sed -i 's/{{ FIREBASE_PROJECT_ID }}/'$FIREBASE_PROJECT_ID_EDDIE'/g' environment.prod.ts)
(cd web/src/environments; sed -i 's/{{ FIREBASE_STORAGE_BUCKET }}/'$FIREBASE_STORAGE_BUCKET_EDDIE'/g' environment.prod.ts)
(cd web/src/environments; sed -i 's/{{ FIREBASE_MESSAGING_SEND_ID }}/'$FIREBASE_MESSAGING_SEND_ID_EDDIE'/g' environment.prod.ts)

# DEPLOY
npm --prefix web run build:prod
firebase deploy --project pipelinedashboard-eddie --token $FIREBASE_TOKEN_EDDIE
