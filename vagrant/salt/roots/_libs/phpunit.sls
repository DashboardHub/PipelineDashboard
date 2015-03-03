/usr/bin/phpunit:
  file.managed:
    - source: https://dl.dropboxusercontent.com/u/63777076/VM/phpunit.phar
    - mode: 777
    - source_hash: sha256=1aa7261841cefddc89fec4e7831c08b630ed38001844d06d02421d010c042de7
    