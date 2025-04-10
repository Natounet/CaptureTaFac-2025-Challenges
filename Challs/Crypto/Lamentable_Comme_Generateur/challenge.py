from Crypto.Util.number import *
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import os
import base64
from secret import FLAG

class LCG:

    def __init__(self, seed,a,c,m):
        self.seed = seed
        self.a = a
        self.c = c
        self.m = m

    def next(self,iter=1):
        for _ in range(iter):
            self.seed = (self.a * self.seed + self.c) % self.m
        return self.seed
    
class Chall:

    def __init__(self):
        self.seed = bytes_to_long(os.urandom(32))
        self.m = getPrime(256)
        self.a = bytes_to_long(os.urandom(32))
        self.c = bytes_to_long(os.urandom(32))

        self.lcg = LCG(self.seed,self.a,self.c,self.m)

    def encryptFlag(self):

        key = self.lcg.next().to_bytes(32, 'big')
        iv = self.seed.to_bytes(32, 'big')[:16]

        cipher = AES.new(key=key, iv=iv, mode=AES.MODE_CBC)
        padded_FLAG = pad(FLAG, AES.block_size)
        ciphertext = cipher.encrypt(padded_FLAG)

        return ciphertext
    
    def hint(self):
        print('Here is your seed:', self.seed)
        print('Here is your m:', self.m)
        print('Here is some values:',[self.lcg.next() for i in range(10)])

chall = Chall()
flag = chall.encryptFlag()
print("Here is your flag:",base64.b64encode(flag))
chall.hint()