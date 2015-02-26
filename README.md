# Pipeline Dashboard

[![Join the chat at https://gitter.im/DashboardHub/PipelineDashboard](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/DashboardHub/PipelineDashboard?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Table of Contents

* [Contribution guidelines](/CONTRIBUTING.md)
* [Definition of Done](/doc/DefinitionOfDone.md)
* [Versioning successful builds - Release Candidates](/doc/Versioning.md)
* [Localisation](/doc/Localisation.md)
* [PageLayout](/doc/PageLayout.md)
* [Registration](/doc/Registration.md)


**Note: There are no boundary checks, try to break App & it will break **

![Dashboard Screenshot](/web/img/screenshot.png "Dashboard Screenshot")

## Setup

1. Install dependencies

```
php composer.phar install
```

2. Update parameters

```
/app/config/parameters_dev.yml
```

Database parameters are important: host, username, password etc...

## Run app

1. `make symfony.server`

2. Then go to `http://localhost:8000`


## Contributions

Please read on [Contribution Guildlines](/CONTRIBUTING.md)
