# Utilisation d'une image Python légère
FROM python:3.11-slim

# Définition du répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier tout le code de l'application
COPY server.py .
COPY static/ static/

# Exposer le port Flask
EXPOSE 5002

# Démarrer le serveur avec Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5002", "server:app"]
