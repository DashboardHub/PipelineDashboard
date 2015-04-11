| --- | master | develop | v0.2.1 |
| --- | ------ | ------- | ---- |
| Dashboard | [![DashboardHub Badge](http://dashboardhub.io/badge/5505d755493564.48070216 "DashboardHub Badge")](http://dashboardhub.io/d/5505d755493564.48070216) | [![DashboardHub Badge](http://dashboardhub.io/badge/5505d755493564.48070216 "DashboardHub Badge")](http://dashboardhub.io/d/5505d755493564.48070216) | --- |
| Current Issues | --- | --- | [v0.2.1](https://github.com/DashboardHub/PipelineDashboard/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22v0.2.1%3A+ySlow+Beacon+Prototype%22) |
| Deployment | --- | http://alpha.dashboardhub.io | http://prototype.dashboardhub.io |
| Build | [![Build Status](https://travis-ci.org/DashboardHub/PipelineDashboard.svg?branch=master)](https://travis-ci.org/DashboardHub/PipelineDashboard) | [![Build Status](https://travis-ci.org/DashboardHub/PipelineDashboard.svg?branch=develop)](https://travis-ci.org/DashboardHub/PipelineDashboard) | --- |
| Quality | [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/?branch=master) | [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/badges/quality-score.png?b=develop)](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/?branch=develop) | --- |
| Coverage | [![Code Coverage](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/?branch=master) | [![Code Coverage](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/badges/coverage.png?b=develop)](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/?branch=develop) | --- |
| Deps json | --- | [![Dependency Status](https://www.versioneye.com/user/projects/54f2fad64f3108d1fa0008b1/badge.svg?style=flat)](https://www.versioneye.com/user/projects/54f2fad64f3108d1fa0008b1) | --- |
| Deps lock | --- | [![Dependency Status](https://www.versioneye.com/user/projects/54f2fadb4f31083e1b00072d/badge.svg?style=flat)](https://www.versioneye.com/user/projects/54f2fadb4f31083e1b00072d) | --- |

---

# Dashboard Hub :: Pipeline Dashboard

Project Dashboard for All...especially Developers. 

## Focus on what matters to you!

No need to log in here & there, all your metrics in one place!

Use your Github Account to login & setup your dashboard in 30s with the Repository name.

Add a badge to you README for easy & quick access [![DashboardHub Badge](http://dashboardhub.io/badge/5505d755493564.48070216 "DashboardHub Badge")](http://dashboardhub.io/d/5505d755493564.48070216)

## Example Screenshot (GithubTravisCI Theme)

![DashboardHub Screenshot of Github Theme](/doc/screenshot/Github.png "DashboardHub Screenshot of Github Theme")
![DashboardHub Screenshot of GithubTravis Theme](/doc/screenshot/GithubTravisCI.png "DashboardHub Screenshot of GithubTravis Theme")

---

## Setup

1. Clone project

   ```
   git clone https://github.com/DashboardHub/PipelineDashboard.git
   ```

2. Download Composer & Run Install

   ```
   curl -sS https://getcomposer.org/installer | php
   ```
   or
   ```
   php -r "readfile('https://getcomposer.org/installer');" | php
   ```

   More information on composer here https://getcomposer.org/download/

3. Update config parameters 
   * **DEV** `app/config/parameters_dev.yml`
   * **PROD** `app/config/parameters.yml` 
        or use **ENV** variables

4. Run Database Migrations with Doctrine

   ```
   php app/console doctrine:schema:update —force
   ```

5. Run builtin Webserver for Development

   ```
   php app/console server:run -vvv --env=dev
   ```

   For **prod** see Symfony Documentation http://symfony.com/doc/current/cookbook/deployment/tools.html

---

# Ideas

All feedback / ideas are welcome! Please log under issues on Github.

---
