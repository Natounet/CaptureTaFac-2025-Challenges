# L'agence des défis

## Démarrage

```
docker build -t defis .
docker run -p 3000:3000 --rm --name defis defis
```

## Fichiers à fournir

- Le lien de l'instance

## Description

Il s'agit d'un challenge web dont le but est de découvrir certaines fonctionnalités importantes qui régissent le web. Le flag est séparé en 4 parties :

### Partie 1 : /nature  
Le joueur est amené à un retour aux sources, il doit tout simplement regarder le code source.  
`Part 1: CTFAC{S0uRc3_`

### Partie 2 : /livraison  
Le joueur verra un message d'erreur en cliquant sur `🚚 Envoyer le colis` car la requête est envoyée en GET, comme indiqué dans le message d'erreur :  
```
Les colis doivent être envoyés par la POST !
```
Le joueur devra alors deviner qu'il faut modifier le type de requête GET en le remplaçant par POST (faisable avec BURP, Firefox, etc.) et la deuxième partie du flag s'affichera :  
`Part 2: P0sT_Tr4Nsp0rt_`

### Partie 3 : /espionnage  
Le joueur verra un message d'erreur lui indiquant que seul l'agent 007 peut accéder au contenu sensible. Il devra alors changer son User-Agent pour `007` et la troisième partie du flag s'affichera :  
`Part 3: Us3r_4g3nt_007_`

### Partie 4 : /cuisine  
Le but est de cuisiner des cookies. En cliquant sur `Commencer la préparation`, le joueur obtiendra un message d'erreur lui indiquant que les cookies ne sont pas assez cuits. Il devra alors regarder ses cookies et constater qu'il y en a 2 :  
```
preparation=true
cuisson=false
```
Il devra donc modifier la valeur du cookie cuisson en la mettant à `true` et la dernière partie du flag s'affichera :  
`Part 4: 4nD_C00k13_Ch3f}`

Hint Général: https://portswigger.net/burp 
Hint P2: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods
Hint P3: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent
Hint P4: https://developer.mozilla.org/fr/docs/Web/HTTP/Guides/Cookies
Flag : CTFAC{S0uRc3_P0sT_Tr4Nsp0rt_Us3r_4g3nt_007_4nD_C00k13_Ch3f}