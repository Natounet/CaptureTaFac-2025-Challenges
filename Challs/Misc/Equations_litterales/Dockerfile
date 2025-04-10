FROM python:3.9-slim

WORKDIR /app

COPY . /app

EXPOSE 1337

RUN pip install sympy

CMD ["python", "server.py"]