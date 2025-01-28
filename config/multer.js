const multer = require('multer');
const path = require('path');

// Configuration de Multer pour l'upload des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Dossier où les fichiers seront enregistrés
  },
  filename: function (req, file, cb) {
    // Générer un nom de fichier unique
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filtrage pour autoriser uniquement les fichiers PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers PDF sont autorisés!'), false);
  }
};

// Configuration de Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
