# Challenge CTF : HIDden In Plain Sight

## Fichiers à fournir
- keyboard.pcap

## Description

Le but de ce challenge est de récupérer le mot de passe qui a été tapé par l'utilisateur lors de la capture wireshark.

## Vulnérabilité

Une capture lors de l'utilisation du protocole USB permet de faire apparaître sous la section HID (Human Interface Device) un code correspondant à la.es touche.s activée.s. 

## Résolution

1.  **Recherche de la section HID dans les paquets :**
    
    Le challenger doit identifier les différents paquets qui contiennent une section HID:
    source 3.1.1, destination host. 
    Un code GID 0x00 correspond au relachement des touches.
    

2.  **Rechercher la table de correspondance du code HID :**

    Une rapide recherche en ligne permet de trouver une table de correspondance des codes.
    https://github.com/tmk/tmk_keyboard/wiki/USB:-HID-Usage-Table
    ou encore
    https://wiki.osdev.org/USB_Human_Interface_Devices
    ou encore
    https://www.youtube.com/watch?v=GOs_5p5tYmQ&t=226s


3.  **Récupération du mot de passe :**

    Une fois les codes récupérés:
    0000160000000000 s
    2000200000000000 3
    0000060000000000 c
    0000180000000000 u
    0000150000000000 r
    0000080000000000 e
    2000130000000000 P
    2000210000000000 4
    0000160000000000 s
    0000160000000000 s
    On peut alors valider le flag CTFAC{s3cureP4ss}


## Hints

*   Hint 1 : Une touche enfoncée crée un paquet à destination du host
*   Hint 2 : Il y a un total de 10 paquets qui vous intéressent.
*   Hint 3 : HIDden comme HID: Human Interface Device

Flag : CTFAC{s3cureP4ss}
