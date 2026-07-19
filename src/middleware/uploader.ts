import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import multer from "multer";
import utils from "../utils/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Create uploads folder if it doesn't exist

const allowedMimeTypes = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "application/zip",
];

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },

  filename: (_req, file, cb) => {
    const fileName = utils.sanitizeFileName(file.originalname);
    cb(null, `${crypto.randomUUID()}-${fileName}`);
  },
});

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new Error("Invalid file type."));
};
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
    files: 10,
  },
});

export default upload;