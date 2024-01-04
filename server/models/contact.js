const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        contactName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        message: {
            type: String,
            trim: true,
            required: true,
            maxlength: 1000
        },
        email: {
            type: String,
            trim: true,
            required: true,
            maxlength: 50
        },
        reg_type: { // 1 - HomePage, 2 - Contact Us
            type: Number,
            trim: true,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);