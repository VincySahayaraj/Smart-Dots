const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const couponlogSchema = new mongoose.Schema(
    {
        orderid: {
            type: ObjectId,
            ref: "Order"
        },
        userid: {
            type: ObjectId,
            ref: "new_customer",
            required: true
        },
        couponid:{
            type: ObjectId,
            ref: "Coupon",
            required: true
        }

    },
    {timestamps: true}
);

module.exports = mongoose.model("Couponlog",couponlogSchema);