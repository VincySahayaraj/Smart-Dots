const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderlogSchema = new mongoose.Schema(
    {
        orderid: {
            type: ObjectId,
            ref: "Order"
        },
        added_by: {
            type: ObjectId,
            ref: "new_customer",
            required: true
        },
        reason: {
            type: String,
            maxlength: 256
        }

    },
    {timestamps: true}
);

module.exports = mongoose.model("Orderlog", orderlogSchema);