import socketserver
import random
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

# Fonctions de génération d'éléments simples
def generateStep2_simple():
    if random.random() < 0.7:
        return random.choice(nombre)
    else:
        return f"{random.choice(nombre)} {random.choice(fraction)}"

def generateStep3_simple():
    choice = random.random()
    if choice < 0.6:
        return random.choice(nombre)
    elif choice < 0.8:
        return f"{random.choice(nombre)} {random.choice(fraction)}"
    else:
        return random.choice(fonction) + "(" + generateStep3_simple() + ")"
    
def generateStep4_simple():
    choice = random.random()
    
    # Ajouter des termes numériques simples ou fractionnaires
    if choice < 0.6:
        final_term = random.choice(nombre)
    else:
        final_term = f"{random.choice(nombre)} {random.choice(fraction)}"
    x_term = f" fois x"
    if random.random() < 0.5:
        x_term += f" plus {random.choice(nombre)}"  # x + n
    elif random.random() < 0.5:
        x_term += f"**2"  # x^2
    elif random.random() < 0.5:
        x_term += f"**3"  # x^3
        
    return final_term + x_term

def generate_integral_terms(nb_elements=1):
    x_value = random.randint(-500, 500)
    return f"Primitive de {generate_expression(nb_elements,use_function=False, use_variable=True)} pour x={x_value}" 

def generate_derivative_terms(nb_elements=1):
    x_value = random.randint(-500, 500)
    return f"Dérivée de {generate_expression(nb_elements,use_function=False, use_variable=True)} pour x={x_value}"

def generate_limit_terms(nb_elements=1):
    x_value = random.randint(-500, 500)
    return f"Limite de {generate_expression(nb_elements,use_function=False, use_variable=True)} pour x={x_value}"

def solve_integral_expression(expression):
    expression = replaceByValue(expression)
    expr = expression.split("Primitive de ")[1].split(" pour x=")[0]
    x_value = expression.split(" pour x=")[1]
    res = str(integrate(expr, x))
    res = res.replace("x", "("+str(x_value)+")")
    return res

def generate_derivative_expression(expression):
    expression = replaceByValue(expression)
    expr = expression.split("Dérivée de ")[1].split(" pour x=")[0]
    x_value = expression.split(" pour x=")[1]
    res = str(diff(expr, x))
    res = res.replace("x", "("+str(x_value)+")")
    return res

def solve_limit_expression(expression):
    expression = replaceByValue(expression)
    expr = expression.split("Limite de ")[1].split(" pour x=")[0]
    x_value = expression.split(" pour x=")[1]
    res = str(limit(expr, x, "("+str(x_value)+")"))
    return res

# Génère une expression arithmétique avec un nombre défini d'opérations
# Si use_function est True, on utilise generateStep3_simple pour plus de complexité
def generate_expression(nb_elements, use_function, use_variable=False):
    if use_function:
        elem = generateStep3_simple()
    else:
        elem = generateStep2_simple()
    if use_variable:
        elem = generateStep4_simple()
    elements = [elem]
    parenthesis_open = False

    for _ in range(nb_elements):
        elements.append(random.choice(operateur))
        if not parenthesis_open and random.random() < 0.3:
            elements.append("(")
            parenthesis_open = True
        if use_function:
            elem = generateStep3_simple()
        else:
            elem = generateStep2_simple()
        if use_variable:
            elem = generateStep4_simple()
        elements.append(elem)
        if parenthesis_open and random.random() < 0.5:
            elements.append(")")
            parenthesis_open = False

    if parenthesis_open:
        elements.append(")")
    expr = " ".join(elements)
    return expr

# En fonction du round, la difficulté augmente
def generate_equation(round_num):
    # Les rounds 1 à 3 utilisent des expressions simples
    if round_num <= 5:
        # Complexité: nombre d'opérations croissant
        nb_elements = {1: 3, 2: 5, 3: 7, 4: 15, 5: 30}[round_num]
        return generate_expression(nb_elements, use_function=False), None
    elif round_num <= 10:
        # Rounds 4 et 10 intègrent des fonctions trigonométriques et récursives
        nb_elements = {4: 10, 5: 15, 6: 20, 7:30, 8:50, 9:100, 10: 200}[round_num]
        return generate_expression(nb_elements, use_function=True), None
    else:
        nb_elements = {11: 1, 12: 3, 13: 5, 14:10, 15:20}[round_num]
        random_choice = random.choice(operations)
        if random_choice == "limite":
            return generate_limit_terms(nb_elements), "limite"
        elif random_choice == "dérivée":
            return generate_derivative_terms(nb_elements), "dérivée"
        else:
            return generate_integral_terms(nb_elements), "primitive"

# Gestionnaire de connexion TCP
class CTFHandler(socketserver.StreamRequestHandler):
    def handle(self):
        self.request.settimeout(3)  # Timeout global par précaution
        
        # Introduction et lore
        intro = (
            "**************************************************\n"
            "* Bienvenue dans l'antre mystique de BobLeRobot *\n"
            "**************************************************\n"
            "\n"
            "Salut, aventurier ! Je suis BobLeRobot, le gardien des nombres.\n"
            "Ici, dans ce temple digital, tu devras résoudre 10 énigmes\n"
            "de difficulté croissante. Chaque énigme mettra à l'épreuve\n"
            "ta logique et ta rapidité. Si une équation te semble impossible,\n"
            "réponds par 'Impossible'.\n"
            "Tu as 2 secondes pour chaque réponse. Prêt à relever le défi ?\n\n"
        )
        self.wfile.write(intro.encode('utf-8'))
        time.sleep(1)

        for round_num in range(1, 16):
            
            eq, op = generate_equation(round_num)
            if round_num < 6:
                palier = "Facile"
            elif round_num < 11:
                palier = "Moyen"
            else:
                palier = "Difficile"
            self.wfile.write(f"[Palier - {palier}][{((round_num-1)%5+1)}/5] Calculer : {eq}\nTa réponse: \n".encode('utf-8'))
            self.wfile.flush()

            # Timeout de 2 secondes pour la réponse
            self.request.settimeout(2)
            try:
                answer_line = self.rfile.readline().strip().decode()
            except Exception:
                self.wfile.write("\nTemps écoulé ! L'aventure se termine ici...\n".encode('utf-8'))
                return

            # Evaluation de l'expression
            try:
                if op == "limite":
                    replaced = solve_limit_expression(eq)
                elif op == "dérivée":
                    replaced = generate_derivative_expression(eq)
                elif op == "primitive":
                    replaced = solve_integral_expression(eq)
                else:
                    replaced = replaceByValue(eq)
                result = eval(replaced)
            except ZeroDivisionError:
                result = "Impossible"
            except Exception:
                result = "Impossible"

            correct = False
            if result == "Impossible":
                if answer_line.strip().lower() == "impossible":
                    correct = True
            else:
                try:
                    user_val = float(answer_line.strip())
                    if math.isclose(user_val, result, rel_tol=1e-5):
                        correct = True
                except:
                    correct = False

            if not correct:
                self.wfile.write(f"\nMauvaise réponse !\n La bonne réponse était : {result} L'aventure s'arrête ici...\n".encode('utf-8'))
                return
            else:
                self.wfile.write("\nCorrect !\n\n".encode('utf-8'))
                self.wfile.flush()
            
            if round_num == 5:
                self.wfile.write("Félicitations ! Tu as mérité ton premier flag CTFAC{B0b_1s_b3g1nn1ng_t0_l1k3_y0u} !\n\n".encode('utf-8'))
            elif round_num == 10:
                self.wfile.write("Incroyable ! Tu as obtenu le deuxième flag, tu es un véritable génie des mathématiques CTFAC{B0b_k3eps_g3tting_pr0ud_0f_y0u} !\n\n".encode('utf-8'))
            elif round_num == 15:
                self.wfile.write("Bravo, aventurier ! Tu as terminé l'aventure avec brio et as récupéré tous les flags ! Voici ton ultime récompense CTFAC{B0b_l0v3s_m4th5_4nd_1s_4w3s0m3} !\n\n".encode('utf-8'))
                self.wfile.flush()
                break
            self.wfile.flush()

            time.sleep(0.5)

# Serveur multithreadé
class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True

if __name__ == "__main__":
    HOST, PORT = "0.0.0.0", 1337
    print(f"Serveur démarré sur {HOST}:{PORT}")
    with ThreadedTCPServer((HOST, PORT), CTFHandler) as server:
        server.serve_forever()
    pass