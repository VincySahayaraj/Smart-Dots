const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
        added_by: {
            type: ObjectId,
            ref: 'new_customer',
            required: true
        },
        status: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);