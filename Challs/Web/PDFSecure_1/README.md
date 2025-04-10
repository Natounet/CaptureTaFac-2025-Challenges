# PDFSecure 1

## Démarrage

```
docker build -t pdfsecure1 .
docker run -p 5000:5000 --rm --name pdfsecure1 pdfsecure1
```

## Fichiers à fournir

- Le fichier app.py
- Le lien de l'instance

## Description

Il s'agit d'un challenge de web, le but est d'afficher le contenu de flag.txt. L'application permet d'ajouter des filigranes sur un pdf afin de les sécuriser. Le problème c'est qu'il est vulnérable à l'injection de commande, le joueur le déterminera en regardant dans le fichier app.py. Il est donc d'exécuter des commandes en mettant le filigrane suivant:

```
$(ls -la)
```
En téléchargeant le PDF l'utilisateur verra alors parmis les dossiers et fichiers, un fichier flag.txt
puis de lire le fichier contenant le flag avec

```
$(cat flag.txt)
```

P.S: Il y a d'autre moyen que $() pour éxecuter des commandes comme \`\`

Hint 1 : os.system n'est pas recommandé pour une bonne raison
Hint 2 : Une commande peut en cacher une autre
Hint 3 : Il y a un moyen d'injecter ce que tu veux dans le avec des substitution de commande
Flag : CTFAC{C0mM4nD_1nJecT10n_1s_D4ng3rOu5}