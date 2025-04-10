# Romanascii

## Fichiers à fournir

- Le fichier chall.txt

## Description

Il s'agit d'un challenge de steganographie. Il est fait maison cela est donc normal qu'il ne soit pas évident au premier coup d'oeil. Logique:
On remarque que le texte est séparé en paquet de phrases chacune commencant par une majuscule, si l'on prend le chiffre romain formé par ces majuscules et que l'on le decode de l'ascii cela nous donne une lettre. Pour chaque paquet de texte le joueur doit donc trouver le nombre romain puis le decoder de l'ascii

Hint 1 : Etrange Anaphore
Hint 2 : XLII = 42
Flag : CTFAC{R0m@n_5t3g}