| --- | master | develop |
| --- | ------ | ------- |
| Build | [![Build Status](https://travis-ci.org/DashboardHub/PipelineDashboard.svg?branch=master)](https://travis-ci.org/DashboardHub/PipelineDashboard) | [![Build Status](https://travis-ci.org/DashboardHub/PipelineDashboard.svg?branch=develop)](https://travis-ci.org/DashboardHub/PipelineDashboard) |
| Quality | [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/?branch=master) | [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/badges/quality-score.png?b=develop)](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/?branch=develop) |
| Coverage | [![Code Coverage](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/?branch=master) | [![Code Coverage](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/badges/coverage.png?b=develop)](https://scrutinizer-ci.com/g/DashboardHub/PipelineDashboard/?branch=develop) |
| Deps json | --- | [![Dependency Status](https://www.versioneye.com/user/projects/54f2fad64f3108d1fa0008b1/badge.svg?style=flat)](https://www.versioneye.com/user/projects/54f2fad64f3108d1fa0008b1) |
| Deps lock | --- | [![Dependency Status](https://www.versioneye.com/user/projects/54f2fadb4f31083e1b00072d/badge.svg?style=flat)](https://www.versioneye.com/user/projects/54f2fadb4f31083e1b00072d) |

# Dashboard Hub :: Pipeline Dashboard
## Focus on what matters to you!

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

3. Update config parameters, edit `app/config/parameters_dev.yml` (if in `dev` mode)

4. Run Database Migrations with Doctrine

   ```
   php app/console doctrine:schema:update —force
   ```

5. Run builtin Webserver for Development

   ```
   php app/console server:run -vvv --env=dev
   ```

---

