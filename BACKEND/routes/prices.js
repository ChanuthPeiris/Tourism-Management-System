const router = require ("express").Router();
const { response } = require("express"); 
let price = require("../models/price");

 
  router.route("/add").post((req, res) => {
    const vehiclePrice = Number(req.body.vehiclePrice);
    const adventurePrice = Number(req.body.adventurePrice);
    const totalPrice = Number(req.body.totalPrice);
  
    const newprice = new price({
        vehiclePrice,
        adventurePrice,
        totalPrice
    });
  
    newprice
      .save()
      .then(() => {
        res.json("Price added successfully");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });

  router.route("/get").get((req,res)=>{
    price.find().then((prices)=>{
        res.json(prices)
    }).catch((err)=>{
        console.log(err)
    })
});

  module.exports = router;