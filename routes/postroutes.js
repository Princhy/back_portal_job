const express = require('express');
const router = express.Router();
const { submitApplication ,getAllPosts} = require('../controllers/PostController');
const upload = require('../config/multer'); // Importer la configuration de multer
const Post = require('../models/Post'); 
const Job = require('../models/Job');  // Assurez-vous que le chemin est correct
const Entite = require('../models/Entite');
// Route pour soumettre une candidature
router.post('/postuler', upload.single('cv'), submitApplication);

router.get('/posts', getAllPosts);

router.get('/applications/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Récupérer toutes les candidatures associées à l'utilisateur avec l'entreprise
      const applications = await Post.findAll({
        where: { userId },
        include: [
          {
            model: Entite, // Assurez-vous d'inclure le modèle Entite
            attributes: ['nom_entreprise'], // Utilisez le nom de l'entreprise
          },
          {
            model: Job,
            attributes: ['titre'], // Inclure le titre du poste si nécessaire
          },
        ],
      });
  
      if (applications.length === 0) {
        return res.status(404).json({ message: 'Aucune candidature trouvée' });
      }
  
      // Retourner les candidatures
      res.json({ applications });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur', success: false });
    }
  });
  
  
  
module.exports = router;
