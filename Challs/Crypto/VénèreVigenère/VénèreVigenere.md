# Challenge CTF : Vénère Vigenère !

## Contexte

Le chiffrement de Vigenère est un algorithme classique en cryptographie symétrique. Il repose sur l'utilisation d'une clé pour effectuer un décalage de César différent à chaque caractère du message. Mais aujourd'hui, nous vous proposons une variante inédite qui complique légèrement la tâche de déchiffrement.

Saurez-vous retrouver le message clair ?

---

## Le chiffrement de Vigenère classique

Dans le chiffrement de Vigenère, chaque lettre du message est décalée selon une lettre d'une clé répétée en boucle. Plus précisément :

- On convertit chaque lettre du message en une valeur numérique (A = 0, B = 1, ..., Z = 25).
- On fait de même avec la clé.
- On applique un décalage en additionnant la valeur du message et celle de la clé modulo 26.
- On reconvertit en lettres.

**Exemple** :

Message : `HELLO`
Clé : `KEY`

On répète la clé : `KEYKE`

| Lettre | Valeur (Message) | Valeur (Clé) | Somme (mod 26) | Lettre Chiffrée |
|--------|----------------|-------------|---------------|----------------|
| H      | 7              | K (10)      | 17            | R              |
| E      | 4              | E (4)       | 8             | I              |
| L      | 11             | Y (24)      | 9             | J              |
| L      | 11             | K (10)      | 21            | V              |
| O      | 14             | E (4)       | 18            | S              |

Texte chiffré : `RIJVS`

---

## Notre variante : Vigenère Alterné

Nous avons modifié l'algorithme de Vigenère en alternant l'addition et la soustraction à chaque caractère :

- **Position paire** (0, 2, 4, ...): on applique la méthode classique (+ clé, modulo 26).
- **Position impaire** (1, 3, 5, ...): on soustrait la clé au lieu de l'ajouter (toujours modulo 26).

### Exemple

Message : `HELLO`
Clé : `KEYKE`

| Lettre | Valeur (Message) | Valeur (Clé) | Opération | Résultat (mod 26) | Lettre Chiffrée |
|--------|----------------|-------------|------------|------------------|----------------|
| H      | 7              | K (10)      | +          | 17               | R              |
| E      | 4              | E (4)       | -          | 0                | A              |
| L      | 11             | Y (24)      | +          | 9                | J              |
| L      | 11             | K (10)      | -          | 1                | B              |
| O      | 14             | E (4)       | +          | 18               | S              |

Texte chiffré : `RAJBS`

---

## 


## Objectif du challenge

Vous trouverez un texte chiffré avec Vénère Vigenère. Le flag est caché dans ce texte, mais il va falloir d'abord le déchiffrer !

Format du flag : `CTFAC{message_en_clair}`

**Bonne chance !**


