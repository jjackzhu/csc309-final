#!/bin/bash

cd PB
chmod +x run.sh
chmod +x manage.py
python3 -m pip install virtualenv
python3 -m virtualenv -p `which python3.9` venv
source venv/bin/activate
pip install -r requirements.txt
./manage.py makemigrations
./manage.py migrate
deactivate

cd ../phase2
npm install