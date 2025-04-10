# Shadow Mentor - 2

## Fichiers à fournir

Aucun juste la description

## Description

En inspectant les posts du compte instagram on trouve un reel qui donne un QR code redirigeant vers le site de l'influenceur. Il s'agit du site lui permettant de vendre ses formations. Comme précisé dans l'énoncé nous devons pouvoir lire le contenu de sa formation en rupture de stock : `Mastermind des Millionnaires`

Il est possible d'avoir un aperçu des autres formations mais pas de cette dernière.

En regardant attentiveemnt l'url on se rend compte que le site est hébergé sur github: `https://sh4d0w-l1nk.github.io/MaitriseRichesse/`

On retrouve le compte github : `https://github.com/SH4d0w-l1nk`
En remontant dans les commits on tombe sur un commit ayant ce fameux échantillon de `Mastermind des Millionaires`

Lien du commit : `https://github.com/SH4d0w-l1nk/MaitriseRichesse/commit/190f82050259351376b107975dbf03e9220b73d7`

Il suffit de clicker sur view file est nous retrouvons bien l'échantillon de la formation voulu:
`https://github.com/SH4d0w-l1nk/MaitriseRichesse/blob/190f82050259351376b107975dbf03e9220b73d7/formations/Mastermind_des_Millionnaire_sample.pdf`

Nous retrouvons le flag dedans en première page.

Hint 1: Le site n'est qu'une façade
Hint 2: Regarde bien l'url
Hint 3: Es-tu sûr d'avoir bien regardé le github ?

## Flag
`CTFAC{ALWAYS_CHECK_THE_COMMITS}`
