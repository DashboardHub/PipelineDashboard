# DEFAULTS

.DEFAULT_GOAL := help
TEST_TAGS ?= @All

# HELPERS

help:
	@echo 'Please read the documentation in "https://github.com/DashboardHub/PipelineDashboard"'

guard-%:
	@ if [ "${${*}}" = "" ]; then \
		echo "Environment variable $* is not set"; \
		exit 1; \
	fi

# ALIAS
test.local: api.test.local
test.ci: api.test.ci

api: api.run

ui: ui.run

test: test.local

install.local: api.install ui.install

install: pipeline.version.startBuild pipeline.version.prod.startBuild api.install ui.install pipeline.version.finishBuild pipeline.version.prod.finishBuild

install.test: pipeline.version.test.startBuild pipeline.version.prod.test.startBuild api.install ui.install pipeline.version.test.finishBuild pipeline.version.prod.test.finishBuild

deploy: pipeline.version.startDeploy pipeline.version.prod.startDeploy api.deploy ui.deploy pipeline.version.finishDeploy pipeline.version.prod.finishDeploy

deploy.test: pipeline.version.test.startDeploy pipeline.version.prod.test.startDeploy api.deploy.test ui.deploy.test pipeline.version.test.finishDeploy pipeline.version.prod.test.finishDeploy

# API
api.install:
	(cd api; rm -fr node_modules || echo "Nothing to delete")
	(cd api; npm install)

api.test.local:
	(cd api; npm run test:local)

api.test.ci:
	(cd api; npm run test:ci)

api.run:
	(cd api; npm run start:local)

api.deploy:
	(cd api; npx serverless deploy -v --stage production)

api.deploy.test:
	(cd api; npx serverless deploy -v --stage test)

api.remove:
	(cd api; npx serverless remove -v --stage production)

api.remove.test:
	(cd api; npx serverless remove -v --stage test)

# UI
ui.install:
	(cd web; rm -fr node_modules || echo "Nothing to delete")
	(cd web; npm install)

ui.run:
	(cd web; npx ng serve)

ui.deploy: ui.version ui.build ui.sync

ui.deploy.test: ui.version ui.build.test ui.sync.test

ui.build:
	(cd web; ./node_modules/@angular/cli/bin/ng build --prod --aot --configuration=production)

ui.build.test:
	(cd web; ./node_modules/@angular/cli/bin/ng build --prod --aot --configuration=test)

ui.version:
	(cd web/src/environments; sed -i 's/x\.x\.x/v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA/g' environment.prod.ts)
	(cd web/src/environments; sed -i 's/x\.x\.x/v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA/g' environment.test.ts)

ui.sync: guard-AWS_CLOUDFRONT_ID
	(cd web; aws s3 sync dist s3://pipeline.dashboardhub.io --delete --region eu-west-2)
	aws cloudfront create-invalidation --distribution-id ${AWS_CLOUDFRONT_ID} --paths /\*

ui.sync.test:
	(cd web; aws s3 sync dist s3://pipeline-test.dashboardhub.io --delete --region eu-west-2)

# DASHBOARDHUB PIPELINE TEST

pipeline.version.startBuild:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://dj2hjusr1g.execute-api.eu-west-2.amazonaws.com/test/environments/284d3180-c9e9-11e7-aeea-eb4cced29ed2/deployed/${DH_TOKEN}/startBuild

pipeline.version.finishBuild:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://dj2hjusr1g.execute-api.eu-west-2.amazonaws.com/test/environments/284d3180-c9e9-11e7-aeea-eb4cced29ed2/deployed/${DH_TOKEN}/finishBuild

pipeline.version.failBuild:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://dj2hjusr1g.execute-api.eu-west-2.amazonaws.com/test/environments/284d3180-c9e9-11e7-aeea-eb4cced29ed2/deployed/${DH_TOKEN}/failBuild

pipeline.version.startDeploy:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://dj2hjusr1g.execute-api.eu-west-2.amazonaws.com/test/environments/284d3180-c9e9-11e7-aeea-eb4cced29ed2/deployed/${DH_TOKEN}/startDeploy

pipeline.version.finishDeploy:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://dj2hjusr1g.execute-api.eu-west-2.amazonaws.com/test/environments/284d3180-c9e9-11e7-aeea-eb4cced29ed2/deployed/${DH_TOKEN}/finishDeploy

pipeline.version.failDeploy:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://dj2hjusr1g.execute-api.eu-west-2.amazonaws.com/test/environments/284d3180-c9e9-11e7-aeea-eb4cced29ed2/deployed/${DH_TOKEN}/failDeploy

pipeline.version.test.startBuild:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://dj2hjusr1g.execute-api.eu-west-2.amazonaws.com/test/environments/b4d0b870-c9e9-11e7-aeea-eb4cced29ed2/deployed/${DH_TOKEN_TEST}/startBuild

pipeline.version.test.finishBuild:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://dj2hjusr1g.execute-api.eu-west-2.amazonaws.com/test/environments/b4d0b870-c9e9-11e7-aeea-eb4cced29ed2/deployed/${DH_TOKEN_TEST}/finishBuild

pipeline.version.test.failBuild:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://dj2hjusr1g.execute-api.eu-west-2.amazonaws.com/test/environments/b4d0b870-c9e9-11e7-aeea-eb4cced29ed2/deployed/${DH_TOKEN_TEST}/failBuild

pipeline.version.test.startDeploy:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://dj2hjusr1g.execute-api.eu-west-2.amazonaws.com/test/environments/b4d0b870-c9e9-11e7-aeea-eb4cced29ed2/deployed/${DH_TOKEN_TEST}/startDeploy

pipeline.version.test.finishDeploy:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://dj2hjusr1g.execute-api.eu-west-2.amazonaws.com/test/environments/b4d0b870-c9e9-11e7-aeea-eb4cced29ed2/deployed/${DH_TOKEN_TEST}/finishDeploy

pipeline.version.test.failDeploy:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://dj2hjusr1g.execute-api.eu-west-2.amazonaws.com/test/environments/b4d0b870-c9e9-11e7-aeea-eb4cced29ed2/deployed/${DH_TOKEN_TEST}/failDeploy

# DASHBOARDHUB PIPELINE PROD

pipeline.version.prod.startBuild:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://wxhly2j3oc.execute-api.eu-west-2.amazonaws.com/production/environments/1fd1da50-ca3a-11e7-8e89-ddd24d528194/deployed/${DH_TOKEN_PROD}/startBuild

pipeline.version.prod.finishBuild:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://wxhly2j3oc.execute-api.eu-west-2.amazonaws.com/production/environments/1fd1da50-ca3a-11e7-8e89-ddd24d528194/deployed/${DH_TOKEN_PROD}/finishBuild

pipeline.version.prod.failBuild:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://wxhly2j3oc.execute-api.eu-west-2.amazonaws.com/production/environments/1fd1da50-ca3a-11e7-8e89-ddd24d528194/deployed/${DH_TOKEN_PROD}/failBuild

pipeline.version.prod.startDeploy:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://wxhly2j3oc.execute-api.eu-west-2.amazonaws.com/production/environments/1fd1da50-ca3a-11e7-8e89-ddd24d528194/deployed/${DH_TOKEN_PROD}/startDeploy

pipeline.version.prod.finishDeploy:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://wxhly2j3oc.execute-api.eu-west-2.amazonaws.com/production/environments/1fd1da50-ca3a-11e7-8e89-ddd24d528194/deployed/${DH_TOKEN_PROD}/finishDeploy

pipeline.version.prod.failDeploy:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://wxhly2j3oc.execute-api.eu-west-2.amazonaws.com/production/environments/1fd1da50-ca3a-11e7-8e89-ddd24d528194/deployed/${DH_TOKEN_PROD}/failDeploy

pipeline.version.prod.test.startBuild:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://wxhly2j3oc.execute-api.eu-west-2.amazonaws.com/production/environments/1012de50-ca3c-11e7-8e89-ddd24d528194/deployed/${DH_TOKEN_PROD_TEST}/startBuild

pipeline.version.prod.test.finishBuild:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://wxhly2j3oc.execute-api.eu-west-2.amazonaws.com/production/environments/1012de50-ca3c-11e7-8e89-ddd24d528194/deployed/${DH_TOKEN_PROD_TEST}/finishBuild

pipeline.version.prod.test.failBuild:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://wxhly2j3oc.execute-api.eu-west-2.amazonaws.com/production/environments/1012de50-ca3c-11e7-8e89-ddd24d528194/deployed/${DH_TOKEN_PROD_TEST}/failBuild

pipeline.version.prod.test.startDeploy:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://wxhly2j3oc.execute-api.eu-west-2.amazonaws.com/production/environments/1012de50-ca3c-11e7-8e89-ddd24d528194/deployed/${DH_TOKEN_PROD_TEST}/startDeploy

pipeline.version.prod.test.finishDeploy:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://wxhly2j3oc.execute-api.eu-west-2.amazonaws.com/production/environments/1012de50-ca3c-11e7-8e89-ddd24d528194/deployed/${DH_TOKEN_PROD_TEST}/finishDeploy

pipeline.version.prod.test.failDeploy:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"v0.10.${TRAVIS_BUILD_NUMBER}-ALPHA"}' https://wxhly2j3oc.execute-api.eu-west-2.amazonaws.com/production/environments/1012de50-ca3c-11e7-8e89-ddd24d528194/deployed/${DH_TOKEN_PROD_TEST}/failDeploy
