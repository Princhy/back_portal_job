const Entite = require('../models/Entite');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const entiteController = {
  create: async (req, res) => {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      
      const entite = await Entite.create({
        ...req.body,
        password: hashedPassword
      });

      const { password, ...entiteWithoutPassword } = entite.toJSON();
      res.status(201).json(entiteWithoutPassword);
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
  },

  login : async (req, res) => {
    try {
      const { email, password } = req.body;
      const entite = await Entite.findOne({ 
        where: { email } 
      });
  
      if (!entite) {
        return res.status(403).json({
          message: "Email non trouvé",
          success: false
        });
      }
  
      const isPassEqual = await bcrypt.compare(password, entite.password);
      if (!isPassEqual) {
        return res.status(403).json({
          message: "Mot de passe incorrect",
          success: false
        });
      }
  
      const token = jwt.sign(
        { id: entite.id, type: 'entite' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({
        success: true,
        entite: {
          id: entite.id,
          nom_entreprise: entite.nom_entreprise,
          email: entite.email
        },
        token
      });
    } catch (error) {
      res.status(500).json({ 
        message: "Erreur serveur", 
        success: false 
      });
    }
  }
};

 

module.exports = entiteController;