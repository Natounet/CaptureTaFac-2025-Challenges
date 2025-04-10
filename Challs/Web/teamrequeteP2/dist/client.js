"use strict";
class Pokemon {
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
async function fetchAllPokemons(filter) {
    try {
        const response = await fetch("/api/pokemons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "filter": filter }),
        });
        if (!response.ok) {
            console.error("Erreur lors de la récupération de la liste des Pokémon.");
            return;
        }
        const data = (await response.json()).map((pokemon) => new Pokemon("", // ID is not available in this case
        pokemon.name, pokemon.height, pokemon.weight, pokemon.base_experience, pokemon.sprite));
        displayPokemonList(data);
    }
    catch (error) {
        console.error("Erreur réseau ou serveur :", error);
    }
}
function displayPokemonList(pokemons) {
    const pokemonList = document.getElementById("pokemonList");
    if (!pokemonList)
        return;
    // Nettoyage de la liste avant d'ajouter du contenu
    pokemonList.innerHTML = "";
    // Ajout des Pokémon à la liste
    pokemons.forEach((pokemon) => {
        const listItem = document.createElement("li");
        listItem.textContent = pokemon.getNom();
        pokemonList.appendChild(listItem);
    });
}
// Ajout d'un événement au bouton pour récupérer tous les Pokémon
const fetchAllButton = document.getElementById("fetchAllPokemons");
const input = document.getElementById("pokeid");
fetchAllButton.addEventListener("click", () => fetchAllPokemons(input.value));
async function fetchPokemonDetails(pokemonName) {
    try {
        const request = new Request("/api/pokemon", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pokemon_name: pokemonName }), // Utilisation du champ `pokemon_name`
        });
        const response = await fetch(request);
        if (!response.ok) {
            if (response.status != 200) {
                const errorData = await response.json();
                displayError(errorData);
            }
            else {
                console.error("Erreur lors de la récupération des données du Pokémon.");
            }
            return;
        }
        const data = await response.json(); // Typage des données avec `SimplifiedPokemonInfo`
        displayPokemonDetails(data);
    }
    catch (error) {
        console.error("Erreur réseau ou serveur :", error);
    }
}
function displayError(errorData) {
    const pokemondetail = document.getElementById("pokemondetail");
    // Nettoyage de la div avant d'ajouter du contenu
    pokemondetail.innerHTML = "";
    const errorContainer = document.createElement("div");
    errorContainer.className = "error-container";
    const errorMessage = document.createElement("p");
    errorMessage.className = "error-message";
    errorMessage.textContent = `Erreur: ${JSON.stringify(errorData)}`;
    errorContainer.appendChild(errorMessage);
    pokemondetail.appendChild(errorContainer);
}
function displayPokemonDetails(data) {
    const pokemondetail = document.getElementById("pokemondetail");
    if (!pokemondetail)
        return;
    // Nettoyage de la div avant d'ajouter du contenu
    pokemondetail.innerHTML = "";
    // Création des éléments principaux
    const container = document.createElement("div");
    container.className = "pokemon-container";
    const title = document.createElement("h2");
    title.textContent = data.name.toUpperCase();
    title.className = "pokemon-title";
    const sprite = document.createElement("img");
    sprite.src = data.sprite || ""; // Utilisation de `data.sprite` directement
    sprite.alt = data.name || "Image indisponible";
    sprite.className = "pokemon-sprite";
    const details = document.createElement("p");
    details.className = "pokemon-details";
    details.innerHTML = `
        ID : ${data.id}<br>
        Taille : ${data.height / 10} m<br>
        Poids : ${data.weight / 10} kg<br>
        Expérience de base : ${data.baseExperience}
    `;
    // Ajout des éléments au container
    container.appendChild(title);
    container.appendChild(sprite);
    container.appendChild(details);
    // Ajout du container au DOM
    pokemondetail.appendChild(container);
}
// Ajout d'un événement au bouton pour afficher les détails d'un Pokémon
const fetchButton = document.getElementById("fetchPokemon");
fetchButton.addEventListener("click", () => {
    const input = document.getElementById("pokeid");
    const pokemonName = input.value.trim();
    if (pokemonName) {
        fetchPokemonDetails(pokemonName);
    }
    else {
        alert("Veuillez entrer un nom de Pokémon.");
    }
});
