[![Floobits Status](https://floobits.com/eddiejaoude/DashboardHub-PipelineDashboard.svg)](https://floobits.com/eddiejaoude/DashboardHub-PipelineDashboard/redirect)
[![Build Status](https://travis-ci.org/DashboardHub/PipelineDashboard.svg?branch=prototype-v0.7.0)](https://travis-ci.org/DashboardHub/PipelineDashboard)

# PipelineDashboard

Display your deployed versions.

### REQUIREMENTS

- `node` & `npm`
- [Serverless](https://serverless.com) with `npm install -g serverless`
- [AngularCLI](https://cli.angular.io) with `npm install -g @angular/cli`
- `java`

## QUICK START

Using `make` to build and run the project(s):

- 1. Install the `npm` dependencies for all projects, use `make install.local`

Open 2 terminals and run each of these commands in its own terminal:

- 2. API `AUTH0_CLIENT_ID=XXX AUTH0_CLIENT_SECRET=YYY NODE_ENV=development make api`

*NOTE: You will need a `pem` file for local development*

- 3. UI `make ui`

## SUB PROJECTS

* API, read the [API](api/README.md) docs 
* Web UI, read the [UI](web/README.md) docs 
* Alexa Skill, read the [Alexa Skill](alexa/README.md) docs 

## Collaboration

Use [Floobits](https://floobits.com/eddiejaoude/DashboardHub-PipelineDashboard) to do realtime coding collaboration.

---

![Screenshot](https://user-images.githubusercontent.com/624760/29202930-8cd1823a-7e64-11e7-88ba-15739a8f03d2.png)
