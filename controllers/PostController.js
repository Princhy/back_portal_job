const Post = require('../models/Post');  // Assurez-vous d'importer correctement le modèle Post
const path = require('path');

// Fonction pour gérer la soumission d'une candidature
const submitApplication = async (req, res) => {
  try {
    // Extraction des données du corps de la requête
    const { message, userId, jobId, entiteId, status } = req.body;
    const cv = req.file;  // Le fichier CV envoyé

    // Vérification que le fichier CV est bien envoyé
    if (!cv) {
      return res.status(400).json({ success: false, message: 'Le fichier CV est requis!' });
    }

    // Création de la candidature dans la base de données
    const newPost = await Post.create({
      message,
      cv_link: cv.path,  // Enregistrer le chemin du fichier PDF
      userId,
      jobId,
      entiteId,
      status,
    });

    return res.status(201).json({
      success: true,
      message: 'Candidature soumise avec succès!',
      post: newPost,
    });
  } catch (error) {
    console.error('Erreur lors de la soumission de la candidature:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la soumission de la candidature.',
      error: error.message,
    });
  }
};
const getAllPosts = async (req, res) => {
  try {
    // Récupérer tous les posts avec leurs relations (User, Job, Entite)
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },  // Inclure les informations de l'utilisateur
        { model: Job, attributes: ['id', 'titre'] },            // Inclure les informations de l'emploi
        { model: Entite, attributes: ['id', 'nom'] },            // Inclure les informations de l'entité
      ]
    });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des posts:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des posts.',
      error: error.message,
    });
  }
};


module.exports = {
  submitApplication, getAllPosts,
};
