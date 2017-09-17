.DEFAULT_GOAL := help

help:
	@echo 'Please read the documentation in "https://github.com/DashboardHub/PipelineDashboard"'

api: api.run

ui: ui.run

# API
api.run:
	(cd api; serverless offline start)

api.deploy:
	(cd api; serverless deploy -v)

api.remove:
	(cd api; serverless remove -v)

# UI
ui.run:
	(cd web; ng serve)

ui.deploy: ui.build ui.sync

ui.build:
	(cd web; ng build --prod --aot --env=prod)

ui.sync:
	(cd web; aws s3 sync dist s3://pipelinedashboard-ui --delete --profile jaoudestudios)
