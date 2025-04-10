# Challenge CTF : Burgerking

## Fichiers à fournir
- burgerking.zip

## Description

Le but de ce challenge est de récupérer le contenu du fichier `burgerking.zip` qui est chiffré. Le chiffrement utilisé est Zipcrypto Store, qui est vulnérable à l'attaque de 'Biham and Kocher known plaintext attack'.

## Vulnérabilité

Lorsque l'on connait plus de 13 octets en clair, il est possible de retrouver les clés de chiffrement du zip. Dans notre cas, on sait que le fichier `kings_birthday.pdf` est présent dans l'archive chiffrée.

## Résolution

1.  **Recherche du fichier en clair :**

    Une rapide recherche en ligne avec le nom du pdf "burgerking kings_birthday.pdf" permet de retrouver le PDF à l'adresse suivante : [https://www.burgerking.fr/kings_birthday.pdf](https://www.burgerking.fr/kings_birthday.pdf).

2.  **Utilisation de `bkcrack` :**

    L'outil `bkcrack` permet de réaliser l'attaque de Biham et Kocher. Vous pouvez le trouver ici : [https://github.com/kimci86/bkcrack](https://github.com/kimci86/bkcrack).

3.  **Récupération des clés :**

    Exécutez la commande suivante pour retrouver les clés de chiffrement :

    ```
    bkcrack -C burgerking.zip -p kings_birthday.pdf -c burgerking.zip
    ```

    Cette commande devrait vous donner une sortie similaire à :

    ```
    Found a solution. Stopping.
    [16:21:51] Keys
    d722f820 4bf24ceb 3bec5c58
    ```

4.  **Création d'un ZIP déchiffré :**

    Utilisez les clés obtenues pour créer un ZIP sans mot de passe :

    ```
    bkcrack -C burgerking.zip -k d722f820 4bf24ceb 3bec5c58 -D dechiffrer.zip
    ```

    Le fichier `dechiffrer.zip` contiendra alors le contenu déchiffré de `burgerking.zip`.

## Hints

*   Hint 1 : Certains algorithmes de chiffrement de ZIP ne sont pas recommandés.
*   Hint 2 : Zipcrypto Store.
*   Hint 3 : BK comme Biham and Kocher.

Flag : CTFAC{d0n7_u53_z1pcryp70_570r3}


