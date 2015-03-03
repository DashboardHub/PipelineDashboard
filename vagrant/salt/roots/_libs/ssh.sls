ssh:
  pkg:
    - installed
  service:
    - running
    - enable: True
    - watch:
      - file: /etc/ssh/sshd_config
    - require:
      - pkg: ssh
      
sshpass:
  pkg.installed

/etc/ssh/sshd_config:
  file.managed:
{% if 'elucidata' in grains['id'] %}
    - source: salt://_files/sshd_config_elucidata.jinja
{% else %}
    - source: salt://_files/sshd_config.jinja
{% endif %}
    - template: jinja
