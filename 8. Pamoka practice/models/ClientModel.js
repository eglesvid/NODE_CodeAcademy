import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 200,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 200,
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" }],
}); //mes cia idedam ID. Yra toks ilgas tipas grynai del to, kad tie ID automatiskai susigeneruoja mongoDB, jie turi savo konkretu tipa (atrodo gal kaip stringas, bet taip ner, cia yra butent sito tipo mongoose.Schema.Types.ObjectId). // Ir tada nurodom, is kurios collection norim ieskoti situ ID (//ref nurodo, kurioj collection ieskoti id) //norim, kad array butu, kadangi galim turet daugiau nei viena uzsakyma

const clientModel = mongoose.model("clients", clientSchema);

export default clientModel;
