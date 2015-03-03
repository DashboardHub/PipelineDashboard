{% set project = "PipelineDashboard" %}

include:
  - mysql
  - tools
  - php5
  - apache2
  - dashboard.db
  - dashboard.hosts
  
php5-xdebug:
  pkg.installed:
    - skip_verify: true

/var/www/{{ project }}/app/config/parameters_dev.yml:
  file.managed:
    - template: jinja
    - source: file:///var/www/{{ project }}/app/config/parameters_dev.yml.jinja
    - mode: 755
    
/var/www/{{ project }}/app/config/parameters.yml:
  file.managed:
    - template: jinja
    - source: file:///var/www/{{ project }}/app/config/parameters_dev.yml.jinja
    - mode: 755
    
/var/www/{{ project }}/composer.json:
  file.managed:
    - template: jinja
    - source: file:///var/www/{{ project }}/composer.json
    - mode: 755