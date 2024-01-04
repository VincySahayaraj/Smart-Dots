const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
    {
        userID: {
            type: ObjectId,
            ref: "new_customer",
            trim: true
        },
        productID: {
            type: ObjectId,
            ref: "Item",
        },
        quantity: {
            type: Number,
            default: 1,
        },
        price: {
            type: Number,
            trim: true,
            required: true,
        },
        tempUser: { // For Non Register user who uses cart by store temp Id
            type: String,
            trim: true
        }
    },
    { timestamps:true }
);

module.exports = mongoose.model("Cart", cartSchema);