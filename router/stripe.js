// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/stripe");

router.post("/create-payment-intent", paymentController.createPaymentIntent);
router.get('/config', paymentController.getConfig);

module.exports = router;
