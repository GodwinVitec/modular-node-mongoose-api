const {Schema, model} = require("mongoose");


const tankSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    shootingRange: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        index: true
    },
    lastMaintenance: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
});

const Tank = model("Tank", tankSchema);

module.exports = Tank;