const User = require('../models/User');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


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
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({
        message: "L'adresse email est incorrecte ou non enregistrée.",
        success: false,
        field: "email", // Ajout pour indiquer le champ concerné
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);

    if (!isPassEqual) {
      return res.status(403).json({
        message: "Le mot de passe est incorrect.",
        success: false,
        field: "password", // Ajout pour indiquer le champ concerné
      });
    }

    console.log(process.env.JWT_SECRET)

    const jwtToken = jwt.sign(
      {
        email: user.email,
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    res.status(200).json({
      message: "Connexion réussie",
      success: true,
      jwtToken,
      email,
      nom: user.nom,
      prenom: user.prenom,
      role: user.role,
      photo: user.photo,
      contact:user.contact,
      id: user.id,
     
    });
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res
      .status(500)
      .json({ message: "Erreur interne du serveur", success: false });
  }
};

module.exports = {
  login,
  signup,
};