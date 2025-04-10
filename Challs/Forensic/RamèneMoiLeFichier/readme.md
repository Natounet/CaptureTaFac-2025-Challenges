# RAMène moi ce fichier

## Description du défi

Le but de ce challenge est de retrouver le contenu du fichier actuellement ouvert.
C'est un fichier .txt `q.txt` qui est ouvert à l'aide de l'application par défaut d'Ubuntu : `gnome-text-edit`.
Le fichier fourni est une capture mémoire d'une machine virtuelle Ubuntu.
Il est nécessaire d'utiliser des outils comme Volatility pour énumérer les fichiers ouverts et récupérer le contenu de celui-ci.

## Fichier fourni
- mem.elf : Dump mémoire de la machine virtuelle
- Cheatsheet Volatility3

## Résolution

Volatility est capable de lire les captures mémoires en fonction de la version du système d'exploitation de la capture.
Lorsqu'une nouvelle version sort, il faut créer des `profils` pour que Volatility puisse lire cette capture.
( C'est le cas dans ce défi, car l'OS est la dernière version d'Ubuntu à la date de création du challenge )
Il faut donc créer ce profil en récupérant les symboles de déboggages liés à cette version.

### Récupération des informations sur le kernel linux du dump
```
vol -f mem.elf banners.Banners
```
Linux version 6.11.0-19-generic

### Récupération des symboles pour volatility3
#### Liste des kernels disponibles

Une fois la version du kernel utilisé récupérée. Il faut télécharger **ce** kernel ( pas un autre ) qui possède les **symboles de deboggages**

En général, il y a plusieurs manières de faire :

Soit le kernel est présent sur : 
http://security.ubuntu.com/ubuntu/pool/main/l/linux/

Sinon rechercher en ligne :
*( Il est possible de prendre une version `unsigned` ça ne change pas grand chose )* 

https://answers.launchpad.net/ubuntu/noble/amd64/linux-image-unsigned-6.11.0-19-generic-dbgsym/6.11.0-19.19~24.04.1

**Decompresser l'archive: ** :

```
    dpkg-deb -x linux-image-unsigned-6.11.0-19-generic-dbgsym_6.11.0-19.19~24.04.1_amd64.ddeb ./extracted
```
    
#### Creation des fichiers nécessaire pour volatility
Pour la version 3 de Volatility, il n'est plus nécessaire de le faire à la main,
Un outil existe pour extraire les différents symboles nécessaire à Volatility et de créer le profil automatiquement

```
git clone https://github.com/volatilityfoundation/dwarf2json.git
cd darf2json
go build
cd ..
```
Cette commande permet de créer le profil linux pour le kernel cible
```
./dwarf2json/dwarf2json linux --elf ./extracted/usr/lib/debug/boot/vmlinux-6.11.0-19-generic > vmlinux-6.11.0-19-generic.json 
```
#### Mettre les symboles dans le repertoire /symbols/linux de volatiltiy (a adapter à son emplacement )
```
mv vmlinux-6.11.0-19-generic.json /home/ubuntu/.local/lib/python3.12/site-packages/volatility3/symbols/linux/. 
```

### Utilisation du profil

#### Recherche des fichiers textes ouverts

Le plugin de Volatility 3 `linux.pagecache.Files` permet de lister les fichiers actuellement ouvert par les processus actuels
```
vol -f mem.elf  linux.pagecache.Files
```

En parcourant les résultats, on tombe sur le fichier suivant 

| SuperblockAddr      | MountPoint | Device | InodeNum | InodeAddr        | FileType | InodePages | CachedPages | FileMode   | AccessTime              | ModificationTime        | ChangeTime              | FilePath             |
|---------------------|------------|--------|----------|------------------|----------|------------|-------------|------------|--------------------------|-------------------------|--------------------------|-----------------------|
| 0x9d2fc033b800     | /          | 8:2    | 135506   | 0x9d3013ec53d8   | REG      | 1          | 1           | -rw-rw-r-- | 2025-03-10 21:44:52 UTC | 2025-03-10 21:42:31 UTC | 2025-03-10 21:42:31 UTC | /home/ubuntu/q.txt   |

Le plugin de Volatility 3 `linux.pagecache.InodePages` permet lui d'obtenir les vrai informations de stockage en mémoire de ce fichier et de potentiellement récupérer le contenu.
```
vol -f mem.elf linux.pagecache.InodePages --find /home/ubuntu/q.txt
```

| PageVAddr        | PagePAddr   | MappingAddr     | Index | DumpSafe | Flags                                                                 |
|------------------|------------|-----------------|-------|----------|----------------------------------------------------------------------|
| 0xd0040617c100  | 0x185f04000 | 0x9d3013ec5548 | 0     | True     | anon_exclusive, large_rmappable, lru, mappedtodisk, referenced, reported, uptodate, workingset |

Le champ `DumpSafe` à `True` signifie que l'on peut récupérer le contenu de ce fichier.
à l'aide de la même commande en précisant `--dump <output>`
```
vol -f mem.elf linux.pagecache.InodePages --find /home/ubuntu/q.txt --dump q.txt
```

On peut ensuite lire le contenu de q.txt qui est le flag en héxadecimal


- Hint 1 : Il n'y a peu être pas encore de profil pour cette version d'Ubuntu.
- Hint 2 : Si vous ne trouvez pas la version normal du kernel, vous pouvez prendre la version `unsigned`, en pensant bien à prendre celui avec symboles de deboggages
- Hint 3 : Le fichier ouvert un est .txt
- Hint 4 : Il s'appelle 'q.txt'

Flag en héxa : 43 54 46 41 43 7b 50 61 52 66 30 31 35 5f 31 4c 5f 79 5f 41 5f 64 33 35 5f 63 48 30 35 33 35 5f 31 4e 74 33 72 33 35 35 35 61 6e 74 33 35 5f 33 6e 5f 72 41 4d 7d

Flag : CTFAC{PaRf015_1L_y_A_d35_cH0535_1Nt3r3555ant35_3n_rAM}

