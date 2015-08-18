sudo wget -O /usr/local/sbin/install-mozilla-addon http://bernaerts.dyndns.org/download/ubuntu/install-mozilla-addon
sudo chmod +x /usr/local/sbin/install-mozilla-addon
sudo install-mozilla-addon https://addons.mozilla.org/firefox/downloads/latest/5369/addon-5369-latest.xpi
sudo install-mozilla-addon https://addons.mozilla.org/firefox/downloads/latest/1843/addon-1843-latest.xpi
wget http://selenium-release.storage.googleapis.com/2.45/selenium-server-standalone-2.45.0.jar
sudo apt-get install xvfb
sudo Xvfb :99.0 -ac
export DISPLAY=:99.0

java -jar selenium-server-standalone-2.45.0.jar > /dev/null 2>&1 &
