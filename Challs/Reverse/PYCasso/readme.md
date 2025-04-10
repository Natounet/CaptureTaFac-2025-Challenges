# PYCasso Challenge

## Fichiers à fournir
- PYCasso

## Description
PYCasso est un challenge de reverse engineering sur un fichier Python compilé. 
Le fichier binaire a été compilé avec Python 3.12 en utilisant le module `py_compile`. Une fonction `win()` est présente dans le code, mais elle n'est jamais appelée. 
Le but du challenge est d'extraire et comprendre la logique de cette fonction pour récupérer le flag.

## Informations sur le fichier
L'exécution de la commande `file` sur le binaire nous donne :
```shell
pycasso: PYCasso: Byte-compiled Python module for CPython 3.12 or newer, timestamp-based, .py timestamp: Sun Mar  9 16:27:54 2025 UTC, .py size: 1181 bytes.
```

## Décompilation
Le fichier est au format PYC (Python compilé). Plusieurs outils existent pour le décompiler :
- `uncompyle6` ( Ne fonctionne pas avec cette version de Python)
- `decompyle3` ( Ne fonctionne pas avec cette version de Python)
- `pydisasm` (recommandé pour Python >= 3.9)

### Étapes pour extraire le code :
1. Renommer le fichier en `pycasso.pyc` :
   ```shell
   mv pycasso pycasso.pyc
   ```
2. Désassembler le fichier en bytecode avec `pydisasm` :
   ```shell
   pydisasm pycasso.pyc
   ```
   Cela nous permet d'obtenir l'assembleur Python de la fonction `win()`.

## Analyse de la fonction `win()`
### Code source original :
```python
def win():
    x = [67, 84, 70, 65, 67, 123, 112, 114, 52, 55, 49, 113, 117, 51, 95, 108, 51, 95, 112, 121, 55, 104, 48, 110, 125]
    for i in x:
        print(chr(i), end="")
```
### Code en assembleur Python :
```assembly
# Method Name:       win
# Filename:          pycasso.py
# Argument count:    0
# Position-only argument count: 0
# Keyword-only arguments: 0
# Number of locals:  2
# Stack size:        6
# Flags:             0x00000003 (NEWLOCALS | OPTIMIZED)
# First Line:        29
# Constants:
#    0: None
#    1: (67, 84, 70, 65, 67, 123, 112, 114, 52, 55, 49, 113, 117, 51, 95, 108, 51, 95, 112, 121, 55, 104, 48, 110, 125)
#    2: ''
#    3: ('end',)
# Names:
#    0: print
#    1: chr
# Varnames:
#       x, i
# Local variables:
#    0: x
#    1: i
 29:           0 RESUME               0

 30:           2 BUILD_LIST           0
               4 LOAD_CONST           ((67, 84, 70, 65, 67, 123, 112, 114, 52, 55, 49, 113, 117, 51, 95, 108, 51, 95, 112, 121, 55, 104, 48, 110, 125))
               6 LIST_EXTEND          1
               8 STORE_FAST           (x)

 31:          10 LOAD_FAST            (x)
              12 GET_ITER
              14 FOR_ITER             (to 66)
              18 STORE_FAST           (i)

 32:          20 LOAD_GLOBAL          (NULL + print)
              30 LOAD_GLOBAL          (NULL + chr)
              40 LOAD_FAST            (i)
              42 CALL                 1
              50 LOAD_CONST           ("")
              52 KW_NAMES             (('end',))
              54 CALL                 2
              62 POP_TOP
         >>   64 JUMP_BACKWARD        (to 14)

 31:          66 END_FOR
              68 RETURN_CONST         (None)
```

## Extraction du flag
L'analyse du code montre qu'une liste de nombres est parcourue dans une boucle, et que chaque nombre est converti en son caractère ASCII correspondant.

En exécutant ce code séparément :
```python
x = [67, 84, 70, 65, 67, 123, 112, 114, 52, 55, 49, 113, 117, 51, 95, 108, 51, 95, 112, 121, 55, 104, 48, 110, 125]
for i in x:
    print(chr(i), end="")
```
On obtient le flag :
```
CTFAC{pr471qu3_l3_py7h0n}
```

## Hints
1. **Quel est le type du fichier ?**
2. **Certains outils de décompilation ne fonctionnent pas sur les versions récentes de Python.**
3. **Il est peut-être nécessaire de renommer le fichier en `.pyc`.**


