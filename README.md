[![Build Status](https://travis-ci.org/DashboardHub/PipelineDashboard.svg?branch=prototype-v0.8.0)](https://travis-ci.org/DashboardHub/PipelineDashboard)

# PipelineDashboard

The **heartbeat** of your project, easily see an overview of your project and display your **deployed versions** and **monitor** them.

Current active [project board](https://github.com/DashboardHub/PipelineDashboard/projects/11)

![Dashboard](https://user-images.githubusercontent.com/624760/64192563-e1b77100-ce72-11e9-9e4c-889990546b9d.png)

## WANT TO GET INVOLVED? Don't know how? ...

All contributions are welcome, not only from code, but also blogs, content, documentation etc. Read more on our [contributions guidelines](.github/CONTRIBUTING.md).

Please get in touch via [@DashboardHub](https://twitter.com/DashboardHub) and let us know, we are happy to chat and more than happy to pair on the technologies we use:

- Angular (v8+)
- Material design
- Firebase (with nodejs)

---

### REQUIREMENTS

- `node` (minimum `v10+`)
- `npm` (minimum `v5+`)
- Firebase cli & account

## Built with love using...

![angular](https://user-images.githubusercontent.com/624760/34513230-1e2ba5be-f05f-11e7-8cbf-c1b93415f4e5.png)
![nodejs](https://user-images.githubusercontent.com/624760/34513224-17d6ff74-f05f-11e7-8080-18f09f63a3f4.png)
![Firebase](https://user-images.githubusercontent.com/624760/54749741-74b66480-4bcd-11e9-9698-be02405a59ae.png)

## QUICK START

### DIRECTORY STRUCTURE

- `functions` where all the backend firebase (serverless) code lives
- `web` where all the UI (angular) code lives

### LOCAL DEVELOPMENT

#### FIREBASE & GITHUB OAUTH

1. Create a firebase project with the name `pipelinedashboard-dev` via their firebase console https://console.firebase.google.com (*note: this must have a credit card assigned for external http access, but no charge required*)
2. Turn on **OAuth** authentication on the project (we use GitHub here, but you can use another or allow multiple)
   1. If using GitHub OAuth, create an OAuth App on GitHub
   2. Enter the 2 OAuth private keys from GitHub into the Firebase Authentication
3. Click **Databases** and create an empty `firestore` database (indexes, security, collections and rules will all be automatically created later on as part of the deployment)
4. Update `{{ FIREBASE_FUNCTIONS_URL }}` in file `functions/src/environments/environment.ts` with your function subdomain, for example `us-central1-pipelinedashboard-test`

#### Angular

*Note: Make sure you have done the firebase steps above*

1. Now we need to add your firebase keys to your local project
   1. Duplicate the file `web/environments/environment.ts` to `web/environments/environment.local.ts`
   2. Go to your firebase project config page and select `config` to see your project keys in `json` format
   3. Then copy/paste them to the file `web/environments/environment.local.ts` (this file is ignored by git and is not saved to the project)
2. `cd web`
3. `npm install`
4. `npm start`

Then visit `http://localhost:4200/`

#### DEPLOY

1. Deploy all the code (db, functions and UI - you don't have to use the UI, you can connect from your local code, instructions below)
   1. `npm --prefix web run build:local`
   2. Login in with firebase cli `firebase login` and then deploy `firebase deploy --project pipelinedashboard-dev`

**NOTE: After `web/` changes you can still use the UI code locally, but any `functions` / `rules` / `indexes` changes will require another deployment**

#### Before contributing

Do not forget to run `npm run list` in `web` or `functions` directory depending on where you made your changes before commiting, these will run the lint checks for you

### RUNNING AUTOMATED TESTS

Currently in prototype mode.

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

## Social media

| media | link
| :-- | :-- |
| Twitter | https://twitter.com/dashboardhub |
| LinkedIn | https://www.linkedin.com/showcase/dashboardhub/ |
| Facebook | https://www.facebook.com/dashboardhub/ |

## Lazy Loading

| module | description
| :-- | :-- |
| core | Contains all singleton services, guards, interceptors and resolvers|
| main | Contains all components like homepage, features, help, legal and profile |
| shared | Contains all shared components, directives, dialogs and models |
| projects | Contains all components like create, edit, private , view projects and repository |
| pipes | Contains all custom pipes |


## To set up admin credentials for emulated functions:

1. Open the Service Accounts pane of the Google Cloud Console.
2. Make sure that App Engine default service account is selected, and use the options menu at right to select Create key.
3. When prompted, select JSON for the key type, and click Create.
4. Set your Google default credentials to point to the downloaded key:

## Deploy firebase functions on local

1. `set GOOGLE_APPLICATION_CREDENTIALS=path\to\key.json`
2. `firebase setup:emulators:firestore`
3. `firebase emulators:start`
