# JSingularity - 2

## Fichiers à fournir

- Lien vers la route / instance

## Description

Il s'agit d'un challenge de reverse de niveau moyen, il reprend le même principe que celui précédent mais en un peu plus complexe.

Le joueur fera face à un code javascript en jsFuck / javascript Natif, il peut retrouver le code lisible en mettant le code natif dans la console javascript. Si le joueur utilise dcode cela rendre un code plus lisible mais beaucoup moins compréhensible qu'en passant par la console.

Une fois decodé et mis dans un beautifyer le code est le suivant:

```js
function s3cr3t(passwordInput) {
    const encryptedKey = "kd7$Ghz^5Lp@";
    const crypto = {
        encode: (str, key) => {
            let xorResult = Array.from(str).map((c, i) => c.charCodeAt(0) ^ key.charCodeAt(i % key.length));
            let base64 = btoa(String.fromCharCode(...xorResult)).split('').reverse().join('');
            const shift = key.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 25;
            return Array.from(base64).map(c => String.fromCharCode((c.charCodeAt(0) + shift) % 256)).join('');
        },
    };
    return (btoa(crypto.encode(passwordInput, encryptedKey)) === "UFBkWo1tinlVWGRgX1x7ZIJZaVQ=")
}
s3cr3t(passwordInput)
```

pour reverse cette fonction le joueur devra reverse chacune des 3 étapes ce qui donne le code suivant:

```js
function decode(encodedStr, key) {
    const shift = key.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 25; // Ligne qui ne change pas car la clef est connu
    
    let base64 = Array.from(encodedStr).map(c => 
        String.fromCharCode((c.charCodeAt(0) - shift) % 256)
    ).join(''); // On fait juste un - à la place d'un +
        
    let reversedBase64 = base64.split('').reverse().join(''); // juste un reverse
    let decoded = atob(reversedBase64); // decode de la base64
        
    let originalChars = decoded.split('').map((c, i) =>
        String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    ).join(''); // On xor avec la clef
        
    return originalChars;
}
```

On peut alors appeler la fonction decode:
```js
decode(atob("UFBkWo1tinlVWGRgX1x7ZIJZaVQ="),"kd7$Ghz^5Lp@") // /!\ Ne pas oublier de faire un atob !
```

Et on obtient `j5_fUcK_43v3r`, on le rentre en tant qu'input et on flag !

Hint 1 : What the fuck is this JS
Hint 2 : La console est ton ami
Hint 3 : Decompose bien les étapes (décalage, reverse, decode du base64 et xor avec la clef)

# Flag
CTFAC{j5_fUcK_43v3r}