mysql:
  pkg:
    - installed
    - pkgs:
      - mysql-server
      - mysql-client
      - python-mysqldb
      
/etc/mysql/my.cnf:
  file:
    - uncomment
    - regex: ^bind
    - require:
      - pkg: mysql
      
mysql-restart:
  module:
    - wait
    - name: service.restart
    - m_name: mysql


