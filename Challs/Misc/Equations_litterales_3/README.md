# Equations Litterales

## Démarrage

```
docker build -t math-ctf .
docker run -p 1337:1337 math-ctf
```

## Fichiers à fournir

- Lien vers l'instance (même instance pour les 3 niveaux)

## Description

Il s'agit d'un challenge de programmation en 3 étapes, le joueur doit résoudre des équations de plus en plus dure, la difficulté étant que tout est écrit en littérale (sauf les ()).

Voici un code python permettant de résoudre les 3 étapes du challenge.

```py
import socket
import math
import time
from sympy import symbols, sin, cos, exp, log, tan, integrate, limit, diff

# Listes de mots pour générer des nombres, fractions, opérateurs et fonctions
nombre = ["un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"]
fraction = ["demi", "tiers", "quart", "cinquième", "sixième", "septième", "huitième", "neuvième", "dixième"]
operateur = ["plus", "moins", "fois", "divisé par"]
fonction = ["cosinus de", "sinus de", "tangente de", "valeur absolue de", "inverse de", "carré de", "cube de"]
operations = ["limite","dérivée","primitive"]

x = symbols('x')

def solve_integral_expression(expression):
    expression = replaceByValue(expression)
    expr = expression.split("Primitive de ")[1].split(" pour x=")[0]
    x_value = expression.split(" pour x=")[1]
    res = str(integrate(expr, x))
    res = res.replace("x", x_value)
    return res

def generate_derivative_expression(expression):
    expression = replaceByValue(expression)
    expr = expression.split("Dérivée de ")[1].split(" pour x=")[0]
    x_value = expression.split(" pour x=")[1]
    res = str(diff(expr, x))
    res = res.replace("x", x_value)
    return res

def solve_limit_expression(expression):
    expression = replaceByValue(expression)
    expr = expression.split("Limite de ")[1].split(" pour x=")[0]
    x_value = expression.split(" pour x=")[1]
    res = str(limit(expr, x, x_value))
    return res

# Fonctions mathématiques personnalisées
def myinverse(x):
    return 1 / x

def mysquare(x):
    return x * x

def mycube(x):
    return x * x * x

# Remplace les mots par leur équivalent Python pour evaluation
def replaceByValue(equation):
    eq = equation
    eq = eq.replace("cosinus de", "math.cos")
    eq = eq.replace("sinus de", "math.sin")
    eq = eq.replace("tangente de", "math.tan")
    eq = eq.replace("valeur absolue de", "abs")
    eq = eq.replace("inverse de", "myinverse")
    eq = eq.replace("carré de", "mysquare")
    eq = eq.replace("cube de", "mycube")
    eq = eq.replace("divisé par", "/")
    eq = eq.replace("multiplié par", "*")
    eq = eq.replace("fois", "*")
    eq = eq.replace("plus", "+")
    eq = eq.replace("moins", "-")
    eq = eq.replace("demi", "/2")
    eq = eq.replace("tiers", "/3")
    eq = eq.replace("quart", "/4")
    eq = eq.replace("cinquième", "/5")
    eq = eq.replace("sixième", "/6")
    eq = eq.replace("septième", "/7")
    eq = eq.replace("huitième", "/8")
    eq = eq.replace("neuvième", "/9")
    eq = eq.replace("dixième", "/10")
    eq = eq.replace("un", "1")
    eq = eq.replace("deux", "2")
    eq = eq.replace("trois", "3")
    eq = eq.replace("quatre", "4")
    eq = eq.replace("cinq", "5")
    eq = eq.replace("six", "6")
    eq = eq.replace("sept", "7")
    eq = eq.replace("huit", "8")
    eq = eq.replace("neuf", "9")
    eq = eq.replace("dix", "10")
    return eq

def main():
    HOST = "127.0.0.1"  # Adresse IP du serveur (à adapter si nécessaire)
    PORT = 1337         # Port utilisé par le serveur

    with socket.socket() as s:
        try:
            s.connect((HOST, PORT))
        except Exception as e:
            print(f"Erreur de connexion: {e}")
            return

        cpt = 0
        while cpt < 15:
            try:
                data = b''
                while not 'Ta réponse'.encode('utf-8') in data:
                    data += s.recv(4096)
                if not data:
                    break

                message = data.decode()
                print('[+] New message:',message)

                try:
                    if "Primitive de" in message:
                        answer = eval(solve_integral_expression(message.split(":")[1].split("\n")[0]))
                    elif "Dérivée de" in message:
                        answer = eval(generate_derivative_expression(message.split(":")[1].split("\n")[0]))
                    elif "Limite de" in message:
                        answer = eval(solve_limit_expression(message.split(":")[1].split("\n")[0]))
                    else:
                        answer = eval(replaceByValue(message.split(":")[1].split("\n")[0]))     
                except:
                    answer = "Impossible"

                print(f"Réponse: {answer}")
                s.sendall((str(answer) + "\n").encode())
                cpt += 1
            except Exception as e:
                print(f"Erreur lors de la communication: {e}")
                break
        
        flag = s.recv(4096)
        flag += s.recv(4096)
        flag += s.recv(4096)
        print(flag.decode())

if __name__ == "__main__":
    main()
```

Hint 1 : Certains calculs ne sont effectivement pas possible
Hint 2 : Il existe une fonction faisant quasi tout le boulot à ta place
Hint 3 : Eval !!!
Hint 4: Tu peux de sympyfier la vie avec une certaine lib python

# Flag

CTFAC{B0b_l0v3s_m4th5_4nd_1s_4w3s0m3}