# Lamentable Comme Générateur

## Fichiers à fournir

- Script python challenge.py
- Le fichier output.txt

## Description

Il s'agit d'un challenge de crypto portant sur les LCG, le but est de retrouver la clef de chiffrement AES générer par le LCG pour cela il faut retrouver les différents paramètres nécessaire: seed, a, c et m
Seul la seed et le modulo m sont connu du joueur. Cependant le joueur connait aussi 10 chiffrées de tel manière à ce que l'on est:
```
t0 = a * clef + c % m
t1 = a * t0 + c % m
t2 = a * t1 + c % m
t3 = a * t2 + c % m
...
t10 = a * t9 + c % m
```

Avec seulement 3 chiffrés il est possible de retrouver a et c car on a:
```
t1 - t2 = a * t0 + c % m - a * t1 - c % m
t1 - t2 = a * t0 - a * t1 % m
t1 - t2 = a * (t0-t1) % m
```
En prenant l'inverse modulaire de t0-t1 on trouve:
```
a = (t1-t2)*(t0-t1)^-1 % m
```
Puis on retrouve c avec:
```
c = (t1 - a*t0) % m
```

Nous pouvons ensuite trouver la clef AES grâce à:
- Inverse modulaire (encore) en résolvant l'équation t0 = a * clef + c % m
- En passant juste les paramètres retrouvés au LCG et en faisant self.lcg.next()

Puis reste à convertir au format avec .to_bytes(32, 'big')

Hint 1 : Poser les équations !
Hint 2 : Seul les 3 premiers chiffrés sont important
Hint 3 : a = (t1-t2)*(t0-t1)^-1 % m 
Flag : CTFAC{4r1thM3t1c_p0w3r}