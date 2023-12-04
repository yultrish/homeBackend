const Customer = require("../controllers/customer");
const Order = require("../controllers/order");
const Product = require("../controllers/product");
const User = require("../controllers/user");
const Admin = require("../controllers/admi");

const router = require("express").Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/user/");
  },
  filename: (req, file, cb) => {
    const filename = `${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
const Productstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/products/");
  },
  filename: (req, file, cb) => {
    const filename = `${file.originalname}`;
    cb(null, filename);
  },
});

const Productupload = multer({ storage: Productstorage });

// route for uploading the product image
router.post(
  "/v1/store-product-image",
  Productupload.single("file"),
  (req, res) => {
    Product.uploadProductImage(req, res);
  }
);

// add a new product
router.post("/v1/product", (req, res) => {
  Product.addProduct(req, res);
});

//get all products
router.get("/v1/products", (req, res) => {
  Product.getProducts(req, res);
});

// route for uploading the image
router.post("/v1/store-image", upload.single("file"), (req, res) => {
  User.uploadUserImage(req, res);
});

router.get("/v1/customer/:id", (req, res) => {
  Customer.getCustomer(req, res);
});

router.get("/v1/customers", (req, res) => {
  Customer.getCustomers(req, res);
});

router.post("/v1/customer-with-token", (req, res) => {
  Customer.getCustomerWithToken(req, res);
});

router.post("/v1/customer", (req, res) => {
  Customer.CreateCustomer(req, res);
});

router.patch("/v1/customer/:id", (req, res) => {
  Customer.updateCustomer(req, res);
});

router.delete("/v1/customer/:id", (req, res) => {
  Customer.deleteCustomer(req, res);
});

// orders
router.get("/v1/order/:id", (req, res) => {
  Order.getOrder(req, res);
});

// get all orders with customer Id
router.post("/v1/orderWithCustomerId", (req, res) => {
  Order.getOrderWithCustomerId(req, res);
});

router.get("/v1/orders", (req, res) => {
  Order.getOrder(req, res);
});

router.post("/v1/order", (req, res) => {
  Order.CreateOrder(req, res);
});

router.post("/v1/orders-with-customerId", (req, res) => {
  Order.getOrders(req, res);
});

router.patch("/v1/order/:id", (req, res) => {
  Order.updateOrder(req, res);
});

router.delete("/v1/order/:id", (req, res) => {
  Order.deleteOrder(req, res);
});

router.delete("/v1/clear-cart/:customer_id", (req, res) => {
  Order.clearCart(req, res);
});

//products
router.get("/v1/products", (req, res) => {
  Product.getProducts(req, res);
});

router.post("/login", (req, res) => {
  User.getUser(req, res);
});

// router.post("/signup", (req, res) => {
//   User.registerUser(req, res);
// });
router.post("/signup", User.registerUser)

router.post("/admin", (req, res) => {
  Admin.getAdmin(req, res);
});

module.exports = router;
