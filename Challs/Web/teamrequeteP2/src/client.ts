
class Pokemon {
    constructor(
        private id: string,
        private nom: string,
        private height?: number,
        private weight?: number,
        private baseExperience?: number,
        private sprite?: string
    ) {}

    setId(id: string) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setNom(nom: string) {
        this.nom = nom;
    }

    getNom() {
        return this.nom;
    }

    setHeight(height: number) {
        this.height = height;
    }

    getHeight() {
        return this.height;
    }

    setWeight(weight: number) {
        this.weight = weight;
    }

    getWeight() {
        return this.weight;
    }

    setBaseExperience(baseExperience: number) {
        this.baseExperience = baseExperience;
    }

    getBaseExperience() {
        return this.baseExperience;
    }

    setSprite(sprite: string) {
        this.sprite = sprite;
    }

    getSprite() {
        return this.sprite;
    }
}
  
interface FetchResult {
    count: number;
    next: string;
    previous: null;
    results: PokemonFetch[];
  }
  
interface PokemonFetch {
    name: string;
    url: string;
}

interface SimplifiedPokemonInfo {
    id: number;
    name: string;
    height: number; // en décimètres
    weight: number; // en hectogrammes
    baseExperience: number;
    sprite: string; // URL de l'image du Pokémon
  }

async function fetchAllPokemons(filter: string): Promise<void> {
    try {
        const response = await fetch("/api/pokemons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"filter":filter}), 
        });

        if (!response.ok) {
            console.error("Erreur lors de la récupération de la liste des Pokémon.");
            return;
        }

        const data: Pokemon[] = (await response.json()).map((pokemon: any) => new Pokemon(
            "", // ID is not available in this case
            pokemon.name,
            pokemon.height,
            pokemon.weight,
            pokemon.base_experience,
            pokemon.sprite
        ));
        displayPokemonList(data);
    } catch (error) {
        console.error("Erreur réseau ou serveur :", error);
    }
}

function displayPokemonList(pokemons: Pokemon[]): void {
    const pokemonList = document.getElementById("pokemonList") as HTMLUListElement;
    if (!pokemonList) return;

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
const fetchAllButton = document.getElementById("fetchAllPokemons") as HTMLButtonElement;
const input = document.getElementById("pokeid") as HTMLInputElement;
fetchAllButton.addEventListener("click", () => fetchAllPokemons(input.value));


async function fetchPokemonDetails(pokemonName: string): Promise<void> {
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
            } else {
                console.error("Erreur lors de la récupération des données du Pokémon.");
            }
            return;
        }

        const data: SimplifiedPokemonInfo = await response.json(); // Typage des données avec `SimplifiedPokemonInfo`
        displayPokemonDetails(data);
    } catch (error) {
        console.error("Erreur réseau ou serveur :", error);
    }
}

function displayError(errorData: any): void {
    const pokemondetail = document.getElementById("pokemondetail") as HTMLDivElement;

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

function displayPokemonDetails(data: SimplifiedPokemonInfo): void {
    const pokemondetail = document.getElementById("pokemondetail") as HTMLDivElement;
    if (!pokemondetail) return;

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
const fetchButton = document.getElementById("fetchPokemon") as HTMLButtonElement;
fetchButton.addEventListener("click", () => {
    const input = document.getElementById("pokeid") as HTMLInputElement;
    const pokemonName = input.value.trim();

    if (pokemonName) {
        fetchPokemonDetails(pokemonName);
    } else {
        alert("Veuillez entrer un nom de Pokémon.");
    }
});

