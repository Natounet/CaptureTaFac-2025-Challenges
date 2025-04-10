## Challenge CTF : Contournement d'Authentification

**Description :**

Ce challenge consiste à contourner une page d'authentification pour se connecter en tant qu'administrateur. L'application possède un formulaire d'authentification, et une exploitation réussie vous donnera un accès administratif.

**Fichiers à fournir :**
- Le lien vers l'instance

**Vulnérabilité :**

La route `/api/login` est vulnérable à l'injection SQL. Les données fournies par l'utilisateur sont directement injectées dans une requête SQL sans assainissement approprié.

**Objectif :**

Contourner l'authentification pour se connecter en tant qu'utilisateur `admin`.

**Détails du challenge :**

1.  Il existe deux utilisateurs dans la base de données : `default` et `admin`.

2.  Une injection SQL typique dans le champ nom d'utilisateur, telle que `'OR 1=1 )--`, vous authentifiera en tant qu'utilisateur `default`. Ce n'est pas la solution attendue.

3.  L'injection doit être placée dans le champ mot de passe pour réussir.

4.  La parenthèse fermante `)` est cruciale pour un contournement réussi. L'omettre entraînera une requête SQL invalide, ce qui peut être utilisé pour comprendre si votre injection fonctionne.

**Indices :**

1.  Réfléchissez au fonctionnement des requêtes SQL.
2.  Le premier utilisateur de la base de données n'est pas `admin`.
3.  Assurez-vous que votre injection SQL produit une requête SQL valide.

**Flag :**

`CTFAC{b451c_5ql_byp455}`