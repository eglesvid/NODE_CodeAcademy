import mongoose from "mongoose";

const myServiceId = mongoose.Schema.Types.ObjectId;
// const myServiceId = ObjectId()

const serviceSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const serviceModel = mongoose.model("services", serviceSchema);

export default serviceModel;
