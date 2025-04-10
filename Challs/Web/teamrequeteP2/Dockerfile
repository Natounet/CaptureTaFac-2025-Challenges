# Utiliser une image de base officielle Node.js
FROM node:slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package.json ./

# Installer les dépendances
RUN npm install

# Installer typescript
RUN npm install -g typescript

# Copier le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Compiler le projet TypeScript
RUN npm run build

# Exposer le port sur lequel l'application écoute
EXPOSE 8002

# Démarrer l'application
CMD ["npm", "run", "start"]
