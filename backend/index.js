const express = require("express");
var cors = require("cors");
const app = express();
const dbConnect = require("./config/db");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
app.use(cors());
app.use(express.json());

dotenv.config();
const port = process.env.PORT;
console.log(port);
dbConnect();

app.get("/", (req, res) => {
  res.send("api is listening");
});

// Ensure the uploads directory exists
const ensureUploadsDirectoryExists = () => {
  const dir = path.join(__dirname, "uploads");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureUploadsDirectoryExists();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ensureUploadsDirectoryExists();
    cb(null, path.join(__dirname, "uploads")); // Use absolute path
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({ filePath: `/uploads/${req.file.filename}` });
});

app.use("/api/auth", require("./routes/Auth"));
app.use("/api/product", upload.array("image"), require("./routes/Products"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
