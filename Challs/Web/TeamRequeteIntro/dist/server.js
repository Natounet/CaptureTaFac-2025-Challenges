"use strict";
const express = require('express');
const rateLimit = require('express-rate-limit');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3050;
// Middleware pour limiter les requêtes
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    message: "Trop de requêtes depuis cette IP, veuillez réessayer plus tard.",
});
// Appliquer le middleware de rate limit à toutes les routes
app.use(limiter);
// Middleware pour traiter les données en format URL-encoded
app.use(express.urlencoded({ extended: true }));
// Servir les fichiers statiques (ex: index.html dans www/)
app.use(express.static(path.join(__dirname, '../www')));
// Connexion à SQLite
const db = new sqlite3.Database('./db/database.sqlite', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Erreur de connexion (lecture seule) :', err.message);
    }
    else {
        console.log('Connexion à SQLite en mode lecture seule réussie');
    }
});
// Route pour servir la page de login
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../www/index.html'));
});
// API de connexion (POST)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send("Champs requis !");
    }
    const userAgent = req.headers['user-agent'];
    if (userAgent && userAgent.toLowerCase().includes('sqlmap')) {
        return res.status(403).send("Erreur : Bien tenté petit coquin :)");
    }
    // Garde la requête SQL d'origine
    const query = `SELECT * FROM users WHERE username = ('${username}') AND (password = '${password}')`;
    db.get(query, (err, user) => {
        if (err) {
            console.error('Erreur lors de la requête SQLite:', err.message);
            return res.status(500).send("Erreur serveur ! : " + err.message);
        }
        if (!user) {
            return res.status(401).send("Identifiants incorrects !");
        }
        console.log(`Utilisateur connecté: ${user.username}`);
        if (user.username === 'admin') {
            res.send("Bien joué ! Voici le flag : CTFAC{b451c_5ql_byp455}");
        }
        else {
            res.send(`Connexion réussie - ${user.username}`);
        }
    });
});
// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error('Erreur non gérée:', err);
    res.status(500).send('Erreur serveur interne');
});
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours sur http://localhost:${PORT}`);
});
