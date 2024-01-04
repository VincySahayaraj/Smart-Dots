const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const cardDetailSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "new_customer"
        },
        card_no: {
            type: String,
            required: true
        },
        payment_method: {
            type: String,
            required: true
        },
        exp_year: {
            type: Number,
            trim: true
        },
        exp_month: {
            type: Number,
            trim: true
        },
        orderId: {
            type: ObjectId,
            ref: "Order"
        },
        status: {
            type: Number,
            default: 1
        },
        brand: {
            type: String,
            trim: true
        }

    },
    {timestamps: true}
);

module.exports = mongoose.model("CardDetail",cardDetailSchema);