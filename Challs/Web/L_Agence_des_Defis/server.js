const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Configuration
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

// Défi POST
app.route('/send')
  .get((req, res) => res.render('livraison', { error: true, flag: false }))
  .post((req, res) => res.render('livraison', { error: false, flag: true }))

// Défi User Agent
app.get('/espionnage', (req, res) => {
  const userAgent = req.headers['user-agent'] || '';
  res.render('espionnage', { is007: userAgent.includes('007') });
});

app.get('/livraison', (req, res) => {
  res.render('livraison', { error: false });
});

app.get('/nature', (req, res) => {
  res.render('nature');
});


// Défi Cookies
app.get('/cuisine', (req, res) => {
  const cookies = {
    preparation: req.cookies.preparation === 'true',
    cuisson: req.cookies.cuisson === 'true'
  };
  res.render('cuisine', { cookies });
});

app.get('/set-cookies', (req, res) => {
  res.cookie('preparation', 'true');
  res.cookie('cuisson', 'false');
  res.redirect('/cuisine');
});

app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));