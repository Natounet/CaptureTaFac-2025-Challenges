#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main (int argc, char **argv) {
    int solde = -1;
    char cmd[1024];

    char *endptr;
    int num = 0;

    while (1){
        printf("je te donnerai le flag si tu n'es plus à découvert\n");

        printf("vous aves %i egros !\n", solde);

        printf("combien voulez-vous dépenser (ce sera stocké dans un int) :");

        fgets(cmd, sizeof(cmd), stdin);

        size_t len = strlen(cmd);
        if (cmd > 0 && cmd[len-1] == '\n') {
            cmd[len-1] = '\0';
        }

        int num = atoi(cmd);

        if (num == 0){
            printf("Soit tu as choisi 0 ce qui est bête, soit ce n'est pas nobre.\n");
        }else if (num > 0){
            solde -= num;
        }else if (num < 0){
            printf("tu ne peux pas dépenser une quantité négative d'argent\n");
        }

        if (solde > 0){
            printf("\nCTFAC{54N73_80NH3Ur_!_54N73_80NN3_HUM3Ur_!}\n");
            return 0;
        }

        printf("\n");
    }
}