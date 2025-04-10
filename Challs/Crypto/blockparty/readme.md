
# 🕵️‍♂️ Mission: Operation Block Party 🕵️‍♀️

## 🏢 **Context**
You are an agent of the **Bytes Team** in the company **EcbCypherCorp**. A rumor is circulating within the company: your colleagues from the **Block Team** are supposedly organizing a very exclusive party.  

Some members of your team have started investigating and discovered an **application** created by the Block Team. It seems to be hiding some valuable information...  

If you manage to uncover its secret, you might just get an invitation to this exclusive party! 🎉  

---

## 🧩 **Clues**
- A member of the Bytes Team noticed a strange **permutation** in the way the blocks are processed...  
- Perhaps a certain **"swap"** could lead you to the solution? 🤔  

---

## 🎯 **Objective**
Your mission, agent, is to:
1. Analyze the application created by the Block Team.  
2. Identify the permutation or swap mechanism.  
3. Find a way to bypass the authentication.  
4. Secure your invitation to the exclusive party!  

---

✅ Stay sharp and trust your instincts — you’ve got this!  

---

## 🚀 **Your Mission Starts Now...**  
Good luck, Agent! 🔍💻  

---

## 🧑‍💻 **Pour l'organisation du challenge**

## **DOCKER**
sudo docker build -t blockpartyimage .
sudo docker run -d -p 1338:1338 --name blockparty blockpartyimage


### 🛠️ **Objectif du challenge**
L'objectif du challenge est de créer un **token d'authentification d'administrateur**.

### 🔌 **Instructions**
- L'attaquant doit se connecter via la commande suivante :  
  ```bash
  nc adresse 1338
  ```
- Il y trouvera une application où il pourra s'enregistrer.  
- Lors de son inscription, l'application génère un **token d'authentification**.  
- L'objectif est de manipuler ce token pour obtenir les privilèges administrateurs.  

---

## 📖 **Explication technique : ECB, Block Swap et Padding PKCS7**

### 🔒 **Mode ECB (Electronic Code Book)**
Le mode **ECB** (Electronic Code Book) est l'un des modes les plus simples du chiffrement par bloc. Il fonctionne comme suit :  
1. Les données sont divisées en **blocs de taille fixe** (généralement 16 octets pour AES).  
2. Chaque bloc est chiffré **indépendamment** à l’aide de la clé de chiffrement.  

Exemple de fonctionnement :  

```
PLAINTEXT:  "ATTACK AT DAWN!!"   
=> Découpage en blocs : ["ATTACK AT DAWN!!"]   
=> Chiffrement indépendant de chaque bloc  
```

🔎 **Problème majeur d'ECB**  
- Si deux blocs de texte clair sont identiques, leur version chiffrée sera également identique !  
- Cela permet à un attaquant de repérer les schémas dans le texte chiffré et de manipuler les blocs pour obtenir une sortie valide.  

---

### 🔄 **Block Swap (Permutation de blocs)**
Le **Block Swap** exploite cette faiblesse du mode ECB en permettant à un attaquant de **réarranger** les blocs chiffrés.

**Comment ça fonctionne ?**  
1. L'attaquant s'enregistre avec un nom spécifique pour contrôler le contenu des blocs.  
2. Le token renvoyé par l'application est divisé en blocs chiffrés.  
3. En copiant, intervertissant ou réarrangeant les blocs, l'attaquant peut reformer le message pour contourner l'authentification.  

---

#### 🧪 **Exemple de Block Swap :**
Imaginons que le token soit généré à partir de ces données :  
```
username=agent&role=user
```
➡️ Bloc découpé :  
```
| username= | agent&role= | user      |
```
Si l'attaquant manipule le token comme suit :  
```
| username= | agent&role= | admin     |
```
➡️ Cela permet à l'attaquant de **changer son rôle** en modifiant simplement l'ordre des blocs !

---

### 🧩 **Padding PKCS7**
Le **padding** est nécessaire dans le chiffrement par bloc car le texte à chiffrer n'est pas toujours un multiple parfait de la taille du bloc (par exemple 16 octets pour AES).  
➡️ Le **Padding PKCS7** complète automatiquement le texte avec des octets supplémentaires pour compléter le bloc.  

**Principe du PKCS7 :**  
- Si 3 octets sont nécessaires pour compléter le bloc → `\x03\x03\x03`  
- Si 7 octets sont nécessaires → `\x07\x07\x07\x07\x07\x07\x07`  
- Si le bloc est complet → un bloc complet de `\x10` (16 en décimal) est ajouté  

Exemple :  

```
"HELLO" (5 octets)  
=> Bloc complet de 16 octets avec padding PKCS7 :  
"HELLO\x0B\x0B\x0B\x0B\x0B\x0B\x0B\x0B\x0B\x0B\x0B"
```

---


✅ Associée à une **attaque par permutation de blocs**, cela permet de reconstruire ou de forger un token administrateur !  

---

### 🔓 **Stratégie d'attaque**
1. **Créer un token valide** en utilisant une valeur contrôlée.  
2. **Identifier la structure des blocs** (username, rôle, etc.).  
3. **Modifier la position des blocs** pour manipuler le contenu du token.  
5. **Accéder au compte administrateur** avec un token falsifié.  
---

### 🏆 **Objectif final**
Si l'attaquant parvient à manipuler le token en combinant :  
✅ La faiblesse du mode ECB  
✅ Le swap des blocs  
✅ Une mauvaise gestion du padding PKCS7  

➡️ Il pourra obtenir des **privilèges administrateurs** et ainsi décrocher son invitation à la soirée exclusive ! 🥳  
