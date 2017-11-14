.DEFAULT_GOAL := help

help:
	@echo 'Please read the documentation in "https://github.com/DashboardHub/PipelineDashboard"'

guard-%:
	@ if [ "${${*}}" = "" ]; then \
		echo "Environment variable $* is not set"; \
		exit 1; \
	fi

# ALIAS
api: api.run

ui: ui.run

install: alexa.install api.install ui.install

deploy: alexa.deploy api.deploy ui.deploy general.version

deploy.dev: alexa.deploy api.deploy.dev ui.deploy.dev general.version.dev

# ALEXA
alexa.install:
	(cd alexa; npm install)

alexa.deploy:
	(cd alexa; serverless deploy -v)

alexa.remove:
	(cd alexa; serverless remove -v)

# API
api.clean:
	(cd api; git checkout ./config.json)

api.install:
	(cd api; npm install)

api.env: guard-AUTH0_CLIENT_ID guard-AUTH0_CLIENT_SECRET api.clean
	(cd api; sed -i 's|{{ AUTH0_CLIENT_ID }}|${AUTH0_CLIENT_ID}|g' ./config.json)
	(cd api; sed -i 's|{{ AUTH0_CLIENT_SECRET }}|${AUTH0_CLIENT_SECRET}|g' ./config.json)

api.env.dev: guard-AUTH0_CLIENT_ID_DEV guard-AUTH0_CLIENT_SECRET_DEV api.clean
	(cd api; sed -i 's|{{ AUTH0_CLIENT_ID }}|${AUTH0_CLIENT_ID_DEV}|g' ./config.json)
	(cd api; sed -i 's|{{ AUTH0_CLIENT_SECRET }}|${AUTH0_CLIENT_SECRET_DEV}|g' ./config.json)
	(cd api; sed -i 's|pipelinedashboard-environments|pipelinedashboard-environments-dev|g' ./config.json)
	(cd api; sed -i 's|pipelinedashboard-deployed|pipelinedashboard-deployed-dev|g' ./config.json)

api.run: api.env.dev
	(cd api; serverless offline start)

api.deploy: api.env
	(cd api; serverless deploy -v --stage production)

api.deploy.dev: api.env.dev
	(cd api; serverless deploy -v)

api.remove:
	(cd api; serverless remove -v)

# UI
ui.install:
	(cd web; npm install)

ui.run:
	(cd web; ng serve)

ui.deploy: ui.version ui.build ui.sync

ui.deploy.dev: ui.version ui.build.dev ui.sync.dev

ui.build:
	(cd web; ng build --prod --aot --env=prod)

ui.build.dev:
	(cd web; ng build --prod --aot --env=dev)

ui.version:
	(cd web/src/environments; sed -i 's/x\.x\.x/0.7.${TRAVIS_BUILD_NUMBER}-ALPHA/g' environment.prod.ts)
	(cd web/src/environments; sed -i 's/x\.x\.x/0.7.${TRAVIS_BUILD_NUMBER}-ALPHA/g' environment.dev.ts)

ui.sync:
	(cd web; aws s3 sync dist s3://pipeline.dashboardhub.io --delete --region eu-west-2)

ui.sync.dev:
	(cd web; aws s3 sync dist s3://pipeline-dev.dashboardhub.io --delete --region eu-west-2)

# GENERAL

general.version:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"0.7.${TRAVIS_BUILD_NUMBER}"}' https://iklni2x68e.execute-api.eu-west-2.amazonaws.com/dev/environments/b468ae40-c44b-11e7-bd24-ff1141ed26f0/deployed/${DH_TOKEN}

general.version.dev:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"0.7.${TRAVIS_BUILD_NUMBER}"}' https://iklni2x68e.execute-api.eu-west-2.amazonaws.com/dev/environments/b468ae40-c44b-11e7-bd24-ff1141ed26f0/deployed/${DH_TOKEN}
