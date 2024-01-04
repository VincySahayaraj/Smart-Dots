const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const supplierSchema = new mongoose.Schema(
    {
        contactName: {
            type: String,
            trim: true,
            maxlength: 50
        },
        companyName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 50
        },
        address: {
            type: String,
            maxlength: 2000
        },
        email: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            unique: true,
        },
        added_by: {
            type: ObjectId,
            ref: "new_customer",
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Supplier", supplierSchema);
