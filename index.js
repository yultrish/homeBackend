//app requirements and dependencies

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
const router = require("./router");
require("dotenv").config();
const multer = require("multer");
const paymentRoutes = require('./router/stripe');

const objection = require("./router/routes");
const knex = require("./config/db");

const PORT = 7090; //server port

// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const filename = `${file.originalname}`;
    cb(null, filename); // File name format: timestamp-originalname
  },
});

//middleware
app.use(bodyParser.json());
//allow origin access
app.use(
  cors({
    origin: "*",
  })
);
//add public folder to the client
app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
  res.sendFile("index.html", (err) => {
    if (err) {
      res.status(403).send("error index.html not found");
    }
  });
});

const upload = multer({
  storage,
});

//upload route
app.post("/store-image", upload.single("file"), (req, res) => {
  // req.file contains information about the uploaded file
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }
  //if true

  res.status(200).json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});

app.post("/product-upload", async (req, res) => {
  const { name, price, description, stock, filename } = req.body;

  if (name != "" || description != "" || stock != "" || price != "") {
    const product = await knex("products").insert({
      name: name,
      price: price,
      stocks: stock,
      description: description,
      image: "http://localhost:7090/" + "uploads/" + filename,
    });
    return product;
  }
});

//api
app.use("/api", routes);
app.use("/todo", router);
app.use("/shop", objection);
app.use("/payment", paymentRoutes)


//start app on this port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
