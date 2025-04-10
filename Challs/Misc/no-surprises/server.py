import socket
import threading
from sys import argv

banner = [
    "  _   _                                   _               \n",
    " | \\ | |                                 (_)              \n",
    " |  \\| | ___    ___ _   _ _ __ _ __  _ __ _ ___  ___  ___ \n",
    " | . ` |/ _ \\  / __| | | | '__| '_ \\| '__| / __|/ _ \\/ __|\n",
    " | |\\  | (_) | \\__ \\ |_| | |  | |_) | |  | \\__ \\  __/\\__ \\\n",
    " |_| \\_|\\___/  |___/\\__,_|_|  | .__/|_|  |_|___/\\___||___/\n",
    "                              | |                         \n",
    "                              |_|                         \n"
    "####Don't tell me there is a surprise eval() ?!####\n\n"
]

def remove_spaces(string):
    new_string = ""
    for c in string:
        if c != " ":
            new_string += c
    
    return new_string

def session(client_socket, addr):

    global banner

    print(f"[*] Handling connection from {addr}")
    for line in banner:
        client_socket.sendall(line.encode('ascii'))
    client_socket.sendall(b"")
    client_socket.sendall(b"\nLevel 1 - eval1 : You have an input. This input is passed to the function eval(). The result is printed. Your goal is to expose the content of the variable flag and to copy - paste it to the input.\n")
    
    flag = "CTF{eval-exec-6c0dde3}"

    while True:
        client_socket.sendall(b"> ")
        user_input = client_socket.recv(1024).decode().strip()
        if user_input == "exit()":
            client_socket.close()
            return
        if "import" in user_input:
            client_socket.sendall(b"! import is forbidden !\n")
        elif user_input == flag:
            break
        else:
            try:
                client_socket.sendall(f"{eval(user_input)}\n".encode())
            except:
                client_socket.sendall(b"error\n")

    flag = "CTF{random-eval-exec-090aeedbd6f2b8a67}"
    client_socket.sendall(b"\nLevel 2 - eval2 : Same as before, but there is a DOUBLE trick.\n")
    while True:
        client_socket.sendall(b">> ")
        user_input = client_socket.recv(1024).decode().strip()
        if user_input == "exit()":
            client_socket.close()
            return
        if "import" in user_input:
            client_socket.sendall(b"! import is forbidden !\n")
        elif user_input == flag:
            break
        else:
            try:
                client_socket.sendall(f'''{eval('"' + user_input + '"')}\n'''.encode())
            except:
                client_socket.sendall(b"error\n")

    flag = "CTF{exec-22f9959af-ok}"
    client_socket.sendall(b"\nLevel 3 - exec1 : This time, your input is not evaluated, but executed with the function exec(). There is no trick at all this time.\n")
    while True:
        client_socket.sendall(b">>> ")
        user_input = client_socket.recv(1024).decode().strip()
        if "import" in user_input:
            client_socket.sendall(b"! import is forbidden !\n")
        if user_input == "exit()":
            client_socket.close()
            return
        elif user_input == flag:
            break
        else:
            if "print(flag)" == remove_spaces(user_input):
                client_socket.sendall((flag+"\n").encode("ascii"))
            try:
                exec(user_input)
            except:
                client_socket.sendall(b"error\n")

    flag = "CTF{final-random-exec-22f9959af-1}"
    client_socket.sendall(b"\nLevel 4 (final!!!!)- exec2 : Now, there is one SINGLE trick.\n")
    while True:
        client_socket.sendall(b">>>> ")
        user_input = client_socket.recv(1024).decode().strip()
        if "import" in user_input:
            client_socket.sendall(b"! import is forbidden !\n")
        if user_input == "exit()":
            client_socket.close()
            return
        elif user_input == flag:
            break
        else:
            if "'+print(flag)+'" == remove_spaces(user_input):
                client_socket.sendall((flag+"\n").encode("ascii"))
            try:
                exec("'" + user_input + "'")
            except:
                client_socket.sendall(b"error\n")

    client_socket.sendall(b"Congratulations ! You passed the test ! Here is your flag : CTFAC{final-random-exec-22f9959af-2}.\n")
    client_socket.close()

def main():
    host = argv[1]
    port = int(argv[2])
    
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((host, port))
    server.listen(5)
    print(f"[*] Server listening on {host}:{port}")
    
    while True:
        client_socket, addr = server.accept()
        print(f"[*] Accepted connection from {addr}")
        client_thread = threading.Thread(target=session, args=(client_socket, addr))
        client_thread.start()

if __name__ == "__main__":
    if len(argv) == 3:
        main()
    else:
        print("Error : not enough arguments")
