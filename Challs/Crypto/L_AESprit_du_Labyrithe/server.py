from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import os
import random
import socket
import threading

ROUNDS = 20
PORT = 6789
FLAG = os.environ.get("FLAG", "CTFAC{REDACTED}")

def encrypt(plaintext, key, iv):
    cipher = AES.new(key, AES.MODE_CBC, iv=iv)
    return cipher.encrypt(plaintext)

def decrypt(ciphertext, key, iv):
    cipher = AES.new(key, AES.MODE_CBC, iv=iv)
    return unpad(cipher.decrypt(ciphertext), AES.block_size)

def handle_client(conn):

    KEY = os.urandom(16)
    IV = os.urandom(16)

    conn.send(b"\nVous etes devant le Coeur du Labyrinthe - une artefact cryptographique ancien\n")
    conn.send(b"Une inscription murmure : 'Vingt verites reveleront mon secret, mais un mensonge vous aneantira'\n")
    conn.send(b"L'air vibre d'energie cryptographique alors que le rituel commence...\n\n")

    wins = 0
    for round_num in range(1, ROUNDS + 1):
        secret = random.choice([b"true", b"false"])
        plaintext = pad(b"Secret pour " + str(round_num).zfill(2).encode() + b" :" + secret, 16)
        ciphertext = encrypt(plaintext, KEY, IV)
        
        conn.send(f"\nTour {round_num}:\n".encode())
        conn.send(f"Glyphes lumineux : {ciphertext.hex()}\n".encode())
        conn.send(b"Insufflez votre volonte (hex) : ")

        try:
            modified_ct = conn.recv(1024).decode().strip()
            modified_ct_bytes = bytes.fromhex(modified_ct)
            decrypt(modified_ct_bytes,KEY,IV)  # Test padding
            conn.send(b"\nL'artefact scintille...\nEnergie stabilisee\n")
        except:
            conn.send(b"\nRejet de l'artefact !\nPadding invalide\n")

        conn.send(b"\nEnoncez la verite (true/false) : ")
        guess = conn.recv(1024).decode().strip()

        if guess == secret.decode():
            wins += 1
            conn.send(f"\nCORRECT ! ({wins}/20 sceaux)\n".encode())
            if wins % 5 == 0:
                conn.send(f"Porte {wins//5}/4 debloquee\n".encode())
        else:
            conn.send(b"\nFAUX ! Le labyrinthe s'effondre...\n")
            conn.close()
            return

    conn.send(f"\nTOUS LES SCEAUX ACTIVES !\nFlag : {FLAG}\n\n".encode())
    conn.close()

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('0.0.0.0', PORT))
    s.listen(5)
    print(f"Server listening on port {PORT}")
    
    while True:
        conn, addr = s.accept()
        print(f"New connection from {addr}")

        client_handler = threading.Thread(target=handle_client, args=(conn,))
        client_handler.start()

if __name__ == "__main__":
    main()