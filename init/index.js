const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DATABASE");
  })
  .catch((error) => {
    console.log(error);
  });

async function main() {
  await mongoose.connect(mongo_url);
}

const initDb = async () => {
  await Listing.deleteMany({});

  const dataWithImageUrls = initdata.data.map((item) => ({
    ...item,
    image: item.image.url,
  }));

  await Listing.insertMany(dataWithImageUrls);
  console.log("Data is initialized");
};

initDb();
