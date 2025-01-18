const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Entite = sequelize.define("Entite", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_entreprise: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9\s+()-]+$/, 
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  secteur: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  taille: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["petite", "moyenne", "grande"]],
    },
  },  
},
{
timestamps: true,
});

module.exports = Entite;
