#!/bin/bash
cd ./frontend
npm run start

cd ../backend
python3 manage.py runserver