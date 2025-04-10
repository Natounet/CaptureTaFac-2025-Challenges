# AveugleMan

## Fichiers à fournir

- Le fichier AveugleMan.jpg

## Description

Ce challenge de steganographie se déroule en 2 étapes.
La première est de trouver le zip caché dans l'image, cela peut se faire via l'outil steghide, mais le joueur pourra très ben utiliser un site très connu lui permettant d'analyser l'image: aperisolve. 

Une fois extrait `s3cr3t.zip`, on trouve 2 fichiers:
- Un README.md qui n'est qu'un rickroll
- Un .blind.txt

Dans cette deuxième étape le joueur devra decodé chaque encodage:
```
SWwgdGUgcmVzdGUgZW5jb3JlIDMgw6l0YXBlczogNTAgNmMgNzUgNzMgMjAgNzEgNzUgNjUgMjAg
MzIgMjAgYzMgYTkgNzQgNjEgNzAgNjUgNzMgM2EgMjAgN2QgZTIgYTAgOTEgZTIgYTAgODcgZTIg
YTAgODcgZTIgYTAgODIgZTIgYTAgYjIgZTIgYTAgOTcgZTIgYTAgODMgZTIgYTAgYjggZTIgYTAg
OTIgZTIgYTAgOGUgZTIgYTAgOTcgZTIgYTAgOTIgZTIgYTAgYTcgZTIgYTAgOTIgZTIgYTAgOTcg
ZTIgYTAgYjggZTIgYTAgYWQgZTIgYTAgOTIgZTIgYTAgOTMgZTIgYTAgYjggZTIgYTAgYjIgZTIg
YTAgOTYgZTIgYTAgOTIgZTIgYTAgOGUgZTIgYTAgYjIgZTIgYTAgODMgN2IgZTIgYTAgODkgZTIg
YTAgODEgZTIgYTAgOGIgZTIgYTAgOWUgZTIgYTAgODkgMjAgM2EgNjUgNzAgNjEgNzQgYzMgYTkg
MjAgNjUgNzIgYzMgYTggNjkgNmUgNzIgNjUgNjQgMjAgMmMgYzMgYTkgNzUgNmYgNmEgMjAgNmUg
NjUgNjkgNDIK
```

Base64 

```
50 6c 75 73 20 71 75 65 20 32 20 c3 a9 74 61 70 65 73 3a 20 7d e2 a0 91 e2 a0 87 e2 a0 87 e2 a0 82 e2 a0 b2 e2 a0 97 e2 a0 83 e2 a0 b8 e2 a0 92 e2 a0 8e e2 a0 97 e2 a0 92 e2 a0 a7 e2 a0 92 e2 a0 97 e2 a0 b8 e2 a0 ad e2 a0 92 e2 a0 93 e2 a0 b8 e2 a0 b2 e2 a0 96 e2 a0 92 e2 a0 8e e2 a0 b2 e2 a0 83 7b e2 a0 89 e2 a0 81 e2 a0 8b e2 a0 9e e2 a0 89 20 3a 65 70 61 74 c3 a9 20 65 72 c3 a8 69 6e 72 65 64 20 2c c3 a9 75 6f 6a 20 6e 65 69 42
```

Hex

```
}⠑⠇⠇⠂⠲⠗⠃⠸⠒⠎⠗⠒⠧⠒⠗⠸⠭⠒⠓⠸⠲⠖⠒⠎⠲⠃{⠉⠁⠋⠞⠉ :epaté erèinred ,éuoj neiB
```

Reverse

```
⠉⠞⠋⠁⠉{⠃⠲⠎⠒⠖⠲⠸⠓⠒⠭⠸⠗⠒⠧⠒⠗⠎⠒⠸⠃⠗⠲⠂⠇⠇⠑}
```

Braille (pour finir dans le thème d'aveugle man)

Hint 1: Cette image cache bien plus qu'un simple jpg
Hint 2: https://github.com/Zeecka/AperiSolve
Hint 3: Steghide

## Flag
`CTFAC{B4S364_H3X_R3V3RS3_BR41LLE}`
