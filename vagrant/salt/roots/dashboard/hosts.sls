{% set project = "PipelineDashboard" %}

include:
  - apache2
    
/etc/apache2/sites-available/{{ project }}.conf:
  file:
    - managed
    - source: salt://dashboard/files/apache/{{ project }}.conf.jinja
    - template: jinja
    - require:
      - pkg: apache2
      
{{ project }}_vhost_enabled:
  cmd.run:
    - name: a2ensite {{ project }}.conf
    - unless: test -f /etc/apache2/sites-enabled/{{ project }}.conf
    - require:
      - file: /etc/apache2/sites-available/{{ project }}.conf
    - watch_in:
      - module: apache2-restart
