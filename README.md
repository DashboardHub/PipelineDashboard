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

- Angular (v7+)
- Material design
- Node

---

![Website](https://user-images.githubusercontent.com/624760/33978327-0ee1e370-e097-11e7-924c-670f76b562d3.png)

![Features](https://user-images.githubusercontent.com/624760/34434721-ef3fb3fe-ec7f-11e7-8c53-73263fb75c97.png)

![Application Platform](https://user-images.githubusercontent.com/21239137/41191244-6e6e38f6-6be4-11e8-8b7b-1691dfeeb183.png)

![Releases](https://user-images.githubusercontent.com/21239137/41191254-8542894c-6be4-11e8-9ce2-bf9df67fa985.png)

---

### REQUIREMENTS

- `node` (minimum `v8`)
- `npm` (minimum `v5`)
- `sed` - *note: available on linux by default, mac osx has a slightly different version that wont work, install linux version with **brew** `brew install gnu-sed --with-default-names`, more info in the [**FAQ**](https://github.com/DashboardHub/PipelineDashboard#faqs) section below.*

## Built with love using...

![angular](https://user-images.githubusercontent.com/624760/34513230-1e2ba5be-f05f-11e7-8cbf-c1b93415f4e5.png)
![nodejs](https://user-images.githubusercontent.com/624760/34513224-17d6ff74-f05f-11e7-8080-18f09f63a3f4.png)
Firebase

## ROADMAP

We have an aggressive plan for our ALPHA, so we can get feedback ASAP.

For more up to date information and more details please visit our [project board](https://github.com/DashboardHub/PipelineDashboard/projects/4)

## QUICK START

1. `npm start`

Then visit `http://localhost:4200/`

### RUNNING AUTOMATED TESTS

Using Cypress, but currently in prototype mode.

### Commit message standards

We use the Angular standards...

> We have very precise rules over how our git commit messages can be formatted. This leads to more readable messages that are easy to follow when looking through the project history. But also, we use the git commit messages to generate the Angular change log https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit

The format is `<type>(<scope>): #<issue-no> <subject>`, examples...

- feat(environments): #123 delete environment
- docs(commits): #456 example commit messages
- chore(dependencies): #789 updated UI dependencies

| key | value | notes |
| :--- | :--- | :--- |
| type | build | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) |
| type | ci | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| type | docs | Documentation only changes |
| type | feat | A new feature |
| type | fix | A bug fix |
| type | perf | A code change that improves performance |
| type | refactor | A code change that neither fixes a bug nor adds a feature |
| type | style | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
| type | test | Adding missing tests or correcting existing tests |
| scope | auth | Authentication module |
| scope | core | Application wide, for example interceptors |
| scope | environments | Environment module changes (not sub modules) |
| scope | help | Help module |
| scope | legal | Legal module |
| scope | monitors | Monitors module |
| scope | projects | Projects module |
| scope | releases | Releases module |
| scope | tokens | Tokens module |

## SUB PROJECTS

* `functions`, read the [API](api/README.md) docs
* Web UI, read the [UI](web/README.md) docs

## COLLABORATION

Use [Floobits](https://floobits.com/eddiejaoude/DashboardHub-PipelineDashboard) to do realtime coding collaboration.

## FAQs

| OS | Question | Answer |
| :--- | :--- | :--- |
| Mac OSx | Error `sed: 1: "./config.json": invalid command code .` | Use linux sed `brew install gnu-sed --with-default-names` |

## Social media

| media | link
| :-- | :-- |
| Twitter | https://twitter.com/dashboardhub |
| LinkedIn | https://www.linkedin.com/showcase/dashboardhub/ |
| Facebook | https://www.facebook.com/dashboardhub/ |
