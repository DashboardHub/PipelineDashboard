{% set project = "PipelineDashboard" %}

include:
  - mysql
  - tools

create_{{ project }}_database:
  cmd.run:
    - name: mysql -uroot -p{{ pillar[project]['db']['root_password'] }} -e  "create database if not exists {{ pillar[project]['db']['database'] }}"
    - watch_in:
      - module: mysql-restart
    - require:
      - pkg: mysql
    
set_{{ project }}_database_privs:
  cmd.run:
    - name: mysql -uroot -p{{ pillar[project]['db']['root_password'] }} -e "grant all on *.* to {{ pillar[project]['db']['username'] }}@localhost identified by '{{ pillar[project]['db']['password'] }}'"
    - watch_in:
      - module: mysql-restart
    - require:
      - pkg: mysql
