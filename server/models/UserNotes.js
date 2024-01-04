const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const NotesSchema = mongoose.Schema({
    orderId:{
        type:ObjectId,
        ref:"Order"
    },
    note:{
        type:String,
        required:true
    }
    
},{timestamps:true})


module.exports = mongoose.model("Notes", NotesSchema);