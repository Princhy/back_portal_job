const JobModel = require("../models/Job");

const store = async (req, res) => {
  try {
    const {
      titre,
      description,
      location,
      salary,
      photo,
      publied_by,
      statuts,
      type
     
    } = req.body;

    if (!publied_by) {
      return res.status(400).json({ message: " publied_by sont requis" });
    }

    //let photoPath = null;
    /*if (req.file) {
      photoPath = req.file.path;
    }*/

    const newJob = new JobModel({
      titre,
      description,
      //photo: photoPath,
      statuts,
      location,
      salary,
      publied_by,
      type,
     
    });

    // Sauvegarder le nouveau ticket dans la base de données
    const savedJob = await newJob.save();

    //Reponse
    return res.status(201).json({
      message: "Job créé avec succès",
      job: savedJob,
    });
  } catch (error) {
    console.error("Erreur lors de la création du Job :", error);
    return res
      .status(500)
      .json({ message: "Erreur interne du serveur", error });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params; // ID de l'enregistrement
    const { titre, description, statuts, location, salary } = req.body;

    // Vérifier si l'enregistrement existe
    const job = await JobModel.findByPk(id); // Rechercher le job par clé primaire
    if (!job) {
      return res.status(404).json({
        message: "Job non trouvé",
      });
    }

    // Mettre à jour les champs
    const updatedJob = await job.update({
      titre: titre || job.titre,
      description: description || job.description,
      statuts: statuts || job.statuts,
      location: location || job.location,
      salary: salary || job.salary,
    });

    // Réponse
    return res.status(200).json({
      message: "Job mis à jour avec succès",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du Job :", error);
    return res.status(500).json({
      message: "Erreur interne du serveur",
      error: error.message,
    });
  }
};

const getJob = async (req, res) => {
  try {
    // Récupérer tous les tickets dans la base de données
    const jobs = await JobModel.findAll();

    if (jobs.length === 0) {
      return res.status(404).json({ message: "Aucun JOb trouvé" });
    }

    // Retourner les tickets
    const num = jobs.length
    return res.status(200).json({ jobs, num });
  } catch (error) {
    console.error("Erreur lors de la récupération des jobs :", error);
    return res
      .status(500)
      .json({ message: "Erreur interne du serveur", error });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await JobModel.findByPk(id);

    if (!job) {
      return res.status(404).json({ message: "Job non trouvé" });
    }

    // Retourner le job
    return res.status(200).json({ job });
  } catch (error) {
    console.error("Erreur lors de la récupération du job :", error);
    return res
      .status(500)
      .json({ message: "Erreur interne du serveur", error });
  }
};

const deleteJob = async (req, res) => {
  try {
    // Récupérer l'ID du job à partir des paramètres de la requête
    const { id } = req.params;

    // Chercher le job par son ID
    const job = await JobModel.findByPk(id);

    if (!job) {
      return res.status(404).json({ message: "Job non trouvé" });
    }

    // Supprimer le job
    await job.destroy();

    // Réponse
    return res.status(200).json({ message: "Job supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du job :", error);
    return res
      .status(500)
      .json({ message: "Erreur interne du serveur", error });
  }
};

module.exports = {
  store,
  update,
  getJob,
  getJobById,
  deleteJob
};
