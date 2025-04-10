# Rusty Safe Access - Partie 2

## Fichiers à fournir

- Script python rusty_safe_access_2.py
- Le fichier output.txt

## Description

Il s'agit d'un challenge de crypto portant sur RSA, le but est de déchiffré le texte chiffré C. Pour cela le joueur devra retrouver p et q. Le but est de faire découvrir une autre façon qui est utilisé par l'algorithme RSA pour déchiffrer un message de manière plus optimisé.
Le joueur connait dp et dq tel que:
dp = d % (p-1)
dq = d % (q-1)
Pour retrouver p et q 
L'algorithme repose sur la relation fondamentale de \( d_p \) dans RSA :
\[
d_p = e^{-1} \mod (p-1)
\]
1. Par définition de l'inverse modulaire :

   \[
   d_p \times e \equiv 1 \pmod{p-1}
   \]

   Ce qui signifie qu'il existe un entier \( k \) tel que :

   \[
   d_p \times e = k (p-1) + 1
   \]

2. L'algorithme itère sur les valeurs de \( k \) et réorganise cette équation sous la forme :

   \[
   p = \frac{d_p \times e - 1}{k} + 1
   \]

   Si \( k \) est correct, alors \( p \) obtenu est un entier et doit être un nombre premier.

3. En testant la primalité de \( p \), on valide si c'est bien un facteur de \( N \).

L'algorithme fonctionne car il exploite directement la structure modulaire de \( d_p \), ce qui permet de reconstruire \( p \) sans nécessiter de factorisation directe de \( N \), ce qui est normalement difficile. Il peu se coder simplement en python avec
```
for k in range(1,e):
    if(dp*e %k == 1):
        p = (dp*e - 1)//k +1
        if(is_prime(p)):
            print("[+] Find a prime factor p : ",p)
            return p
```
Ensuite le joueur peut facilement retrouver q en faisant n//p puis déchiffrer le flag

Hint 1 : RSA permet un déchiffrement optimisé via des inverses modulaires
Hint 2 : Utilise dp ​et e pour retrouver p en manipulant dp * e ≡ 1 (mod p − 1)
Hint 3 : Parcours k pour vérifier p = (dp*e - 1)//k +1 et teste sa primalité
Flag : CTFAC{CH1N353_r3M41ND3r_7H30r3M_4_0ptimzat10n}