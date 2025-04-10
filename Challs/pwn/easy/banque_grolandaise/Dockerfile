# Utiliser une image de base légère
FROM alpine:latest

# Installer les dépendances nécessaires, y compris les outils de compilation
RUN apk update && apk add --no-cache socat gcc make musl-dev coreutils

# Copier le fichier source du challenge dans le conteneur
COPY chall.c /chall.c

# Compiler le fichier source
RUN gcc -o /chall /chall.c

# Vérifier que l'exécutable a été créé correctement
RUN if [ ! -f /chall ]; then echo "Exécutable chall non trouvé !" && exit 1; fi

# Rendre l'exécutable exécutable
RUN chmod +x /chall

# Exposer le port sur lequel le challenge sera accessible
EXPOSE 1556

# Commande pour démarrer le conteneur et établir une connexion TCP duplex avec socat et stdbuf
CMD ["sh", "-c", "socat TCP-LISTEN:1556,reuseaddr,fork EXEC:'stdbuf -i0 -o0 -e0 /chall'"]
