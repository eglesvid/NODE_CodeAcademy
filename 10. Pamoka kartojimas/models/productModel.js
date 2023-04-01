import mongoose from "mongoose";
const objectId = mongoose.Schema.Types.ObjectId;

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  categoryId: objectId, //reikejo geriau category pavadint, nes viduj bus ne tik id, bet ir title, description ir pan
});

const productModel = mongoose.model("products", productSchema);

export default productModel;
