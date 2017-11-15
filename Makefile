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

deploy.test: alexa.deploy api.deploy.test ui.deploy.test general.version.test

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
	(cd api; sed -i 's|pipelinedashboard-environments|pipelinedashboard-environments-prod|g' ./config.json)
	(cd api; sed -i 's|pipelinedashboard-deployed|pipelinedashboard-deployed-prod|g' ./config.json)

api.env.test: guard-AUTH0_CLIENT_ID_TEST guard-AUTH0_CLIENT_SECRET_TEST api.clean
	(cd api; sed -i 's|{{ AUTH0_CLIENT_ID }}|${AUTH0_CLIENT_ID_TEST}|g' ./config.json)
	(cd api; sed -i 's|{{ AUTH0_CLIENT_SECRET }}|${AUTH0_CLIENT_SECRET_TEST}|g' ./config.json)
	(cd api; sed -i 's|pipelinedashboard-environments|pipelinedashboard-environments-test|g' ./config.json)
	(cd api; sed -i 's|pipelinedashboard-deployed|pipelinedashboard-deployed-test|g' ./config.json)

api.run: api.env.test
	(cd api; serverless offline start)

api.deploy: api.env
	(cd api; serverless deploy -v --stage production)

api.deploy.test: api.env.test
	(cd api; mv dashboardhub.test.pem dashboardhub.pem)
	(cd api; serverless deploy -v --stage test)

api.remove:
	(cd api; serverless remove -v)

# UI
ui.install:
	(cd web; npm install)

ui.run:
	(cd web; ng serve)

ui.deploy: ui.version ui.build ui.sync

ui.deploy.test: ui.version ui.build.test ui.sync.test

ui.build:
	(cd web; ng build --prod --aot --env=prod)

ui.build.test:
	(cd web; ng build --prod --aot --env=test)

ui.version:
	(cd web/src/environments; sed -i 's/x\.x\.x/0.7.${TRAVIS_BUILD_NUMBER}-ALPHA/g' environment.prod.ts)
	(cd web/src/environments; sed -i 's/x\.x\.x/0.7.${TRAVIS_BUILD_NUMBER}-ALPHA/g' environment.test.ts)

ui.sync:
	(cd web; aws s3 sync dist s3://pipeline.dashboardhub.io --delete --region eu-west-2)

ui.sync.test:
	(cd web; aws s3 sync dist s3://pipeline-test.dashboardhub.io --delete --region eu-west-2)

# GENERAL

general.version:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"0.7.${TRAVIS_BUILD_NUMBER}"}' https://dj2hjusr1g.execute-api.eu-west-2.amazonaws.com/test/environments/284d3180-c9e9-11e7-aeea-eb4cced29ed2/deployed/${DH_TOKEN}

general.version.test:
	curl -XPOST -H "Content-Type: application/json"  -d '{"release":"0.7.${TRAVIS_BUILD_NUMBER}"}' https://dj2hjusr1g.execute-api.eu-west-2.amazonaws.com/test/environments/b4d0b870-c9e9-11e7-aeea-eb4cced29ed2/deployed/${DH_TOKEN_TEST}
