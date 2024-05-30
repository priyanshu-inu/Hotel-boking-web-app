const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
// const { log } = require("console");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); // it is used for create comman file for multiple pages like navbar

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // for use put, patch ,delete mathod
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DATABASE");
  })
  .catch((error) => {
    console.log(error);
  });

async function main() {
  await mongoose.connect(mongo_url);
}

// root route

app.get("/", (req, res) => {
  res.send("Root");
});

// listing route index route

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("index.ejs", { allListings });
});

// alternate if i don't use the async and await

// app.get("/listings", (req, res) => {
//   Listing.find({})
//     .then((allListings) => {
//       res.render("index.ejs", { allListings });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send("Error fetching listings from the database");
//     });
// });

//new Route

app.get("/listings/new", (req, res) => {
  res.render("new.ejs");
});

// show route

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const oneList = await Listing.findById(id);
  res.render("show.ejs", { oneList });
});

//create route

app.post("/listings", async (req, res, next) => {
  try {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    res.render("edit.ejs", { newListing });
  } catch (err) {
    next(err);
  }
});

//edit route

app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const newListing = await Listing.findById(id);
  res.render("edit.ejs", { newListing });
});

// update route

app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

// delete route

app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deleteList = await Listing.findByIdAndDelete(id);
  console.log(deleteList);
  res.redirect("/listings");
});

// middldeware

app.use((err, req, res, next) => {
  res.send("Something went wrong");
});

// server

app.listen(8080, () => {
  console.log("server is listening port 8080");
});
