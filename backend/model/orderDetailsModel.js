const mongoose = require("mongoose")
const orderDetailsSchema = new mongoose.Schema({
  transaction_id: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },

  purchased_items: [
    {
      id: { type: String, required: true },
      category: { type: String, required: true },
      price: { type: Number, required: true },
      title: { type: String, required: true },
      qnty: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],

  payment_status: {
    type: String,
    default: "pending",
  },

})
module.exports = mongoose.model("orderDetails",orderDetailsSchema)


