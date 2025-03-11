const stripe = require("stripe")(process.env.SECRET_KEY);
const orderModel = require("../model/orderDetailsModel");
// for upadting order status

const webhookCheckout = async (req, res) => {
  const signature = req.headers["stripe-signature"]; 
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook err", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`); 
  }
  const session = event.data.object;
  
  let paymentStatus;
  console.log("EVENt TYpe", event.type);
  if (event.type === "checkout.session.completed" || event.type === "payment_intent.succeeded") {
    paymentStatus = "succeeded";
  } if (event.type === "payment_intent.payment_failed" || event.type === "invoice.payment_failed") {
    paymentStatus = "failed";
  }
  try {
    const updateOrder = await orderModel.findOneAndUpdate(
      { transaction_id: session.id },
      {
        payment_status: paymentStatus,
      },
      { new: true }
    );
  } catch (err) {
    console.error("Error updating order:", err);
  }
  res.status(200).send("Webhook received!");
};

module.exports = { webhookCheckout };
