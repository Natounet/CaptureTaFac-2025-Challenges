# 1️⃣ Utilisation de l'image officielle Node.js
FROM node:slim

# 2️⃣ Définir le dossier de travail dans le conteneur
WORKDIR /app

# 3️⃣ Copier package.json, package-lock.json et tsconfig.json
COPY package.json package-lock.json tsconfig.json ./

# 4️⃣ Installer les dépendances
RUN npm install

# Installer typescript
RUN npm install -g typescript

# 5️⃣ Copier le reste du code (éviter les node_modules et dist)
COPY . .

# 6️⃣ Vérification du contenu de dist/ avant de compiler
RUN ls -l dist/

# 7️⃣ Compiler TypeScript
RUN npm run build


# 9️⃣ Exposer le port 3050
EXPOSE 3050

# 🔟 Ajouter un point d'entrée pour démarrer le serveur
CMD ["node", "dist/server.js"]
