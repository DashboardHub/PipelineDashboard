include:
  - apache2
  - phpunit
  - composer
  
php5_ondrej:
  pkgrepo.managed:
    - ppa: ondrej/php5
    
php5:
  pkg.latest:
    - refresh: True
    - skip_verify: True
    - require:
      - pkgrepo: php5_ondrej
      - pkg: apache2
    - pkgs:
      - python-software-properties
      - php5-curl
      - php5-mcrypt
      - php5-xsl
      - php5-ldap
      - php5-mysql
      - php5-pgsql
      - php5-gd
      - php5-intl
      - php5-common
      - php5-mongo
      - php-pear
      - php5-dev
      - php5-imap
      - libapache2-mod-php5
      
a2enmod php5:
  cmd.run:
    - unless: ls /etc/apache2/mods-enabled/php5.load
    - order: 225
    - require:
      - pkg: apache2
      - pkg: php5
    - watch_in:
      - service: apache2
      
/var/lib/php5/sessions:
  file.directory:
    - mode: 777
    - require:
      - pkg: php5
    - watch_in:
      - module: apache2-restart
      
install_php_mongo:
  cmd.run:
    - unless: ls /etc/php5/apache2/conf.d/*-mongo.ini
    - name: printf "\n" | pecl install mongo
    - require:
      - pkg: php5
    
enable_php_mongo:
  cmd.wait:
    - name: php5enmod mongo
    - watch_in:
      - module: apache2-restart
      
install_php_pgsql:
  cmd.run:
    - unless: ls /etc/php5/apache2/conf.d/*-pgsql.ini
    - name: printf "\n" | pecl install pgsql
    - require:
      - pkg: php5
      
enable_php_pgsql:
  cmd.wait:
    - name: php5enmod pgsql
    - watch_in:
      - module: apache2-restart
      
/etc/php5/apache2/php.ini:
  file:
    - managed
    - source: salt://php5/files/php.ini.apache2
    - template: jinja
    - require:
      - pkg: php5
      - pkg: apache2

/etc/php5/cli/php.ini:
  file:
    - managed
    - source: salt://php5/files/php.ini.cli
    - template: jinja
    - require:
      - pkg: php5
      - pkg: apache2
