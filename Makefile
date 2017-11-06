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

deploy: alexa.deploy api.deploy ui.deploy

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

api.run:
	(cd api; serverless offline start)

api.deploy: api.env
	(cd api; serverless deploy -v)

api.remove:
	(cd api; serverless remove -v)

# UI
ui.install:
	(cd web; npm install)

ui.run:
	(cd web; ng serve)

ui.deploy: ui.version ui.build ui.sync

ui.build:
	(cd web; ng build --prod --aot --env=prod)

ui.version:
	(cd web/src/environments; sed -i 's/x\.x\.x/0.7.${TRAVIS_BUILD_NUMBER}/g' environment.prod.ts)

ui.sync:
	(cd web; aws s3 sync dist s3://pipelinedashboard-ui --delete --region eu-west-2)
