from Crypto.Util.number import *
from secret import FLAG

class RSA:

    def __init__(self, size=2048):
        self.p = getPrime(size//2)
        self.q = getPrime(size//2)

        self.n = self.p*self.q
        self.e = 0x10001
        self.phi = (self.p-1)*(self.q-1)
        self.d = pow(self.e, -1, self.phi)
        
        self.dp = self.d % (self.p-1)
        self.dq = self.d % (self.q-1)
        self.qinv = pow(self.q, -1, self.p)

    def encrypt(self, m):
        m = bytes_to_long(m)
        return pow(m, self.e, self.n)

    def decrypt(self, c):
        mp = pow(c, self.dp, self.p)
        mq = pow(c, self.dq, self.q)
        h = ( (mp - mq) * self.qinv ) % self.p
        m_int = (mq + h * self.q) % self.n
        return long_to_bytes(m_int)
    
class Chall:

    def __init__(self):
        self.rsa = RSA()

    def encryptFlag(self):
        return self.rsa.encrypt(FLAG)
    
    def hint(self):
        print(f"n = {self.rsa.n}")
        print(f"e = {self.rsa.e}")
        print(f"c = {self.encryptFlag()}")
        print(f"dp = {self.rsa.dp}")
        print(f"dq = {self.rsa.dq}")

chall = Chall()
chall.encryptFlag()
chall.hint()