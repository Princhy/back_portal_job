require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');
const Job = require('./models/Job');
const User = require('./models/User');
const Post = require('./models/Post');
const Entite = require('./models/Entite');

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/job', jobRoutes); // Ajoutez le '/' manquant
app.use('/api/user', userRoutes); // Ajoutez le '/' manquant

// Test de la connexion à la base de données
sequelize.authenticate()
  .then(() => console.log('Connecté à la base de données MySQL avec Sequelize'))
  .catch((err) => console.error('Impossible de se connecter à la base de données :', err));

// Synchronisation des modèles
sequelize.sync({ force: true })
  .then(() => console.log('Les modèles ont été synchronisés avec succès.'))
  .catch((err) => console.error('Erreur lors de la synchronisation des modèles :', err));

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
