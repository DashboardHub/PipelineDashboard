PipelineDashboard:
  db:
    driver: pdo_mysql
    host: localhost
    port: 3306
    database: dashboard
    username: dashie
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
