# Team Requête - Partie 1

## Démarrage

```
docker run -p 8000:8000 --rm --name teamrequetep1 teamrequetep1
docker build -t teamrequetep1 .
```

## Fichiers à fournir

- Lien vers l'instance

## Description

Il s'agit de la même vulnérabilité que l'étape prédente, lorsque l'on clique sur le bouton "Afficher tous les pokemon" une requête est faite à /api/pokemons avec un filtre, ce filtre est le contenu du champ textuel.
Ce paramètre filtre est directement ajouter dans une requête SQL, ce qui fait que celle-ci est vulnérable, notamment aux Union-based injection ( qui n'est pas le but de la partie 1).
Requête : `SELECT name, height, weight, base_experience, sprite FROM pokemon WHERE name LIKE '`filter`%' AND  id != '9425013436722359540686860091839895206901157191498492454862042052929570854061024990149995851733919624829' ORDER BY name ASC`
L'idée est la suivante :
    - Tous  les pokémons ne sont pas affichés, le pokemon d'ID 9425013436722359540686860091839895206901157191498492454862042052929570854061024990149995851733919624829 est filtré
    - En faisant presque le même bypass que l'introduction filter="' OR 1=1 --", il sera possible de voir le pokemon "Pokemon_un_peu_secret" dans la liste
    - En le rentrant comme filtre et en clickant sur "Rechercher", on obtient les détails de ce pokémon, notamment ID = 9425013436722359540686860091839895206901157191498492454862042052929570854061024990149995851733919624829
    - Pour retrouver le flag, il est nécessaire de retrouver la fonction présente dans ./client.js : 'numberToText' qui permet de décoder le flag.

```javascript
// TODO : Je crois qu'on a plus besoin de cette fonction - Valentin ( Stagiaire )
function numberToText(num) {
    let text = "";
    while (num > BigInt(0)) {
        text = String.fromCharCode(Number(num % BigInt(256))) + text;
        num = num / BigInt(256);
    }
    return text;
}
```

9425013436722359540686860091839895206901157191498492454862042052929570854061024990149995851733919624829n -> CTFAC{4n07h3r_byp455_f0r_4n_h1dd3n_p0k3m0n}
( Le n est important je crois, pour que ce soit reconnu comme un Bigint )



Hint 1 : Tous les pokémons ne sont pas affichés
Hint 2 : Il s'agit du même type de bypass que dans l'introduction
Hint 3 : Vous avez besoin des détails de ce pokémon secret
Hint 4 : Une fonction de decodage est disponible quelque part
Hint 5 : ./client.js
Flag : CTFAC{4n07h3r_byp455_f0r_4n_h1dd3n_p0k3m0n}
