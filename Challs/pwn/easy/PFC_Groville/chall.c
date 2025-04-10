#include <stdio.h>
#include <string.h>

int main (int argc, char **argv) {
    char adv[] = "ciseaux";
    char cmd[8];

    printf("Votre adversaire a choisi ...\n");
    printf("Que choisissiez-vous ? : ");

    fgets(cmd, 16, stdin);

    printf("Votre adversaire a choisi \"%s\" et vous avez choisi \"%s\" !\n", adv, cmd);

    if (strcmp(adv,"feuille") == 0 && strcmp(cmd,"ciseaux") == 0){
        printf("C'est bizarre mais voici ton flag : CTFAC{13_C0M73_D3_M0N73_Cr1570}\n");
        return 0;
    }else{
        printf("Manifestement tu as perdu désolé : ( !\n");
        return 0;
    }
}