#!/bin/bash
cwd=$(pwd)

cd $cwd/backend
python3 manage.py runserver 8001