# Shadow Mentor - 4

## Fichiers à fournir

Aucun juste la description

## Description

Dernière partie, il faut réutiliser tous les éléments de l'enquête depuis la première partie pour trouver le lieu de l'échange.

En déchiffrant le deuxième tweet nous avons:
`https://gchq.git
hub.io/CyberChef/#recipe=Vigen%C3%A8re_Decode('SalutatoijeuneentrepreneurAlorssiaujourdhuijemepermetsdetecontactercestpouruneraisontressimple')&input=w4l1b2ZueHogdXdtdywgcHlmIHTigJl4dm1qIHFwY21hd%2BKApiBNeiB2emlqIGtzZGV0IHhpcGlseSBwd2IgcXV2dHhrcXcgeGwgaWVidmcgYW5rY2p4diBtcXcgZcOpZ3hiYXZtLCBpc2xzIGJqY2hvdnZ3ciB0cSBjenEgdnUgY3lsdGggcXd1cMOpIMOgIHdyeHhyIHVydnBoeXIuIE7igJlwcmlkIGRyayBsd3VuIGVjb2ogcMOiamJtYSwgcW1taCBoemVzZ2sgdHl4IGcnZ2dnIMOgIHhueGJ2ZnAgMm9lIHd0IGFpZSBiw7RnaWMuIFJMTiB6w6Agb8OgbCBnc21qIHlndCB1J3pndWQgemJseCBpdm4gZ2ZyaiBZRlU`

```
Écoutez bien, les p’tits malins… Si vous savez ouvrir vos mirettes et faire marcher vos méninges, vous trouverez le nom du resto collé à cette baraque. J’vais pas tout vous mâcher, mais disons que c'est à environ 2km de mon hôtel. RDV là bàs pour que j'vous file une clef USB
```

Nous devons donc cherché le restaurant situé à côté de la maison (tweets avec l'image). La seule infomation possible d'extirper de l'image est le numéro de la maison: 87

Une recherche inversé sur google ne donne rien.

En relisant le texte nous avons une information supplémentaire: `c'est à environ 2km de mon hôtel`
Il est possible de retrouver l'hôtel dont parle l'influenceur, il s'agit de la première photo du compte instagram (précisé dans la description de cette dernière). Après une recherche inversé on trouve qu'il s'agit du `Hilton London Hyde Park`

On retrouve les coordonées GPS de l'hotel et on utilise Overpasstrubo pour chercher les maisons avec le numéro 87 dans un rayon de 2km autour de l'hotel, 

P.S: ChatGPT ou deepseek sont très utile pour générer ce genre de requête

```
[out:json][timeout:25];
(
  node["addr:housenumber"="87"](around:2000,51.510381008002234,-0.1876939763969363);
  way["addr:housenumber"="87"](around:2000,51.510381008002234,-0.1876939763969363);
  relation["addr:housenumber"="87"](around:2000,51.510381008002234,-0.1876939763969363);
);
out body;
>;
out skel qt;
```

Après quelques analyse des maisons on retombe bien sur l'image original situé au: `87 Westbourne Park Rd`

Le restaurant à côté est un pub s'appelant: The Cow
Le flag sera donc CTFAC{THE_COW}

P.S: Le CTF durant 1 semaine il est normal de passer plus de temps sur ce challenge il est en difficile 

Hint 1: https://overpass-turbo.eu/
Hint 2: Le restaurant est aussi un pub
Hint 3: On doit sûrement entendre les trains passer en terrasse

## Flag
`CTFAC{THE_COW}`
