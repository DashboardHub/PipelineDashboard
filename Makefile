.DEFAULT_GOAL := help

help:
	@echo 'Please read the documentation in "https://github.com/DashboardHub/PipelineDashboard"'

# API
api.run:
	(cd api; serverless offline start)


# UI
ui.run:
	(cd web; ng serve)
