import mongoose from "mongoose";

const WebhookPaymentSchema = new mongoose.Schema(
  {
    payment_id: String,
    order_id: String,
    email: String,
    amount: Number,
    currency: String,
    status: String,
    method: String,
    created_at: Number,
  },
  { timestamps: true }
);

export default mongoose.models.WebhookPayment ||
  mongoose.model("WebhookPayment", WebhookPaymentSchema);
