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

## Liste des challenges et challmakers

| Nom du défi                  | Catégorie         | Auteur           |
|------------------------------|-------------------|------------------|
| Mot de passe en or           | Crypto            | Kenshila         |
| HIDden in plain sight        | Forensic          | Kenshila         |
| Learn to Maj+Suppr           | Forensic          | Kenshila (Elio)  |
| Rusty Safe Access            | Crypto            | Sirius           |
| L'AESprit du Labyrinthe      | Crypto            | Sirius           |
| Lamentable Comme Générateur  | Crypto            | Sirius           |
| Rusty Safe Access - 2        | Crypto            | Sirius           |
| Equations littérales - 1     | Misc              | Sirius           |
| Equations littérales - 2     | Misc              | Sirius           |
| Equations littérales - 3     | Misc              | Sirius           |
| Shadow Mentor - 1            | Osint             | Sirius           |
| Shadow Mentor - 2            | Osint             | Sirius           |
| Shadow Mentor - 3            | Osint             | Sirius           |
| Shadow Mentor - 4            | Osint             | Sirius           |
| Invisible code               | Reverse           | Sirius           |
| JSingularity                 | Reverse           | Sirius           |
| eXORcist                     | Reverse           | Sirius           |
| JSingularity - 2             | Reverse           | Sirius           |
| AveugleMan                   | Stegano           | Sirius           |
| Cropped                      | Stegano           | Sirius           |
| Légendes Anciennes           | Stegano           | Sirius           |
| Romanascii                   | Stegano           | Sirius           |
| tRICKy                       | Stegano           | Sirius           |
| L'Agence des Défis           | Web               | Sirius           |
| PDFSecure                    | Web               | Sirius           |
| PDFSecure - 2                | Web               | Sirius           |
| The BurgerKing crack         | Crypto            | Natounet         |
| Certifishark                 | Forensic          | Natounet         |
| HTTPixel                     | Forensic          | Natounet         |
| RAMène moi le fichier        | Forensic          | Natounet         |
| UVB-76 FM                    | Hardware          | Natounet         |
| PYCasso                      | Reverse           | Natounet         |
| la Team Requête - 1          | Web               | Natounet         |
| la Team Requête - Intro      | Web               | Natounet         |
| Milliseconds Matter          | Web               | Natounet         |
| la Team Requête - 2          | Web               | Natounet         |
| la Team requête - Fin        | Web               | Natounet         |
| Network-Analysis             | Forensic          | prc.d1sc0rd      |
| no surprises                 | Misc / Prog       | prc.d1sc0rd      |
| Defied Quiz                  | Osint             | prc.d1sc0rd      |
| blockParty                   | Crypto            | ptirem           |
| Ça va basculer               | Hardware          | ptirem           |
| analog ?                     | Hardware          | Cartoone         |
| usb ?                        | Hardware          | Cartoone         |
| banque grolandaise           | Pwn               | Cartoone         |
| PFC Groville                 | Pwn               | Cartoone         |
| ret2muflin                   | Pwn               | Cartoone         |
| Vénère Vigenere              | Crypto            | v.regnault       |
| c'est sous tes yeux !        | Misc              | v.regnault       |
| Hexesar                      | Cryptanalyse      | victoria_237     |
| EmodjiCipher                 | Crypto            | victoria_237     |




## Contact
Pour toute question ou demande liée à cet événement, n'hésitez pas à nous contacter via bdepalme@gmail.com.
