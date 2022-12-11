#!/bin/bash

chmod +x run.sh
cd PB
chmod +x manage.py
python3 -m pip install virtualenv
python3 -m virtualenv -p `which python3.10` venv
source venv/bin/activate
pip install -r requirements.txt
./manage.py makemigrations
./manage.py migrate
deactivate

cd ../phase2
npm install