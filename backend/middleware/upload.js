const multer = require ("multer");
const  path = require ("path");
const  fs  = require ("fs");

// 📁 Créer le dossier uploads s'il n'existe pas
const uploadPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// ⚙️ Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// ✅ Filtre de validation du type de fichier
function fileFilter(req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Seuls les fichiers JPG, PNG et WEBP sont autorisés"));
  }
  cb(null, true);
}

// 🚀 Créer l'instance multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 Mo max
  },
});

module.exports =   upload;
