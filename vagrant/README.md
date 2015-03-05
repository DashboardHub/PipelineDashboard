* From this directory: cp -R salt/pillar.template/ ../../pillar
* Set the pillar data within ../../pillar/PipelineDashboard.sls - don't use root as the database user - this will cause problems with the salt states which need to use root themselves
* From this directory again (PipelineDashboard/vagrant):
    * vagrant up
    * vagrant ssh
    * cd /var/www/PipelineDashboard
    * composer install
* Set PipelineDashboard.local in your local hosts file to point to 192.168.40.63
* Visit http://PipelineDashboard.local in the browser of your choice
