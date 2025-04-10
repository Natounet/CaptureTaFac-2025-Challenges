# Invisible code

## Fichiers à fournir

- Fichier invisible_code.sb3

## Description

Il s'agit d'un challenge de reverse scratch. La première chose qui saute aux yeux c'est que le code est totalement invisible !!! Mais comment ?

Après une recherche sur google en tapant `scratch invisible code` on tombe sur un short YT expliquant comment il est possible de rendre du code scratch invisible ... (`https://www.youtube.com/shorts/QZFIn0yYJPc`)
... mais aussi de le re-rendre visible.

Pour cela il suffit d'aller dans les variables et de supprimer la variable vide. Puis de changer de sprite. Et hop le code est là !

Le but est de trouver la clef.

Petit tips, il est possible d'afficher les variables dans la scène ce qui rend le deboggage plus simple. On remarque qu'il y a 3 variables importantes:
- charset (ici l'alphabet)
- check (un tableau de nombre)
- ciphertext (un tableau de lettre)

En regardant l'algorithme de plus près on remarque que la clef que l'on rentre est utilisé pour déchiffré le ciphertext et compare s'il vaut bien la valeur de check.

L'algorithme de chiffrement est assez simple il fait juste la différence des indices de l'alphabet entre le ciphertext et la clef:
On a alors pour chaque caractère i:

```
CHECK[i] = CIPHERTEXT[i] - KEY[i]
<=>
KEY[i] = CIPHERTEXT[i] - CHECK[i]
```

N'oublions pas que le tout est modulo 26 (soit le nombre total de lettre dans l'alphabet) on oubliera donc pas que le A vaut 0.
Avec le script python suivant on obtiens alors la clef suivante:
```py

check = [13, 14, 13, 0, 18, 2, 8, 8, 21, 0, 17, 8, 0, 1, 11, 4]
ciphertext = "EOADGOSMTRRVDPXO"
key = ''

assert len(check) == len(ciphertext)

for index, c in enumerate(ciphertext):
    key += chr(
        ord('A') + # Equivalent des indexs sur l'alphabet avec scratch
        (
            ord(c) - # Notre ciphertext
            (
                ord('A')+check[index] # Permet de convertir le nombre en lettre ascii représentable
            )
        ) % 26 # On met modulo 26
    )

print(key[:9]) # La clef est de taille 9 d'après le programme scratch
```

Sinon on peut se rendre compte qu'il s'agit juste d'un vigenère et que l'on peut retrouver la clef en allant sur dcode `https://www.dcode.fr/chiffre-vigenere`
En mettant : 
- `EOADGOSMTRRVDPXO` en ciphertext
- `NONASCIIVARIABLE` en key


P.S: `NONASCIIVARIABLE` peut être trouvé en convertissant check avec les lettres de l'alphabet (/!\ A=0)

On entre le résultat en input du programme scratch et c'est bon !

Hint 1: https://www.youtube.com/shorts/QZFIn0yYJPc
Hint 2: Le chiffrement utilisé est très connu
Hint 3: KEY[i] = CIPHERTEXT[i] - CHECK[i]

Flag : CTFAC{RANDOMKEY}