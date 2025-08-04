#!/bin/bash

cd ~/Arduino/libraries/CommBot-Arduino/ && git pull

cd ~/aikargo/

arduino-cli compile --fqbn arduino:avr:mega robot

arduino-cli upload -p /dev/ttyUSB0 --fqbn arduino:avr:mega robot
