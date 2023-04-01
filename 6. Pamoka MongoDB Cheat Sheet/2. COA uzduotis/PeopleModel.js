import mongoose from "mongoose";

const PeopleSchema = mongoose.Schema({
  name: String,
  lastName: String,
  age: Number,
});

const PeopleModel = mongoose.model("people", PeopleSchema);

export default PeopleModel;
