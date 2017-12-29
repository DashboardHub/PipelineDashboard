[![Floobits Status](https://floobits.com/eddiejaoude/DashboardHub-PipelineDashboard.svg)](https://floobits.com/eddiejaoude/DashboardHub-PipelineDashboard/redirect)
[![Build Status](https://travis-ci.org/DashboardHub/PipelineDashboard.svg?branch=prototype-v0.8.0)](https://travis-ci.org/DashboardHub/PipelineDashboard)

# PipelineDashboard

Display your deployed versions.

### REQUIREMENTS

- `node` (minimum `v8`)
- `npm` (minimum `v5`)
- `java` (minimum `v8`)

## QUICK START

Using `make` to build and run the project(s):

- 1. Install the `npm` dependencies for all projects, use `make install.local`

Open 2 terminals and run each of these commands in its own terminal:

- 2. API `AUTH0_CLIENT_ID_TEST=XXX AUTH0_CLIENT_SECRET_TEST=YYY NODE_ENV=development make api`

*NOTE: You will need a `pem` file for local development*

- 3. UI `make ui`

Then visit `http://localhost:4200/`

## Additional useful commands

- `make api.clean` resets the config files (do not use if you have made manual changes to the `api/config.json file)

## SUB PROJECTS

* API, read the [API](api/README.md) docs 
* Web UI, read the [UI](web/README.md) docs 
* Alexa Skill, read the [Alexa Skill](alexa/README.md) docs 

## Collaboration

Use [Floobits](https://floobits.com/eddiejaoude/DashboardHub-PipelineDashboard) to do realtime coding collaboration.

---

![Screenshot](https://user-images.githubusercontent.com/624760/33978327-0ee1e370-e097-11e7-924c-670f76b562d3.png)

![Screenshot](https://user-images.githubusercontent.com/624760/33978333-160b9bf0-e097-11e7-8ef0-efeb9751f019.png)
