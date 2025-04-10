## Défi de Capture Réseau HTTP et Extraction d'Images

**Description**

Ce défi consiste à analyser une capture réseau de trafic HTTP pour extraire trois images téléchargées. Une fois les images extraites, il faut les afficher dans le bon ordre afin de reconstituer le flag.

**Fichiers fournis**
- capture.pcapng

**Méthode**

1.  **Capture Réseau :** Le défi commence par la capture d'un trafic HTTP. Cette capture contient le téléchargement de trois images.
2.  **Extraction des Images :** Les images peuvent être extraites de la capture de deux manières :

    *   **Manuellement :** En analysant les paquets HTTP et en reconstituant les données des images à partir des réponses HTTP.
    *   **En utilisant Wireshark :**
        *   Ouvrir le fichier de capture dans Wireshark.
        *   Aller dans `Fichier -> Exporter Objets -> HTTP`.
        *   Sélectionner et sauvegarder les trois images.
3.  **Reconstitution du Flag :** Une fois les images extraites, les afficher dans le bon ordre pour révéler le flag.

**Flag**

Hint 1 : Le logiciel le plus souvent utilisé pour analyser le trafic réseau est wireshark.
Hint 2 : Trois images sont téléchargées
Hint 3 : Deux méthodes possible : Le faire manuellement ou de manière automatisée avec wireshark

`CTFAC{4n_345y_0n1}`
