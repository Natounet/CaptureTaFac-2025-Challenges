# Décryptage du chiffrement de Vigenère sans la clé

## Introduction

Le chiffrement de Vigenère repose sur une clé répétée qui modifie chaque lettre du message. Sans la clé, il peut sembler difficile de décrypter un message, mais une méthode efficace existe : **l’indice de coïncidence (IC)**.

---

## Comprendre l’indice de coïncidence

L'indice de coïncidence, c'est **la probabilité, quand on prend deux lettres au hasard dans un texte, d'avoir deux fois la même lettre**. L'indice de coïncidence est beaucoup plus grand quand notre texte a des lettres qui ne sont pas réparties équitablement. Par exemple, en français, il y a beaucoup plus de E que de Z, et donc on a un gros IC dans les textes en français. À l'inverse, si je génère un texte aléatoire en tapant au hasard sur les touches de mon clavier, par exemple "LQVQMSJFLHDHSBBQZFDPSQJLSNBQDGVTF", la probabilité d'avoir deux fois la même lettre est beaucoup plus basse que dans un texte en français.

## Pourquoi l'IC est plus grand quand les lettres sont réparties inéquitablement ?

Imaginons une langue composée de trois lettres : le A, le B et le C. Dans cette langue, les lettres sont réparties équitablement, il y a autant de A que de B que de C.

La probabilité, quand on prend deux lettres au hasard dans un texte, d'avoir deux fois la même lettre est donc 1/3 (il y a 1/9 chance d'avoir deux fois la lettre A, 1/9 chance d'avoir deux fois la lettre B, 1/9 chance d'avoir deux fois la lettre C). D'accord.

Maintenant, imaginons une autre langue, avec les mêmes trois lettres, mais cette fois réparties très inéquitablement : il y a 90 % de A, 9 % de B, et 1 % de C. Dans cette langue, il y a 81 % de chance d'obtenir deux fois la lettre A si on prend deux lettres au hasard, 0,81 % de chance d'avoir deux fois la lettre B, et 0,01 % de chance d'avoir deux fois la lettre C. Donc au total, 81,82 % de chance d'avoir deux fois la même lettre ! C'est beaucoup plus que dans un texte aléatoire.

## La technique

Pour cracker un message chiffré avec Vigenère, on va d'abord essayer de trouver la longueur de la clé qui a été utilisée. C'est là qu'intervient l'indice de coïncidence.

Imaginons que notre clé est "KEY". La 1ère lettre du message a donc été décalée par K, et c'est pareil pour la 4ème lettre, la 7ème lettre, etc. En fait, une lettre sur 3 a été décalée par K. Et quelle que soit la clé, si la longueur de la clé est N, alors une lettre sur N a été chiffrée avec le même décalage.

Du coup, si je prends une lettre sur N dans mon texte, ça me fait un nouveau texte, qu'on va appeler le 'subtext'. Dans ce subtext, **l'indice de coïncidence est très élevé**, comme dans un texte en français. Pourquoi ? Parce que toutes les lettres E ont subi le même décalage ! Si par exemple les E ont tous été décalés et sont devenus des J, il y a du coup beaucoup plus de J que d'autres lettres. La répartition des lettres est inégale dans un subtext, *les lettres ont été décalées, mais l'IC est resté le même*.

Et voilà, on va trouver la longueur de la clé comme ça : on teste en créant un subtext d'une lettre sur deux, puis avec une lettre sur trois, une lettre sur quatre, etc., jusqu'à ce qu'on trouve un IC assez haut (supérieur à 0,055, c'est un bon seuil).

## Retrouver la clé

Une fois la longueur de la clé trouvée, on va faire des groupes.

Par exemple, si notre clé est de longueur 3, on aura les groupes suivants :
- **groupe 1** : 1ère lettre du message chiffré, 4ème lettre, 7ème lettre...
- **groupe 2** : 2ème lettre du message chiffré, 5ème lettre, 8ème lettre...
- **groupe 3** : 3ème lettre du message chiffré, 6ème lettre, 9ème lettre...

Chaque groupe de lettres suit un simple chiffrement de César (décalage fixe). On peut alors procéder ainsi :

- Analyser la fréquence des lettres : Dans un texte français, la lettre E est la plus courante. Si une autre lettre apparaît souvent dans un groupe, elle peut correspondre à E chiffré.
- Déduire le décalage : Par exemple, si la lettre la plus fréquente est X, on suppose que X représente E. Comme X est 19 positions après E dans l'alphabet, le décalage est de +19.
- Appliquer ce décalage en sens inverse : Si X correspond à E avec un décalage de +19, alors pour déchiffrer, on doit soustraire 19 à chaque lettre du groupe.

Répéter pour chaque groupe : En effectuant cette analyse pour chaque groupe de lettres, on reconstitue la clé complète.

## Appliquer à la variante Vigenère Alterné

Aha, maintenant essaye de coder tout ça pour Vigenère normal. Et une fois que c'est fait, c'est à toi d'adapter pour notre variante Vigenère !

---

N'hésite pas si tu as d'autres questions ou besoin de précisions !
