// // Une classe métier nommée pokemon. Notez la syntaxe typescript pour créer un objet qui a un attribut id.
export class Pokemon {
    constructor(id, nom, height, weight, baseExperience, sprite) {
        this.id = id;
        this.nom = nom;
        this.height = height;
        this.weight = weight;
        this.baseExperience = baseExperience;
        this.sprite = sprite;
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setNom(nom) {
        this.nom = nom;
    }
    getNom() {
        return this.nom;
    }
    setHeight(height) {
        this.height = height;
    }
    getHeight() {
        return this.height;
    }
    setWeight(weight) {
        this.weight = weight;
    }
    getWeight() {
        return this.weight;
    }
    setBaseExperience(baseExperience) {
        this.baseExperience = baseExperience;
    }
    getBaseExperience() {
        return this.baseExperience;
    }
    setSprite(sprite) {
        this.sprite = sprite;
    }
    getSprite() {
        return this.sprite;
    }
}
