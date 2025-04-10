# Description du défi

 Ce défi vous plonge dans le mystère de la célèbre station russe UVB-76, également connue sous le nom de "The Buzzer". Une découverte surprenante révèle que, outre ses transmissions en AM, la station émet aussi en NBFM (Narrow Band Frequency Modulation) sur la même fréquence de 4625 kHz. Votre mission est de décrypter cette transmission pour découvrir le fichier audio caché et obtenir le flag.

# Fichiers fournis
    - signal.raw : Ce fichier contient la transmission modulée en NBFM avec une porteuse à 4625 kHz.



# Instructions

## Démodulation du signal :

        Utilisez un démodulateur NBFM (Narrow Band FM) pour extraire le fichier audio à partir de signal.raw.

        Assurez-vous que le démodulateur est correctement configuré pour une porteuse à 4625 kHz, comme dans l'original UVB-76.

## Vitesse d'échantillonnage :

        Une fois le fichier audio extrait, veillez à ce qu'il soit lu à la bonne vitesse, soit 44 100 Hz. Si nécessaire, ajustez les paramètres pour garantir une lecture correcte.

## Utilisation des fichiers GNU Radio :

        Le fichier decode.grc peut être utilisé comme base pour démoduler et récupérer la transmission.

        Le fichier transmit.grc est fourni à titre de référence pour comprendre comment le signal a été généré.

## Objectif final :

        Une fois que vous avez correctement démodulé et traité le signal, vous retrouverez un fichier audio contenant un message. Ce message contient le flag, transmis en anglais.

# Outils recommandés

    GNU Radio : Pour les opérations de modulation/démodulation.


# Hint

- Hint 1 : Vous pouvez utiliser GNU Radio
- Hint 2 : La fréquence est la même que UVB originel (4625Khz)
- Hint 3 : Modulation NBFM
- Hint 4 : Verifier que vous écouter la transmission démoduler en 44100 hz

CTFAC{FM_UVB_76}