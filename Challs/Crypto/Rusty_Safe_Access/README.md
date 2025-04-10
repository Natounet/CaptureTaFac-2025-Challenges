# Rusty Safe Access - Partie 1

## Fichiers à fournir

- Script python rusty_safe_access.py
- Le fichier output.txt

## Description

Il s'agit d'un challenge de crypto portant sur RSA, le but est de déchiffré le texte chiffré C. Pour cela le joueur devra reconstituer l'exposant privée d. Sachant que d = e^-1 % phi, le joueur connait déjà e ainsi qu'une valeur altéré de phi. 
Tel que phi_altered = (phi*(-42)+0xdead)%n
Pour retrouver la valeur de phi, le joueur doit soustraire 0xdead à phi_altered puis multiplier par l'inverse modulaire de (-42) le tout modulo n cela peut se faire par le code python suivant
```
phi = ((phi_altered-0xdead)*pow(-42,-1,n))%n
```
Ensuite le joueur peut réutiliser le code python du challenge pour déchiffrer le flag ou bien utilisé dcode

Hint 1 : Phi peut se retrouver en seulement 2 opérations
Hint 2 : En arithmétique modulaire on ne divise jamais !
Hint 3 : Avez vous entendu parlez de l'inverse modulaire ?
Flag : CTFAC{Kn0wn_4lt3r3d_Ph1_1s_t0_Ez!}