import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 1,
    required: true,
  },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "clients" },
}); //array nereik, kadangi to paties uzsakymo negali tureti daugiau negu vienas klientas //ref nurodo, i kuri collection ziuret

const orderModel = mongoose.model("orders", orderSchema);

export default orderModel;
