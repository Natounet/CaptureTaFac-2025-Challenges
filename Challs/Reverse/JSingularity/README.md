# JSingularity

## Fichiers à fournir

- Lien vers la route / instance

## Description

Il s'agit d'un challenge de reverse assez simple, une sorte d'intro au javascript. Le but est de trouver la séquence à mettre pour valider.

Le code est le suivant:

```js
function checkPassword() {
    const passwordInput = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
            
    const encodedPass = [0x8a,0x82,0xa5,0xad,0x75,0x94,0x92,0x82,0xb5,0x77];
    const encodedValue = Array.from(passwordInput).map(c => c.charCodeAt(0) + 0x42);

    if (encodedValue.join('') === encodedPass.join('')) {
        messageDiv.textContent = 'Bravo tu peux validé avec le flag: CTFAC{'+passwordInput+'}';
        messageDiv.className = 'success';
        document.body.style.background = 'linear-gradient(135deg, #0a0a0a, #001a00)';
    } else {
        messageDiv.textContent = "ERREUR: Séquence invalide";
        messageDiv.className = 'error-anim';
        setTimeout(() => messageDiv.className = 'error', 2000);
    }
}
```

Il faut donc trouver l'input qui permet d'obtenir le tableau `encodedPass`, pour cela nous pouvons juste vers une fonction inverse, au lieux d'ajouter 0x42 on soustrait 0x42 et on remplace 
```js
Array.from(passwordInput).map(c => c.charCodeAt(0) + 0x42);
```
par 
```js
encodedPass.map(c => String.fromCharCode(c - 0x42)).join('');
```

et on trouve `H@ck3RP@s5`

P.S: Aussi possibilité de faire des console.log et trouver caractère par caractère

Hint 1 : Reviens aux sources
Hint 2 : La console est ton ami
Hint 3 : (c.charCodeAt(0) + 0x42) => String.fromCharCode(c - 0x42)

# Flag
CTFAC{H@ck3RP@s5}