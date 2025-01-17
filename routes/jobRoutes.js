const express = require('express');
const router = express.Router();

// Exemple de route pour gérer les offres d'emploi
router.get('/', (req, res) => {
  res.send('Liste des offres d\'emploi');
});

module.exports = router;
