[![Floobits Status](https://floobits.com/eddiejaoude/DashboardHub-PipelineDashboard.svg)](https://floobits.com/eddiejaoude/DashboardHub-PipelineDashboard/redirect)
[![Build Status](https://travis-ci.org/DashboardHub/PipelineDashboard.svg?branch=prototype-v0.8.0)](https://travis-ci.org/DashboardHub/PipelineDashboard)
[![Help Contribute to Open Source](https://www.codetriage.com/dashboardhub/pipelinedashboard/badges/users.svg)](https://www.codetriage.com/dashboardhub/pipelinedashboard)

# PipelineDashboard

Display your **deployed versions** and **monitor** it.

---

![Screenshot](https://user-images.githubusercontent.com/624760/33978327-0ee1e370-e097-11e7-924c-670f76b562d3.png)

![Screenshot](https://user-images.githubusercontent.com/624760/34434721-ef3fb3fe-ec7f-11e7-8c53-73263fb75c97.png)

![Screenshot](https://user-images.githubusercontent.com/624760/33978333-160b9bf0-e097-11e7-8ef0-efeb9751f019.png)

---

### REQUIREMENTS

- `node` (minimum `v8`)
- `npm` (minimum `v5`)
- `java` (minimum `v8`)

## Built with love using...

![angular](https://user-images.githubusercontent.com/624760/34513230-1e2ba5be-f05f-11e7-8cbf-c1b93415f4e5.png)
![serverless](https://user-images.githubusercontent.com/624760/34513225-1b46a506-f05f-11e7-9fa3-a6b6bc740d1a.png)
![nodejs](https://user-images.githubusercontent.com/624760/34513224-17d6ff74-f05f-11e7-8080-18f09f63a3f4.png)

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

## COLLABORATION

Use [Floobits](https://floobits.com/eddiejaoude/DashboardHub-PipelineDashboard) to do realtime coding collaboration.

---

## FAQs

| OS | Question | Answer |
| :--- | :--- | :--- |
| Mac OSx | Error `sed: 1: "./config.json": invalid command code .` | Use linux sed `brew install gnu-sed` |
