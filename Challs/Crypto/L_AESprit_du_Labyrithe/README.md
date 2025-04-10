# L'AESprit du labyrithe

## Démarrage

```
docker build -t aesprit .
docker run -p 6789:6789 --rm --name aesprit aesprit
```

## Fichiers à fournir

- Lien vers l'instance
- Fichier server.py

## Description

Il s'agit d'un challenge de cryptographie consistant à exploiter une vulnérabilité sur le mode CBC d'AES. Le joueur doit trouver la bonne réponse entre true ou false à 20 reprises d'affilés, la moindre erreur et il doit tout recommencer.
Pour résoudre ce challenge il faut premièrement noter que le premier bloc est un plaintext, en effet : "Secret pour XX :" fait exactement 16 octets, de plus on remarque que nnous avons le droit de tester le padding d'un ciphertext, sachant que le deuxième bloc ne contient que true ou false on se retrouve avec le plaintext suivant pour le deuxième bloc:
 - "true\x0c\x0c\x0c\x0c\x0c\x0c\x0c\x0c\x0c\x0c\x0c\x0c"
    
    ou 
 
 - "false\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b"

On peut se rendre compte que le padding reste bon pour le cas false en mettant un octet random (sauf \x0b) mais par contre cela n'est pas le cas pour le cas true.
Par conséquent en effectuant un bit flip sur le 5ième octet du premier bloc et que l'on propose ce ciphertext au serveur:
 - Soit il nous répond incorrect padding -> donc le bit flip a eu un effet sur le padding -> donc c'est un true
 - Soit il a réussi a déchiffré correctement -> donc bit flip n'a eu aucun effet sur le padding -> donc c'est un false

Hint 1 : len("true") != len("false")
Hint 2 : Analysez attentivement les différences dans le traitement du padding entre les réponses 'true' et 'false'
Hint 3 : Explorez comment un simple changement dans le premier bloc de texte peut influencer le résultat
Flag : CTFAC{B1t_Fl1pP1g_X_p4dD1nG_0r4cL3}