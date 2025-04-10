# Le Secret Bien Caché

## Fichiers à fournir

- L'image Le_Secret_Bien_Cache.png

## Description

Il s'agit d'un challenge de steganographie, il faut faire du LSB pour retrouver un zip caché dans l'image, pour cela nous pouvons upload l'image sur apérisolve zsteg nous indiqueras qu'il y a une archive zip caché dnas l'image.
Nous pouvons l'extraire en codan notre propre script python:

```py
from PIL import Image

def binary_to_file(binary_data, output_file_path):
    # Convertir la chaîne binaire en octets
    byte_list = [int(binary_data[i:i+8], 2) for i in range(0, len(binary_data), 8)]
    
    with open(output_file_path, 'wb') as f:
        f.write(bytearray(byte_list[:-1]))

    print(f"[+] Fichier extrait et sauvegardé sous {output_file_path}")

def decode_file_lsb(image_path, output_file_path):
    img = Image.open(image_path)
    img = img.convert("RGB")
    pixels = img.load()

    binary_data = ""
    width, height = img.size

    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            binary_data += str(r & 1)
            binary_data += str(g & 1)
            binary_data += str(b & 1)

    binary_to_file(binary_data, output_file_path)

decode_file_lsb("Le_Secret_Bien_Cache.png", "extracted_secret.zip")
```

On a alors un zip contenant un fichier h1dd3n.txt avec ... Rien ...

En surlignant le text on se rend compte qu'il y a des espaces des tabulations et des retours à la ligne, en faisant quelque recherche on constate qu'il s'agit de whitespace.
En mettant le contenu du fichier txt dans un interpreter whitespace on retrouve le flag !

## Flag
`CTFAC{LsB_W1th_wH1t3sp4c3}`