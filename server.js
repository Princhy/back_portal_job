require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const sequelize = require('./config/database');
const api = require("./routes/api");
const ProductRouter = require("./routes/productRouter");
const entiteRoutes = require('./routes/entiteRoutes');
const postRouter = require("./routes/postRouter");
const Job = require('./models/Job');
const User = require('./models/User');
const Post = require('./models/Post');
const Entite = require('./models/Entite');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.use(bodyParser.json());

// Routes
app.use("/api", api);
app.use("/products", ProductRouter);
app.use("/api/entite", entiteRoutes);
app.use("/api/post", postRouter); // Ajouter cette ligne

// Test de la connexion à la base de données
sequelize.authenticate()
  .then(() => console.log('Connecté à la base de données MySQL avec Sequelize'))
  .catch((err) => console.error('Impossible de se connecter à la base de données :', err));

// Synchronisation des modèles
sequelize.sync({ alter: true })
  .then(() => console.log('Les modèles ont été synchronisés avec succès.'))
  .catch((err) => console.error('Erreur lors de la synchronisation des modèles :', err));

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
