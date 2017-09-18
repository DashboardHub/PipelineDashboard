.DEFAULT_GOAL := help

help:
	@echo 'Please read the documentation in "https://github.com/DashboardHub/PipelineDashboard"'

# ALIAS
run: api ui

api: api.run

ui: ui.run

install: alexa.install api.install ui.install

deploy: alexa.deploy api.deploy ui.deploy

# ALEXA
alexa.install:
	(cd alexa; npm install; serverless dynamodb install)

alexa.deploy:
	(cd alexa; serverless deploy -v)

alexa.remove:
	(cd alexa; serverless remove -v)

# API
api.install:
	(cd api; npm install)

api.run:
	(cd api; serverless offline start)

api.deploy:
	(cd api; serverless deploy -v)

api.remove:
	(cd api; serverless remove -v)

# UI
ui.install:
	(cd web; npm install)

ui.run:
	(cd web; ng serve)

ui.deploy: ui.build ui.version ui.sync

ui.build:
	(cd web; ng build --prod --aot --env=prod)

ui.version:
	(cd web/dist; echo "0.7.${TRAVIS_BUILD_NUMBER}" > VERSION)

ui.sync:
	(cd web; aws s3 sync dist s3://pipelinedashboard-ui --delete --region eu-west-2)
