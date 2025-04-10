var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
import * as sqlite3 from 'sqlite3';
var cors = require('cors');
const rateLimit = require('express-rate-limit');




// // Une classe métier nommée pokemon. Notez la syntaxe typescript pour créer un objet qui a un attribut id.
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


const app = express();
const PORT = 8002;

// Middleware pour limiter les requêtes
const limiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 20, // Limite chaque IP à 10 requêtes par fenêtre de 15 minutes
    message: "Trop de requêtes depuis cette IP, veuillez réessayer plus tard.",
  });
  
  
  app.use(limiter);
  
// Middleware pour analyser les corps de requêtes JSON
app.use(bodyParser.json());

// Activer CORS
app.use(cors());

// Middleware pour bloquer les requêtes contenant "sqlmap" dans l'User-Agent
app.use((req:any, res:any, next:any) => {

    if (req.url === '/server.cjs') {
        return res.status(404).send('Cannot GET /server.cjs');
    }
    
    const userAgent = req.headers['user-agent'];
    if (userAgent && userAgent.toLowerCase().includes('sqlmap')) {
        return res.status(403).json({ error: "Requête interdite." });
    }
    next();
});


// Servir les fichiers statiques (JS, CSS, etc.) depuis le dossier 'dist'
app.use(express.static(path.join(__dirname, '')));


// ---------------------------------------- 
// Initialisation de la base de données SQLite en mode lecture seule
export function initializeDatabase(): sqlite3.Database {
    const db = new sqlite3.Database("pokemon.db", sqlite3.OPEN_READONLY, (err: any) => {
        if (err) {
            console.error("Erreur lors de l'ouverture de la base de données en lecture seule :", err.message);
        } else {
            console.log("Base de données SQLite ouverte en lecture seule avec succès.");
        }
    });

    return db;
}


export async function insertPokemon(db: sqlite3.Database, pokemon: Pokemon): Promise<void> {
    const checkQuery = `
        SELECT EXISTS(SELECT 1 FROM pokemon WHERE id = ?)
    `;
    const insertQuery = `
        INSERT INTO pokemon (id, name, height, weight, base_experience, sprite) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
        // Check if the Pokémon already exists
        db.get(checkQuery, [pokemon.getId()], (err:any, row: { [key: string]: number }) => {
            if (err) {
                console.error(`Erreur lors de la vérification du Pokémon ${pokemon.getNom()} :`, err.message);
                reject(err);
                return;
            }

            if (row && row['EXISTS(SELECT 1 FROM pokemon WHERE id = ?)']) {
                console.log(`Le Pokémon ${pokemon.getNom()} est déjà présent dans la base de données.`);
                resolve();
            } else {
                // Insert the Pokémon if it doesn't exist
                db.run(insertQuery, [
                    pokemon.getId(),
                    pokemon.getNom(),
                    pokemon.getHeight(),
                    pokemon.getWeight(),
                    pokemon.getBaseExperience(),
                    pokemon.getSprite()
                ], (err:any) => {
                    if (err) {
                        console.error(`Erreur lors de l'insertion du Pokémon ${pokemon.getNom()} :`, err.message);
                        reject(err);
                    } else {
                        console.log(`Pokémon ${pokemon.getNom()} inséré avec succès.`);
                        resolve();
                    }
                });
            }
        });
    });
}



async function getAllPokemons(): Promise<Pokemon[]> {  
    const request = new Request("https://pokeapi.co/api/v2/pokemon?limit=100", { method: "GET" });
  
    const response = await fetch(request);
  
    if (!response.ok) {
        console.error("Erreur lors de la récupération des Pokémon :", response.statusText);
        return [];
    }
  
    const validResponse = (await response.json()) as FetchResult;

    // Transforme les résultats en objets Pokemon
    return validResponse.results.map((p, index) => new Pokemon((index + 1).toString(), p.name));
}


async function getPokemonInfo(pokeName: string): Promise<SimplifiedPokemonInfo | null> {
    try {
        const request = new Request(`https://pokeapi.co/api/v2/pokemon/${pokeName}`, { method: "GET" });
        const response = await fetch(request);

        if (!response.ok) {
            console.error("Erreur lors de la récupération des données :", response.statusText);
            return null;
        }

        const data = await response.json();

        return {
            id: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            baseExperience: data.base_experience,
            sprite: data.sprites.front_default,
        };
    } catch (error) {
        console.error("Erreur réseau ou serveur :", error);
        return null;
    }
}

async function enrichPokemon(pokemon: Pokemon): Promise<Pokemon | null> {
    const details = await getPokemonInfo(pokemon.getNom());
    
    if (details) {
        pokemon.setHeight(details.height);
        pokemon.setWeight(details.weight);
        pokemon.setBaseExperience(details.baseExperience);
        pokemon.setSprite(details.sprite);
        
        return pokemon;
    }
    
    return null;
}

async function fetchAndStorePokemons(): Promise<void> {
    const db = initializeDatabase(); // Initialiser la base de données

    try {
        // Récupérer tous les noms des Pokémon
        const allPokemons = await getAllPokemons();

        for (const pokemon of allPokemons) {
            // Enrichir chaque Pokémon avec ses détails
            const enrichedPokemon = await enrichPokemon(pokemon);

            if (enrichedPokemon) {
                // Insérer dans la base SQLite
                await insertPokemon(db, enrichedPokemon);
            }
        }

        console.log("Tous les Pokémon ont été insérés dans la base.");
    } catch (error) {
        console.error("Erreur lors du traitement des Pokémon :", error);
    } finally {
        db.close(); // Fermer la connexion à la base
    }
}

// -------------- ROUTES --------------

app.get("/", (req: any, res: any) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Route POST : /api/pokemon
app.post("/api/pokemon", async (req: any, res: any) => {
    const { pokemon_name } = req.body;

    if (!pokemon_name) {
        return res.status(400).json({ error: "Le champ 'pokemon_name' est requis." });
    }
    
    if (pokemon_name.toLowerCase().includes(' or ')) {
        return res.status(403).json({ error: "Pas de OR s'il te plait." });
    }

    const db = initializeDatabase();

    

    try { 
        const query = "SELECT * FROM pokemon WHERE name = " + "'" + pokemon_name + "'";
        db.get(query, (err: any, row: any) => {
            if (err) {
                console.error("Erreur lors de la recherche du Pokémon dans la base de données :", err.message);
                return res.status(500).json({ error: "Erreur interne du serveur." + err.message });
            }

            if (!row) {
                return res.status(404).json({ error: `Le Pokémon '${pokemon_name}' n'a pas été trouvé dans la base de données.` });
            }

            return res.status(200).json(row);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des informations du Pokémon :", error);
        return res.status(500).json({ error: "Erreur interne du serveur."  + error });
    } finally {
        db.close();
    }
});



// Route POST : /api/pokemons
app.post("/api/pokemons", (req: any, res: any) => {
    const { filter } = req.body;
    const db = initializeDatabase();

    let query = "SELECT name, height, weight, base_experience, sprite FROM pokemon";
    const params: any[] = [];

    if (filter) {
        query += " WHERE name LIKE ?";
        params.push(`${filter}%`);
    }

    db.all(query, params, (err: any, rows: any[]) => {
        if (err) {
            console.error("Erreur lors de la récupération des Pokémon depuis la base de données :", err.message);
            return res.status(500).json({ error: "Erreur interne du serveur." });
        }

        return res.status(200).json(rows);
    });

    db.close();
});


// Appeler cette fonction pour démarrer le processus
//fetchAndStorePokemons();

  

  
  
// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré : http://127.0.0.1:${PORT}`);
});
