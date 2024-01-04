const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const returnreqSchema = new mongoose.Schema(
    {
        orderid: {
            type: ObjectId,
            ref: "Order"
        },
        return_reason: {
            type: String,
            trim: true,
            maxlength: 250,
            required: true
        },
        return_message:{
            type: String,
            trim: true,
            maxlength: 250,
            required: true
        },
        return_status: {
            type: Number,
            trim: true
        },
        return_type: {
            type: Number,
            trim: true,
            required: true
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        status_date: {
            type: Date
        }

    },
    { timestamps: true}
);

module.exports = mongoose.model("Returnreq",returnreqSchema);