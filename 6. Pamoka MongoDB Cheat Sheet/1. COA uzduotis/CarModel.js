import mongoose from "mongoose";

const CarSchema = mongoose.Schema({
  make: String,
  year: Number,
  price: Number,
});

//schema turim, galim is jos modeli susikurt

const CarModel = mongoose.model("cars", CarSchema);

export default CarModel;
