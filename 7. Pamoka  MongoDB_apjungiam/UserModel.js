import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 70,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 4,
    maxLength: 70,
    required: true,
  },
  age: {
    type: Number,
    min: 1,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  }, // kiekviena karta, kai sukuriam irasa, iskviecia f-ija, kuri butent ir grazina ta data. Jeigu nieko nepaduosim, automatiskai susigeneruos sitas field db. // immutable, kad negalesim editint.
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;

//kur susiimportuosim, galesim jau bendraut su db. siuo atveju routes.js
