const PostModel = require("../models/Post");

const store = async (req, res) => {
  try {
    const { cv, userId, jobId, entiteId } = req.body;

    const newPost = await PostModel.create({
      cv,
      userId,
      jobId,
      entiteId,
      status: 'pending'
    });

    return res.status(201).json({
      message: "Postulation créée avec succès",
      post: newPost,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la postulation :", error);
    return res.status(500).json({ message: "Erreur interne du serveur", error });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { cv, status } = req.body;

    const post = await PostModel.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Postulation non trouvée" });
    }

    const updatedPost = await post.update({
      cv: cv || post.cv,
      status: status || post.status
    });

    return res.status(200).json({
      message: "Postulation mise à jour avec succès",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la postulation :", error);
    return res.status(500).json({ message: "Erreur interne du serveur", error });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.findAll();
    return res.status(200).json({ posts });
  } catch (error) {
    console.error("Erreur lors de la récupération des postulations :", error);
    return res.status(500).json({ message: "Erreur interne du serveur", error });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findByPk(id);
    
    if (!post) {
      return res.status(404).json({ message: "Postulation non trouvée" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.error("Erreur lors de la récupération de la postulation :", error);
    return res.status(500).json({ message: "Erreur interne du serveur", error });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: "Postulation non trouvée" });
    }

    await post.destroy();
    return res.status(200).json({ message: "Postulation supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la postulation :", error);
    return res.status(500).json({ message: "Erreur interne du serveur", error });
  }
};

module.exports = {
  store,
  update,
  getPosts,
  getPostById,
  deletePost
};