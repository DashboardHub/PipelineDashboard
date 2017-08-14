.DEFAULT_GOAL := help

help:
	@echo 'Please read the documentation in "https://github.com/DashboardHub/PipelineDashboard"'

# API
api.run:
	(cd api; serverless offline start)

# UI
ui.run:
	(cd web; ng serve)

ui.deploy: ui.build ui.sync

ui.build:
	(cd web; ng build --prod --aot --env=prod)

ui.sync:
	(cd web; aws s3 sync dist s3://pipelinedashboard-ui --delete --profile jaoudestudios)
