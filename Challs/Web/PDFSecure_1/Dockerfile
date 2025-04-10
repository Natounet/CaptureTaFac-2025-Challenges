FROM python:3.9-slim

RUN apt-get update && apt-get install -y \
    libmagickwand-dev \
    python3-dev \
    && apt-get clean

RUN pip install --upgrade pip
RUN pip install flask

RUN apt-get install -y imagemagick

RUN sed -i 's|<policy domain="coder" rights="none" pattern="PDF" />|<policy domain="coder" rights="read\|write" pattern="PDF" />|' /etc/ImageMagick-6/policy.xml

WORKDIR /app
COPY . /app

EXPOSE 5000

CMD ["python", "app.py"]
