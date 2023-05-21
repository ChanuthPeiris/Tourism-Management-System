const router = require ("express").Router();
const { response } = require("express"); 
let place = require("../models/place");
const multer = require("multer");

  /////////////////////////
  router.route("/add").post((req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const image = req.body.image;
    const description = req.body.description;
  
    const newplace = new place({
      name,
      location,
      image,
      description,
    });
  
    newplace
      .save()
      .then(() => {
        res.json("place added successfully");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  
  router.route("/").get((req, res) => {
    place.find()
      .then((events) => {
        res.json(events);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  
  router.route("/update/:id").put((req, res) => {
    place.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      (err, place) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: err });
        }
        return res.json({ message: "place updated successfully", place });
      }
    );
  });
  
  router.route("/delete/:id").delete((req, res) => {
    place.findByIdAndRemove(req.params.id).exec((err, place) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: err });
      }
      return res.json({ message: "place deleted successfully", place });
    });
  });
  
  router.route("/get/:id").get((req, res) => {
    place.findById(req.params.id)
      .then((place) => {
        res.json(place);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  



  module.exports = router;