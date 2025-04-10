# eXORciste

## Fichiers à fournir

- Le binaire eXORcisme

/!\ NE PAS DONNER LE CODE SOURCE reverse.c

## Description

C'est un challenge de reverse assez basique, son but sera de trouvé la bonne valeur à mettre (le FLAG). Pour cela le joueur trouvera qu'il s'agit d'un XOR qui est appliqué entre son input et une clef. Cette clef peut se trouver facilement dans le string. Ensuite il devra utiliser un desassembleur ghidra / IDA / etc pour comprendre avec quoi est comparé la sortie du XOR, il trouvera alors un tableau et n'aura juste besoin que de XOR le tableau à la clef (le joueur pourra savoir qu'il est sur la bonne piste en déchiffrant les premiers caractères et en s'apercevant que cela forme CTFAC...)
Il est aussi possible de résoudre ce challenge en dynamique via GDB

Hint 1 : Il y a une opération binaire réversible appliquée à l'entrée.
Hint 2 : Une certaine séquence de bytes dans le binaire pourrait t'aider à comprendre cette opération.
Hint 3 : 
Hint 4 : Analyse ce qui se passe après cette opération pour trouver comment reconstruire la bonne entrée.
Flag : CTFAC{D0_U_4ls0_L0v3_X0r?}