# Utiliser une image de base légère
FROM debian:latest

# Installer les dépendances nécessaires, y compris les outils de compilation
RUN apt-get update && apt-get install socat -y gcc
#gcc make build-essential -y
WORKDIR chall

# Copier le fichier source du challenge dans le conteneur
COPY chall.c chall.c
COPY flag.txt flag.txt

# Compiler le fichier source
RUN gcc -o chall chall.c -fno-stack-protector -z execstack -no-pie

# Vérifier que l'exécutable a été créé correctement
RUN if [ ! -f chall ]; then echo "Exécutable chall non trouvé !" && exit 1; fi

# Rendre l'exécutable exécutable
RUN chmod +x chall

# Exposer le port sur lequel le challenge sera accessible
EXPOSE 1557

# Commande pour démarrer le conteneur et établir une connexion TCP duplex avec socat et stdbuf
CMD ["sh", "-c", "socat TCP-LISTEN:1557,reuseaddr,fork EXEC:'stdbuf -i0 -o0 -e0 /chall/chall'"]
