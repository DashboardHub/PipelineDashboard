PipelineDashboard:
  db:
    driver: pdo_mysql
    host: 192.168.59.103
    port: null
    database: dashboard
    username: root
    password: 
  mailer:
    transport: smtp
    host: 127.0.0.1
    username: null
    password: 
  locale: en
  secret: ThisTokenIsNotSoSecretChangeIt
  debug:
    toolbar: true
    redirects: false
    use_assetic_controller: true
