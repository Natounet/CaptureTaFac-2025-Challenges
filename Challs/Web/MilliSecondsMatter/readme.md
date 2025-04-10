 # CTF Challenge: Timing Attack on a Vault Interface

 ## Description

 Ce défi CTF consiste à exploiter une vulnérabilité de type "timing attack" sur l'interface web d'un coffre-fort. L'objectif est de découvrir un code secret de 16 chiffres permettant de déverrouiller le coffre et d'accéder au flag.
 
 ## Fichiers fournis
 - Lien vers l'instance : ctf.bdepalme.fr:5000

 ## Vulnérabilité

 La page web du coffre-fort permet d'entrer un code numérique. Lors de la soumission du code via le bouton "Entrée", une requête est envoyée à l'API `/code?c=<lecode>`. Cet endpoint est vulnérable à une timing attack. Le temps de réponse de l'API varie en fonction du nombre de chiffres corrects en début de code. Plus il y a de chiffres corrects, plus le temps de réponse est long[1][2][3].

 La route `/content?c=<lecode>`, elle, permet d'afficher le flag une fois le code correct rentré.

 ## Étapes de résolution

 1.  **Identification de la vulnérabilité :** Comprendre le principe d'une timing attack et identifier comment elle se manifeste dans l'application[1][2].
 2.  **Développement d'un script d'exploitation :** Créer un script qui automatise le processus de bruteforce du code, en mesurant les temps de réponse de l'API pour chaque chiffre testé[3][4].
 3.  **Analyse statistique des temps de réponse :** Pour chaque position dans le code, tester tous les chiffres possibles (0-9). Effectuer plusieurs tentatives (par exemple, 10) pour chaque chiffre et calculer le temps de réponse moyen. Le chiffre qui engendre le temps de réponse le plus long est le chiffre correct pour cette position[5][6][7].
 4.  **Reconstitution du code :** Répéter l'étape précédente pour chaque position du code afin de reconstituer le code secret complet.
 5.  **Accès au flag :** Une fois le code trouvé, deux options sont possibles :
 6.  Entrer le code manuellement dans l'interface web du coffre-fort.
 7.  Envoyer une requête directement à l'endpoint `/content?c=<lecode>` pour afficher le flag.

 ## Hints

 *   **Hint 1 :** Il n'est pas obligatoire d'utiliser l'interface du coffre-fort. Vous pouvez interagir directement avec l'API de vérification du code.
 *   **Hint 2 :** Vous devriez remarquer que pour certains chiffres que vous entrez, le temps de réponse de l'API est significativement plus long.
 *   **Hint 3 :** Cette différence de temps de réponse est la clé pour réaliser une timing attack.
 *   **Hint 4 :** Il peut être intéressant de collecter plusieurs échantillons de temps de réponse pour chaque chiffre afin d'obtenir des résultats fiables.
 *   **Hint 5 :** L'attaque peut prendre un certain temps à s'exécuter, soyez patient.

 ## Flag

 `CTFAC{50m371m35_3v3n_m1ll153c0nd5_m4773r}`

 ## Solution

 Le fichier `bf.py` est un script d'exemple permettant de résoudre le challenge
