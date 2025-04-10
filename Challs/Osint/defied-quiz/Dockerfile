# Utiliser une image PHP avec Apache
FROM php:7.4-apache

# Modifier le port dans ports.conf
RUN sed -i 's/Listen 80/Listen 8081/g' /etc/apache2/ports.conf

# Modifier le port dans le fichier de configuration du site par défaut
RUN sed -i 's/:80/:8081/g' /etc/apache2/sites-available/000-default.conf

# Copier le fichier index.php dans le répertoire web du conteneur
COPY quiz.php /var/www/html/

# Optionnel : si tu as besoin d'autres dépendances PHP, tu peux les installer ici
# Par exemple, pour installer PDO MySQL, tu peux ajouter :
# RUN docker-php-ext-install pdo pdo_mysql

# Exposer le port 80 pour le trafic HTTP entrant
EXPOSE 8081

# Commande par défaut pour démarrer Apache lorsque le conteneur est lancé
CMD ["apache2-foreground"]
