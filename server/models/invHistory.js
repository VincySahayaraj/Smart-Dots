const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const invHistorySchema = new mongoose.Schema(
    {
        reason: {
            type: String,
            maxlength: 256,
            required: true 
        },
        
        inventory_type: { // 1-Add, 2-Subtract
            type: Number,
            required: true        
        },
        quantity: {
            type: Number,          
            trim:true
        },
        product: {
            type: ObjectId,
            ref: "Item",   
            required: true  
        },
        added_by: {
            type: ObjectId,
            ref: "new_customer",
            required: true
        },
        status: {
            type: Number, // 1-Active, 0-Deactive
            default: 1
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("InvHistory", invHistorySchema);
