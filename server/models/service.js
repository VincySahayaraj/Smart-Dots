const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const uuid = require('uuid');

const serviceSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true
        },
        serviceName: {
            type: String,
            trim: true,
            maxlength:1000,
            required: true
        },
        added_by: {
            type: ObjectId,
            ref: "new_customers",
        },
        updated_by:{
            type: ObjectId,
            ref: "new_customers",
        },
        status:{
            type: Number,
            default: 1
        },
        price: {
            type: String,
            trim: true,
            maxlength: 50
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);

