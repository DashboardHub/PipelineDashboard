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
    - source: salt://ssh/files/sshd_config.jinja
    - template: jinja
