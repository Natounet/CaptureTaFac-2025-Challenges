# Team Requête - Fin

## Fichiers à fournir

- Lien vers l'instance

## Description

Ce challenge est le dernier de la série Team Requête. Votre objectif final est d'extraire le mot de passe de l'utilisateur `admin`. Deux types d'injections SQL sont possibles :

- Boolean-based Blind SQLi
- Time-based Blind SQLi

(Note : Bien que des outils comme `sqlmap` puissent identifier les vulnérabilités avec des configurations spécifiques (par exemple, en modifiant le `User-Agent` et en augmentant le `risk` et le `level`), l'objectif est de comprendre et d'exploiter manuellement les failles.)

Les messages d'erreur SQL sont affichés, ce qui peut vous aider à affiner vos requêtes. L'approche recommandée est d'extraire le mot de passe caractère par caractère.

## Boolean-based Blind SQLi

### Caractère Valide

Voici un exemple de requête pour tester si le mot de passe commence par une lettre spécifique :

**Requête :**

```
username: admin
password: ') OR (password GLOB 'C*' ) -- 
```

**Réponse attendue :** `{"success":"Vous êtes connecté en tant que : admin"}`

Si vous obtenez cette réponse, cela signifie que le mot de passe de l'utilisateur `admin` commence par la lettre `C`.

### Caractère Invalide

**Requête :**

```
username: admin
password: ') OR (password GLOB 'A*' ) --
```

**Réponse attendue :** `{"error":"Identifiants incorrectes."}`

Cette réponse indique que le mot de passe ne commence pas par la lettre `A`.

### Méthode

La stratégie consiste à répéter ce processus caractère par caractère pour reconstruire l'intégralité du mot de passe.

Par exemple, pour vérifier si le mot de passe commence par "CT" :

**Requête :**

```
password : ') OR (password GLOB 'CT*' ) --
```

Si la réponse est positive, cela signifie que le mot de passe commence par "CT", et ainsi de suite.

Un script d'exemple, `exploit.py`, est fourni pour illustrer comment automatiser cette attaque.

## Hints

- Hint 1 : Essayez de provoquer des erreurs SQL pour mieux comprendre la structure de la requête.
- Hint 2 : Portez une attention particulière à la syntaxe de vos requêtes pour éviter les erreurs SQL.
- Hint 3 : N'oubliez pas que vous avez le choix entre une Boolean-based Blind SQLi et une Time-based Blind SQLi.
- Hint 4 : Vous pouvez vérifier si le début du mot de passe correspond à un caractère ou une chaîne spécifique.
- Hint 5 : Soyez attentif à la casse ! (`LIKE` n'est pas sensible à la casse ; utilisez une autre fonction SQL pour une comparaison sensible à la casse).

Flag : `CTFAC{b00l34n_0r_71m3_b453d_bl1nd_5ql_1nj3c710n}`
