# Guide : No surprises

Pour chaque niveau, l'objectif est d'afficher la variable `flag`. Le contenu devra être copier-coller dans l'input afin de passer au niveau suivant.

## Niveau 1 : Bypass de `eval()`
**Description** :
L'utilisateur entre une commande qui est évaluée avec `eval()`.

**Exploitation** :
```python
flag
```
En entrant `flag`, le programme affiche le flag :
```
CTF{eval-exec-6c0dde3}
```

---

## Niveau 2 : Double Trick avec `eval()`
**Description** :
Le programme ajoute des doubles guillemets autour de l'entrée utilisateur
**Exploitation** :
L'astuce consiste à ajouter des guillemets et un + (concaténation) autour de l'expression à évaluer, ici :
```python
" + flag + "
```
Le programme révèle alors le flag :
```
CTF{random-eval-exec-090aeedbd6f2b8a67}
```

---

## Niveau 3 : Exploitation de `exec()`
**Description** :
Le programme exécute directement l'entrée avec `exec()`. Du fait de la mise en réseau, l'instruction print ne permet pas à l'utilisateur d'afficher le flag avec print(flag). 
Le code détecte désormais si l'instruction print(flag) se trouve dans l'input (avec ou non des espaces à l'intérieur) et envoie le flag le cas échant

**Exploitation** :
Il suffit de demander l'exécution de l'instruction print(flag) :
```python
print(flag)
```
Cela affiche le flag :
```
CTF{exec-22f9959af-ok}
```

---

## Niveau 4 : Dernier challenge avec `exec()`
**Description** :
Le programme tente d'empêcher l'exécution de `print(flag)` en l'encapsulant dans une chaîne de caractères.

**Exploitation** :
On exploite la concaténation de chaînes pour injecter la commande :
```python
'+print(flag)+'
```
Cela force le programme à évaluer `print(flag)`, affichant le dernier flag :
```
CTFAC{final-random-exec-22f9959af-1}
```
!!! Attention : les challengers les plus impatients oublierons de copier-coller ce flag dans l'input afin de récupérer le vrai dernier flag :
```
CTFAC{final-random-exec-22f9959af-2}
```
