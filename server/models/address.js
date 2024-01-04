const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const uuid = require('uuid');

const addressSchema = new mongoose.Schema(
    {
        addressName: {
            type: String,
            trim: true,
            maxlength:1000,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);



