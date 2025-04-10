# Shadow Mentor - 3

## Fichiers à fournir

Aucun juste la description

## Description

En inspectant le contenu de cette formation, nous pouvons remarquer à la page 3 un paragraphe mentionnant le `réseau privée`.

```
Un compte publique mais parfaitement crypté avec GENIEVRE (impossible de con-naitre mdr): @0a1541487ad5e4d
```

Nous savons alors que le compte est publique et chiffré avec "GENIEVRE". Il s'agit de l'annagramme de "VIGENERE". De plus nous avons un identifiant de compte: `@0a1541487ad5e4d`

Après quelques recherches sur des réseaux sociaux publique on tombe sur un compte X avec le même @: `https://x.com/0a1541487ad5e4d`

On y retrouve plusieurs tweets, 2 chiffrés et 1 image. L'un d'eux semble être le flag chiffré: `UTQUV{WXZT_MSHR_WLRKCSRB}`

De plus nous avons une information importante, l'adresse e-mail de l'influenceur: `shadowlinkshadowlink@gmail.com`

En faisant de l'Osint dessus via divers outils (Avec `https://epieos.com/` on le retrouve vraiment facilement (faut juste mettre gmail osint sur google)), on retrouve un lien vers son google calendar: `https://calendar.google.com/calendar/u/0/embed?src=shadowlinkshadowlink@gmail.com`

Ce dernier étant publique il est possible de consulter les évènements. Un d'entre attire l'attention, il s'agit de Mémo, ayant le contenu suivant: `aHR0cHM6Ly9wYXN0ZWJpbi5jb20vVTZoSkdOQXc=`

Une fois décodé du base64 cela nous donne une url:
`https://pastebin.com/U6hJGNAw`. On consulte le pastbin contenant: `key = SalutatoijeuneentrepreneurAlorssiaujourdhuijemepermetsdetecontactercestpouruneraisontressimple`

Nous avons donc la clef pour déchiffrer les tweets. Pour cela il faut utiliser cyberchef (/!\ dcode ne marchera pas). Un indice va d'ailleurs dans ce sens dans le PDF de la formation juste en dessous du l'id du compte:

```
Essayez de contacter le "chef de la cyber" - on verra si l'illustre maître des réseaux
vous daigne une réponse.
```

En déchiffrant le tweet le plus récent on trouve le flag:
`https://gchq.github.io/CyberChef/#recipe=Vigen%C3%A8re_Decode('SalutatoijeuneentrepreneurAlorssiaujourdhuijemepermetsdetecontactercestpouruneraisontressimple')&input=VVRRVVZ7V1haVF9NU0hSX1dMUktDU1JCfQ`

Hint 1: Réseaux côté à soit disant 44 milliards
Hint 2: Creuse du côté de l'adresse mail pour trouve r la clef
Hint 3: https://epieos.com/
Hint 4: https://gchq.github.io/CyberChef/

## Flag
`CTFAC{WELL_DONE_SHERLOCK}`
