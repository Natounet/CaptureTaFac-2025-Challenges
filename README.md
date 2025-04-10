# CaptureTaFac 2025 - Challenges

Bienvenue dans le dépôt GitHub de l'édition 2025 de **Capture Ta Fac**. 
Ce dépôt contient l'ensemble des challenges proposés lors de cette édition, ainsi que leurs writeups et les outils nécessaires pour les gérer.

---

## Structure du dépôt

### `challenges.json`
Ce fichier contient toutes les informations nécessaires pour gérer les challenges via l'outil **[CTF-Container-Manager](https://github.com/Natounet/CTF-Container-Manager)**.
Cet outil a été spécialement développé pour l'événement afin de permettre à tous les membres de l'équipe d'administrer facilement les conteneurs Docker associés aux challenges.

### `/Challs`
Le dossier `Challs` contient les fichiers des différents challenges. Chaque challenge est organisé dans son propre sous-dossier, avec la structure suivante :

- **`Dockerfile`** : Présent uniquement si le challenge nécessite un conteneur Docker.
- **`description.md`** : La description du challenge affichée aux joueurs sur la plateforme CTFd.
- **`readme.md`** : Le writeup du challenge, destiné aux aideur·euses pour guider les joueur·euses en cas de besoin.

---

## Outil : CTF-Container-Manager
L'outil **CTF-Container-Manager** a été conçu pour simplifier la gestion des conteneurs Docker liés aux challenges. Grâce au fichier `challenges.json`, vous pouvez :

- Lancer les conteneurs.
- Arrêter ou redémarrer les conteneurs.
- Accéder aux informations essentielles sur chaque challenge.

---


## Contact
Pour toute question ou demande liée à cet événement, n'hésitez pas à nous contacter via bdepalme@gmail.com.
