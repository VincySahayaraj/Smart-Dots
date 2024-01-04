const User = require('../models/new_customer');
require("dotenv").config();
const Order = require("../models/order");
const Item = require("../models/item");
const Category = require('../models/category');

exports.getDashboardData = async(req, res) => {

    let obj={
        totalUsers:0,
        totalOrders:0,
        totalProducts:0,
        totalCategories:0
    }
    try{

       obj.totalUsers=await User.countDocuments();
       obj.totalOrders=await Order.countDocuments();
       obj.totalProducts=await Item.countDocuments({status:0});
       obj.totalCategories=await Category.countDocuments({status:0});

      return res.json({err:false, data:obj})
    }
    catch(err)
    {
        console.log('err',err)
        return res.json({err:true})

    }
  
};