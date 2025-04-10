def vigenere_alternate_encrypt(plaintext, key):
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    key = key.upper()
    plaintext = plaintext.upper()
    ciphertext = ""
    
    key_length = len(key)
    key_indices = [alphabet.index(k) for k in key]
    
    for i, char in enumerate(plaintext):
        if char in alphabet:
            p_index = alphabet.index(char)
            k_index = key_indices[i % key_length]
            
            if i % 2 == 0:
                c_index = (p_index + k_index) % 26  # (P + K) mod 26
            else:
                c_index = (p_index - k_index) % 26  # (P - K) mod 26
            
            ciphertext += alphabet[c_index]
        else:
            ciphertext += char  # Garder les caractères non alphabétiques intacts
    
    return ciphertext

def vigenere_alternate_decrypt(ciphertext, key):
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    key = key.upper()
    ciphertext = ciphertext.upper()
    plaintext = ""
    
    key_length = len(key)
    key_indices = [alphabet.index(k) for k in key]
    
    for i, char in enumerate(ciphertext):
        if char in alphabet:
            c_index = alphabet.index(char)
            k_index = key_indices[i % key_length]
            
            if i % 2 == 0:
                p_index = (c_index - k_index) % 26  # (C - K) mod 26 (inverse de P + K)
            else:
                p_index = (c_index + k_index) % 26  # (C + K) mod 26 (inverse de P - K)
            
            plaintext += alphabet[p_index]
        else:
            plaintext += char
    
    return plaintext
    
    
print(vigenere_alternate_encrypt("HELLO", "KEY"))
