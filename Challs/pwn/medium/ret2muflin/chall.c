#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void muflin() {
    system("/bin/sh");
}

int main (int argc, char **argv) {
    char cmd[42];

    printf("Où voulez-vous aller ?: ");
    gets(cmd);

    if(cmd == "muflin\n"){
        printf("Désolé, mais l'itinéraire ne semble pas être le bon. Êtes-vous sûr de l'adresse ? :)\n");
    }else{
        printf("Où ça ???\n");
    }

    return 0;
}
