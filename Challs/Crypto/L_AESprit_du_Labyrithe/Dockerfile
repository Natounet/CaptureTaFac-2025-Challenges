FROM python:3.9-slim

WORKDIR /app

RUN pip install pycryptodome

COPY server.py .

ENV FLAG="CTFAC{B1t_Fl1pP1ng_X_p4dD1nG_0r4cL3}"

EXPOSE 12345

CMD ["python", "server.py"]