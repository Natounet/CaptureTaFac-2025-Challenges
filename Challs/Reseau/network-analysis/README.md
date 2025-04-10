# Guide : Network Analysis  

L'objectif de ce challenge est d'analyser un fichier de capture réseau (`capture.pcapng`) et d'en tirer des conclusions en répondant correctement aux différentes questions du rapport d'analyse.  

## Étape 1 : Identifier les adresses IP  
**Description** :  
Le premier objectif est d’identifier les adresses IP du poste administrateur et du serveur local.  

**Réponses** :  
- L’adresse IP du poste administrateur est :  
  ```  
  192.168.2.5  
  ```  
- L’adresse IP du serveur local est :  
  ```  
  192.168.2.4  
  ```  

---

## Étape 2 : Analyser les types de paquets  
**Description** :  
Une analyse rapide du trafic révèle la présence de plusieurs types de paquets : ARP, ICMP et TCP.  

**Réponses** :  
- Le premier type de paquet capturé est :  
  ```  
  ARP  
  ```  
- L’outil utilisé pour tester la connexion est :  
  ```  
  ping  
  ```  
- Le protocole impliqué dans l’échange final est :  
  ```  
  HTTP  
  ```  

---

## Étape 3 : Analyse approfondie des paquets  
**Description** :  
Nous devons examiner des paquets spécifiques pour mieux comprendre ce qui s’est passé.  

**Réponses** :  
- Le premier paquet ARP est une requête adressée à l’ensemble du réseau :  
  ```  
  Everybody  
  ```  
- L’objectif de cette requête est de trouver l’adresse MAC associée à une adresse IP donnée :  
  ```  
  to find who (which MAC address) is 192.168.2.24  
  ```  
- Les paquets n°73 à 75 illustrent un processus bien connu dans les connexions TCP :  
  ```  
  TCP  
  ```  
- Ce processus correspond à l’établissement d’une connexion en trois étapes :  
  ```  
  3 ways handshake  
  ```  

---

## Étape 4 : Conclusion et récupération du flag  
**Description** :  
L’objectif final est de comprendre pourquoi certaines connexions échouent et comment l’administrateur a finalement accédé au serveur.  

**Réponses** :  
- L’adresse IP 192.168.2.24 ne répond pas car :  
  ```  
  There is no 192.168.2.24 which is up  
  ```  
- La tentative de connexion HTTP sur le port 80 échoue :  
  ```  
  doesn't work  
  ```  
- L’administrateur parvient finalement à se connecter au serveur via le port 8000, et la page affichée est :  
  ```  
  hello world  
  ```  

Une fois toutes les réponses correctes soumises, le flag est révélé :  
```
CTFAC{network-analysis-9fa7c506f71}
```
