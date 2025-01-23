const Entite = require('../models/Entite');

const entiteController = {
  create: async (req, res) => {
    try {
      const entite = await Entite.create(req.body);
      res.status(201).json(entite);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const entites = await Entite.findAll();
      res.json(entites);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const entite = await Entite.findByPk(req.params.id);
      if (!entite) return res.status(404).json({ message: "Entité non trouvée" });
      res.json(entite);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const entite = await Entite.findByPk(req.params.id);
      if (!entite) return res.status(404).json({ message: "Entité non trouvée" });
      await entite.update(req.body);
      res.json(entite);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const entite = await Entite.findByPk(req.params.id);
      if (!entite) return res.status(404).json({ message: "Entité non trouvée" });
      await entite.destroy();
      res.json({ message: "Entité supprimée" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = entiteController;