# Pipeline Dashboard

## Table of Contents

* [Contribution guidelines](/CONTRIBUTING.md)
* [Definition of Done](/doc/DefinitionOfDone.md)
* [Versioning successful builds - Release Candidates](/doc/Versioning.md)
* [Localisation](/doc/Localisation.md)
* [PageLayout](/doc/PageLayout.md)
* [Registration](/doc/Registration.md)


**Note: There are no boundary checks, try to break App & it will break **

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
