#!/bin/bash

chmod +x startup.sh
chmod +x run.sh
python3 -m pip install virtualenv
python3 -m virtualenv -p /local/bin/python3.10 venv
source venv/bin/activate
pip install -r requirements.txt
./manage.py makemigrations
./manage.py migrate

