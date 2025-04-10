#include <stdio.h>
#include <string.h>

#define KEY "S3cr3t_K3y"
#define INPUT_SIZE 26

// Tableau "expected" stocké explicitement octet par octet
static const unsigned char expected[INPUT_SIZE] = {
    0x10, 0x67, 0x25, 0x33, 0x70, 0x0f, 0x1b, 0x7b,
    0x6c, 0x2c, 0x0c, 0x07, 0x0f, 0x01, 0x03, 0x2b,
    0x13, 0x7b, 0x45, 0x4a, 0x0c, 0x6b, 0x53, 0x00,
    0x0c, 0x09
};

void xor_encrypt(const char *input, char *output, const char *key) {
    for (int i = 0; i < INPUT_SIZE; i++) {
        output[i] = input[i] ^ key[i % strlen(key)];
    }
}

int main() {
    char user_input[INPUT_SIZE + 1];
    printf("Que voulez vous eXORcisé ? : ");
    fgets(user_input, sizeof(user_input), stdin);
    user_input[strcspn(user_input, "\n")] = '\0';

    if (strlen(user_input) != INPUT_SIZE) {
        printf("L'eXORcisme n'a pas marché il faut absolument %d runes !!!\n", INPUT_SIZE);
        return 1;
    }

    char encrypted[INPUT_SIZE];
    xor_encrypt(user_input, encrypted, KEY);

    if (memcmp(encrypted, expected, INPUT_SIZE) == 0) {
        printf("Bravo ! L'eXORcisme a pas fonctionné !\n : %s\n", user_input);
    } else {
        puts("L'eXORcisme n'a pas marché!\n");
    }

    return 0;
}