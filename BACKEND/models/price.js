const mongoose = require('mongoose');


const Priceschema = new mongoose.Schema ({
    vehiclePrice: {
        type: Number,
        required: true
    },

    adventurePrice: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    }

})

const price = mongoose.model('price', Priceschema);

module.exports = price;