apache2:
  pkg:
    - installed
    - refresh: True
    - skip_verify: True
    - hold: True
  service:
    - running
    - require:
      - pkg: apache2

apache2-reload:
  module:
    - wait
    - name: service.reload
    - m_name: apache2

apache2-restart:
  module:
    - wait
    - name: service.restart
    - m_name: apache2
          
a2enmod rewrite:
  cmd.run:
    - unless: ls /etc/apache2/mods-enabled/rewrite.load
    - order: 225
    - require:
      - pkg: apache2
    - watch_in:
      - module: apache2-restart
      
a2enmod ssl:
  cmd.run:
    - unless: ls /etc/apache2/mods-enabled/ssl.load
    - order: 225
    - require:
      - pkg: apache2
    - watch_in:
      - module: apache2-restart
      
/etc/apache2/apache2.conf:
  file.append:
    - text: ServerName 127.0.0.1
    - require:
      - pkg: apache2
    - watch_in:
      - module: apache2-restart

/etc/apache2/conf-available/nogit.conf:
  file.managed:
    - source: salt://apache2/files/nogit.conf
    - require:
      - pkg: apache2

a2enconf nogit:
  cmd.run:
    - unless: ls /etc/apache2/conf-enabled/nogit.conf
    - require:
      - file: /etc/apache2/conf-available/nogit.conf
    - watch_in:
      - module: apache2-restart

