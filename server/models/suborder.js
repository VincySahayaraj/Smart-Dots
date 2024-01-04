const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const suborderSchema = new mongoose.Schema(
    {
        productid: {
            type: ObjectId,
            ref: "Item",
            trim: true
        },
        price: {
            type: Number,
            trim: true
        },
        quantity: {
            type: Number
        },
        orderid: {
            type: ObjectId,
            ref: "Order"
        },
        deviceid: {
            type: String,
            trime: true
        },
        assign_device: {
            type: String,
            trime: true
        },
        room_name:{
            type: String,
            trime: true
        },
        technician_verified: {
            type:Boolean,
            default: false
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Suborder", suborderSchema);