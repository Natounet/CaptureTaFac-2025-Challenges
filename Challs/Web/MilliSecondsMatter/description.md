### Challenge : Milliseconds Matter

Vous êtes des **braqueurs d'élite**, prêts à dévaliser le coffre-fort numérique ultra-sécurisé de la **Banque Chronos**. Ce coffre renferme un secret inestimable, mais il ne se laisse pas ouvrir facilement. À chaque tentative, vous devez entrer un **code à 16 chiffres**. 

Mais voici la particularité de ce coffre :  
*Plus vous vous approchez du bon code, plus le système semble "réfléchir" avant de répondre.*

L'un de vos complices a réussi par miracle à mettre la main sur le plan de la fonction de vérification du code. Voici ce qu'il a trouvé :

```python
def verify_code(code: str) -> bool:
    for i in range(0, len(code)):
        if code[i] == SECRET_CODE[i]:
            # CALCULE TRES COMPLEXE           
        else:
            return False
``` 