const User = require('../models/User');
const Entite = require('../models/Entite');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const getUserById = async (req, res) => {
  try {
    const { id } = req.params;  // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL

    // Chercher l'utilisateur par ID
    const user = await User.findByPk(id);  // Utiliser `findByPk` pour chercher par clé primaire (ID)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé',
      });
    }

    // Si l'utilisateur est trouvé, renvoyer les informations
    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        contact: user.contact,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message,
    });
  }
};
const signup = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      password,
      role,
      contact,
    
    } = req.body;

    const existingUser = await User.findOne({
      where: {
        email: 'example@example.com', // Spécifiez les conditions dans `where`
      },
    });
    
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    /*let photoPath = null;
    if (req.file) {
      photoPath = req.file.path;
    }*/

    const newUser = new User({
      nom,
      prenom,
      email,
      //photo: photoPath,
      password,
      role,
      contact,
    });

    // Hash du mot de passe
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    res.status(201).json({ message: "Signup successfully", success: true });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Server error", success: false });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Chercher dans les deux modèles
    const user = await User.findOne({ where: { email } });
    const entite = await Entite.findOne({ where: { email } });

    if (!user && !entite) {
      return res.status(403).json({
        message: "Email non trouvé",
        success: false
      });
    }

    // Vérifier si c'est un utilisateur
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(403).json({
          message: "Mot de passe incorrect",
          success: false
        });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role, type: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          type: 'user'
        },
        token
      });
    }

    // Vérifier si c'est une entité
    if (entite) {
      const isValidPassword = await bcrypt.compare(password, entite.password);
      if (!isValidPassword) {
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

      return res.json({
        success: true,
        user: {
          id: entite.id,
          email: entite.email,
          nom_entreprise: entite.nom_entreprise,
          type: 'entite'
        },
        token
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      success: false
    });
  }
}


module.exports = {
  login,
  signup,getUserById,
};