const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listeningSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1492732089/photo/hand-presenting-model-home.jpg?s=2048x2048&w=is&k=20&c=RA-8C96fjosNvwjgotKldjyzXhhPiDtqCiopK_qkhkM=",
    set: (v) =>
      v === ""
        ? "https://media.istockphoto.com/id/1492732089/photo/hand-presenting-model-home.jpg?s=2048x2048&w=is&k=20&c=RA-8C96fjosNvwjgotKldjyzXhhPiDtqCiopK_qkhkM="
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listeningSchema);

module.exports = Listing;
