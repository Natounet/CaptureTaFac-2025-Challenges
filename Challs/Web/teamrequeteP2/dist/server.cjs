"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = initializeDatabase;
exports.insertPokemon = insertPokemon;
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const sqlite3 = __importStar(require("sqlite3"));
var cors = require('cors');
const rateLimit = require('express-rate-limit');
// // Une classe métier nommée pokemon. Notez la syntaxe typescript pour créer un objet qui a un attribut id.
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
app.use((req, res, next) => {
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
function initializeDatabase() {
    const db = new sqlite3.Database("pokemon.db", sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error("Erreur lors de l'ouverture de la base de données en lecture seule :", err.message);
        }
        else {
            console.log("Base de données SQLite ouverte en lecture seule avec succès.");
        }
    });
    return db;
}
async function insertPokemon(db, pokemon) {
    const checkQuery = `
        SELECT EXISTS(SELECT 1 FROM pokemon WHERE id = ?)
    `;
    const insertQuery = `
        INSERT INTO pokemon (id, name, height, weight, base_experience, sprite) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        // Check if the Pokémon already exists
        db.get(checkQuery, [pokemon.getId()], (err, row) => {
            if (err) {
                console.error(`Erreur lors de la vérification du Pokémon ${pokemon.getNom()} :`, err.message);
                reject(err);
                return;
            }
            if (row && row['EXISTS(SELECT 1 FROM pokemon WHERE id = ?)']) {
                console.log(`Le Pokémon ${pokemon.getNom()} est déjà présent dans la base de données.`);
                resolve();
            }
            else {
                // Insert the Pokémon if it doesn't exist
                db.run(insertQuery, [
                    pokemon.getId(),
                    pokemon.getNom(),
                    pokemon.getHeight(),
                    pokemon.getWeight(),
                    pokemon.getBaseExperience(),
                    pokemon.getSprite()
                ], (err) => {
                    if (err) {
                        console.error(`Erreur lors de l'insertion du Pokémon ${pokemon.getNom()} :`, err.message);
                        reject(err);
                    }
                    else {
                        console.log(`Pokémon ${pokemon.getNom()} inséré avec succès.`);
                        resolve();
                    }
                });
            }
        });
    });
}
async function getAllPokemons() {
    const request = new Request("https://pokeapi.co/api/v2/pokemon?limit=100", { method: "GET" });
    const response = await fetch(request);
    if (!response.ok) {
        console.error("Erreur lors de la récupération des Pokémon :", response.statusText);
        return [];
    }
    const validResponse = (await response.json());
    // Transforme les résultats en objets Pokemon
    return validResponse.results.map((p, index) => new Pokemon((index + 1).toString(), p.name));
}
async function getPokemonInfo(pokeName) {
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
    }
    catch (error) {
        console.error("Erreur réseau ou serveur :", error);
        return null;
    }
}
async function enrichPokemon(pokemon) {
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
async function fetchAndStorePokemons() {
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
    }
    catch (error) {
        console.error("Erreur lors du traitement des Pokémon :", error);
    }
    finally {
        db.close(); // Fermer la connexion à la base
    }
}
// -------------- ROUTES --------------
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
// Route POST : /api/pokemon
app.post("/api/pokemon", async (req, res) => {
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
        db.get(query, (err, row) => {
            if (err) {
                console.error("Erreur lors de la recherche du Pokémon dans la base de données :", err.message);
                return res.status(500).json({ error: "Erreur interne du serveur." + err.message });
            }
            if (!row) {
                return res.status(404).json({ error: `Le Pokémon '${pokemon_name}' n'a pas été trouvé dans la base de données.` });
            }
            return res.status(200).json(row);
        });
    }
    catch (error) {
        console.error("Erreur lors de la récupération des informations du Pokémon :", error);
        return res.status(500).json({ error: "Erreur interne du serveur." + error });
    }
    finally {
        db.close();
    }
});
// Route POST : /api/pokemons
app.post("/api/pokemons", (req, res) => {
    const { filter } = req.body;
    const db = initializeDatabase();
    let query = "SELECT name, height, weight, base_experience, sprite FROM pokemon";
    const params = [];
    if (filter) {
        query += " WHERE name LIKE ?";
        params.push(`${filter}%`);
    }
    db.all(query, params, (err, rows) => {
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
