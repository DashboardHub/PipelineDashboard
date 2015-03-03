include:
  - mysql
  - tools
  - php5
  
php5-xdebug:
  pkg.installed

/app/config/parameters_dev.yml:
  file.managed:
    - template: jinja
    - source: file:///var/www/PipelineDashboard/app/config/parameters_dev.yml.jinja