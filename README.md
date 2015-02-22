| --------- | master | develop | feature |
| --------- | ------ | ------- | ------- |
| Build     | [![Build Status](https://travis-ci.org/eddiejaoude/SymfonyQuickStart.svg?branch=master)](https://travis-ci.org/eddiejaoude/SymfonyQuickStart) | --- | --- |
| Coverage  | [![Code Coverage](https://scrutinizer-ci.com/g/eddiejaoude/SymfonyQuickStart/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/eddiejaoude/SymfonyQuickStart/?branch=master) | --- | --- |
| Analysis  | [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/eddiejaoude/SymfonyQuickStart/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/eddiejaoude/SymfonyQuickStart/?branch=master) | --- | --- |
| json deps | [![Dependency Status](https://www.versioneye.com/user/projects/54bbab25879d51e9aa00021c/badge.svg?style=flat)](https://www.versioneye.com/user/projects/54bbab25879d51e9aa00021c) | --- | --- |
| lock deps | [![Dependency Status](https://www.versioneye.com/user/projects/54bbab35879d51106e0001ea/badge.svg?style=flat)](https://www.versioneye.com/user/projects/54bbab35879d51106e0001ea) | --- | --- |

# Symfony QuickStart

[![Join the chat at https://gitter.im/eddiejaoude/SymfonyQuickStart](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/eddiejaoude/SymfonyQuickStart?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Latest deploy (inc. branches) https://symfony-quickstart.herokuapp.com/en/

**Note: if you get an error, wait a minute & try again (refresh the page), the Application is probably deploying out or has gone to sleep.**

## Table of Contents

* [Contribution guidelines](/CONTRIBUTING.md)
* [Definition of Done](/doc/DefinitionOfDone.md)
* [Versioning successful builds - Release Candidates](/doc/Versioning.md)
* [Localisation](/doc/Localisation.md)
* [PageLayout](/doc/PageLayout.md)
* [Registration](/doc/Registration.md)


## Screenshots

![homepage](/doc/assets/homepage.png "Homepage")
---
![login](/doc/assets/login.png "Login")
---
![register](/doc/assets/register.png "Register")
---
![register-fr](/doc/assets/register-fr.png "Register French")

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

1. `make dev.run`

Optionally add a **branch / release tag** `make dev.run branch=feature/story-123`

This will run the following:
* Switch to **branch / release** tag if requested
* Install any/all dependencies (composer install)
* Rebuild the database with fixtures
* Start WebServer

2. Then go to `http://localhost:8000`

## Run full test suite in parallel

```
make test.run
```

Output

```
...
30 scenarios (30 passed)
206 steps (206 passed)
0m13.12s (48.85Mb)
...
6 specs
16 examples (16 passed)
1132ms

Generating code coverage report in html format ...
Generating code coverage report in clover format ...
...
OK (4 tests, 3 assertions)
```


This Rebuild the database & will run the commands below.

### Behat command (using config in test/behat.yml)

```
make symfony.test.bdd
```

### PHPSpec

```
make symfony.test.spec
```

### PHPUnit

```
make symfony.test.unit
```

## Rebuild database

[Reference](https://github.com/eddiejaoude/dev-helper-cmds#database)

```
make symfony.dev.rebuild
```

---

These commands are only **wrappers**, you can still use the original commands if you wish.

More information on commands available visit [Make CMDs lib](https://github.com/eddiejaoude/dev-helper-cmds#built-in-commands)


---
---

## Contributions

Please read on [Contribution Guildlines](/CONTRIBUTING.md)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/eddiejaoude/symfonyquickstart/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

