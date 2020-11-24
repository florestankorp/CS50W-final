FROM python:3.9.0

WORKDIR /backend
COPY requirements.txt /backend
RUN pip3 install -r requirements.txt

EXPOSE 8000

CMD python3 manage.py makemigrations && python3 manage.py migrate && python3 manage.py runserver 0.0.0.0:8000
