const { Double } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nutrientSchema = new Schema({
    grams: {
        type: Number
    },
    name: {
        type: String
    }
}, { _id: false });

const productSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number
    },

    brand: {
        type: String
    },

    desc: {
        type: String
    },

    department: {
        category: {
            type: String
        },
        subCategory: {
            type: String
        }
    },

    expDate: {
        type: Date,
        default: null
    },

    mdfDate: {
        type: Date
    },

    kg: {
        type: Number,
        default: null
    },

    ml: {
        type: Number,
        default: null
    },

    stock: {
        type: Number,
        required: true
    },

    nutritionalInfo: {

        gPerPortion: {
            type: Number
        },

        kcal: {
            type: Number
        },

        nutrients: [nutrientSchema],

        dailyVal: {
            type: Number,
            min: 0,
            max: 100
        }
    },

    img: {
        type: Buffer
    },

    barCode: {
        type: Buffer
    }

}, {
    collection: "productos"
});

const product = mongoose.model("productos", productSchema);
module.exports = product;