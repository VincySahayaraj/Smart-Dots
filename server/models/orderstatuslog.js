const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderstatuslogSchema = new mongoose.Schema(
    {
        orderid: {
            type: ObjectId,
            ref: "Order"
        },
        reason: {
            type: String,
            trim: true
        },
        resolution_time: {
            type: String,
            trim: true
        }

    },
    {timestamps: true}
);

module.exports = mongoose.model("Orderstatuslog", orderstatuslogSchema);