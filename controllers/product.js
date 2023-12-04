const Product = require("../model/product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.query().select("*");
    if (!products) {
      throw new Error("failed to get product from db");
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error"); //error
  }
};

exports.uploadProductImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  req.body.filename = req.file.filename;
  res.status(200).json({
    message: "File uploaded successfully",
    filename: req.body.filename,
  });
};

//register new user
exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, stock, filename } = req.body;

    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }
    if (!price) {
      return res.status(400).json({ error: "price is required" });
    }
    if (!description) {
      return res.status(400).json({ error: "description is required" });
    }
    if (!stock) {
      return res.status(400).json({ error: "stock is required" });
    }

    // Check if a product with the same name already exists
    const existingProduct = await Product.query().where("name", name).first();

    if (existingProduct) {
      // Product with the same name already exists, return status 409
      return res.status(409).json({ message: "Product already exists" });
    }

    const product = await Product.query().insertGraph({
      name: name,
      price: price,
      stocks: stock,
      description: description,
      image: `http://localhost:6090/uploads/products/${filename}`,
    });
    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "failed to add product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, price, description, stock, filename } = req.body;

    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }
    if (!price) {
      return res.status(400).json({ error: "price is required" });
    }
    if (!description) {
      return res.status(400).json({ error: "description is required" });
    }
    if (!stock) {
      return res.status(400).json({ error: "stock is required" });
    }

    // Check if the product with the given ID exists
    const existingProduct = await Product.query().findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product
    const updatedProduct = await Product.query().patchAndFetchById(productId, {
      name: name,
      price: price,
      stocks: stock,
      description: description,
      image: `http://localhost:6090/uploads/products/${filename}`,
    });

    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
