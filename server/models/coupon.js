const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
    {
        coupon_code:{
            type: String,
            trim: true,
            required: true,
            maxlength: 50
        },
        description:{
            type: String,
            trim: true,
            maxlength: 250
        },
        start_date:{
            type: Date,
            required: true
        },
        end_date:{
            type: Date,
            required: true
        },
        coupon_value:{
            type: Number,
            trim: true,
            required: true,            
        },
        coupon_limit:{
            type: Number,
            trim: true,
            required: true,            
        },
        value_type:{
            type: Number,
            required: true
        },
        customer_type:{
            type: Number, // 1-Prospective Customer, 2-Unpaid Customer, 3-All Paid Customers, 4-By Product, 5-By Category
            required: true
        },
        categoryId: {
            type: ObjectId,
            ref: "Category",
        },
        productId: {
            type: ObjectId,
            ref: "Item",
        },
        status:{
            type:Number,
            default:1,
            required:true
        },
    },
    { timestamps: true}
);

module.exports = mongoose.model("Coupon",couponSchema);