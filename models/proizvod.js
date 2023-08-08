const mongoose = require("mongoose");
const proizvodSchema = new mongoose.Schema({
  naziv: String,
  opis: { type: String, minLength: 3 },
  cijena: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

proizvodSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Proizvod", proizvodSchema);
