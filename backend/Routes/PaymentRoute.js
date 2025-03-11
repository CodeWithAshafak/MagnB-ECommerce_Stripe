const express = require('express');
const route = express.Router();

const paymentController = require("../controllers/paymentController")

route.post("/makepayment" ,paymentController.payment)

module.exports = route