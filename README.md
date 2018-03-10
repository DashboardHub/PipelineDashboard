[![Floobits Status](https://floobits.com/eddiejaoude/DashboardHub-PipelineDashboard.svg)](https://floobits.com/eddiejaoude/DashboardHub-PipelineDashboard/redirect)
[![Build Status](https://travis-ci.org/DashboardHub/PipelineDashboard.svg?branch=prototype-v0.8.0)](https://travis-ci.org/DashboardHub/PipelineDashboard)
[![DashboardHub Badge](https://img.shields.io/badge/DashboardHub-DashboardHub-orange.svg)](https://pipeline.dashboardhub.io/1fd1da50-ca3a-11e7-8e89-ddd24d528194/view)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/DashboardHub/PipelineDashboard)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Help Contribute to Open Source](https://www.codetriage.com/dashboardhub/pipelinedashboard/badges/users.svg)](https://www.codetriage.com/dashboardhub/pipelinedashboard)

# PipelineDashboard

Display your **deployed versions** and **monitor** it.

## WANT TO GET INVOLVED? Don't know how? ...

All contributions are welcome, not only from code, but also blogs, content, documentation etc. Read more on our [contributions guidelines](.github/CONTRIBUTING.md).

**Pair with our team remotely over Google Hangout!**

Please get in touch via [@DashboardHub](https://twitter.com/DashboardHub) and let us know, we are happy to chat and more than happy to pair on the technologies we use:

- Angular (v5+)
- Material design
- Node
- Serverless
- AWS Lambda & DynamoDB

---

![Website](https://user-images.githubusercontent.com/624760/33978327-0ee1e370-e097-11e7-924c-670f76b562d3.png)

![Features](https://user-images.githubusercontent.com/624760/34434721-ef3fb3fe-ec7f-11e7-8c53-73263fb75c97.png)

![Application Platform](https://user-images.githubusercontent.com/624760/35721596-a96e186c-07ea-11e8-9c63-037802281ebb.png)

![Releases](https://user-images.githubusercontent.com/624760/36366927-42811710-1548-11e8-9cf8-6382714cd435.png)

---

### REQUIREMENTS

- `node` (minimum `v8`)
- `npm` (minimum `v5`)
- `java` (minimum `v8`) - *note: this is only to simulate aws services, you do not need to know any java*
- `sed` - *note: available on linux by default, mac osx has a slightly different version that wont work, install linux version with **brew** `brew install gnu-sed --with-default-names`, more info in the [**FAQ**](https://github.com/DashboardHub/PipelineDashboard#faqs) section below.*

## Built with love using...

![angular](https://user-images.githubusercontent.com/624760/34513230-1e2ba5be-f05f-11e7-8cbf-c1b93415f4e5.png)
![serverless](https://user-images.githubusercontent.com/624760/34513225-1b46a506-f05f-11e7-9fa3-a6b6bc740d1a.png)
![nodejs](https://user-images.githubusercontent.com/624760/34513224-17d6ff74-f05f-11e7-8080-18f09f63a3f4.png)
![aws](https://user-images.githubusercontent.com/624760/35319340-4cb8b7b8-00d7-11e8-95f6-83c815d9138c.jpg)

## ROADMAP

We have an aggressive plan for our prototype, so we can get feedback ASAP.

| Milestone | Status | ETA |
| :--- | :--- | :-- |
| Simple Monitoring & New Design | In Testing | Feb 2018 | 
| Notifications | Pending | March 2018 | 
| Projects that group Environments | Pending | May 2018 | 

For more information and more details please visit our [milestone list](https://github.com/DashboardHub/PipelineDashboard/milestones)

## QUICK START

Using `make` to build and run the project(s):

- 1. Install the `npm` dependencies for all projects, use `make install.local`

Open 2 terminals and run each of these commands in its own terminal:

- 2. API `AUTH0_CLIENT_ID_TEST=XXX AUTH0_CLIENT_SECRET_TEST=YYY NODE_ENV=development make api`

*NOTE: You will need a `pem` file for local development, and needs to be in the directory `api` call `auth.pem` (`api/auth.pem`)*

- 3. UI `make ui`

Then visit `http://localhost:4200/`

## RUNNING AUTOMATED TESTS

- 1. Start the API (step 2 from previous section)
- 2. Run `make api.test`

## Additional useful commands

- `make api.clean` resets the config files

## SUB PROJECTS

* API, read the [API](api/README.md) docs 
* Web UI, read the [UI](web/README.md) docs 

## COLLABORATION

Use [Floobits](https://floobits.com/eddiejaoude/DashboardHub-PipelineDashboard) to do realtime coding collaboration.

---

## FAQs

| OS | Question | Answer |
| :--- | :--- | :--- |
| Mac OSx | Error `sed: 1: "./config.json": invalid command code .` | Use linux sed `brew install gnu-sed --with-default-names` |
| ALL | Changes to the API config `api/config.json` are lost | This file is generated, do not make changes to it. If you need to update any config make changes to `api/config.json.tpl` |
