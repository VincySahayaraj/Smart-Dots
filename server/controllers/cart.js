const Cart = require('../models/cart');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.cartById = (req, res, next, id) => {
    Cart.findById(id).exec((err, cart) => {
        if (err || !cart) {
            return res.status(400).json({
                error: 'Cart does not exist'
            });
        }
        req.cart = cart;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.cart);
};

exports.create = (req, res) => {

    console.log("Req Datassss", req.body);
    if(!req.body.price || !req.body.quantity || !req.body.productID){
        return res.status(400).json({
            error: "All fields are required*"   
        })
    }

    if(!req.body.tempUser && !req.body.userID){
        return res.status(400).json({
            error: "User fields are required*"
        })
    }

    const cart = new Cart(req.body);
    cart.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.listUsers = (req, res) => {
    Cart.find({userID:req.body.userId})
    .populate('productID')
    .sort({updatedAt: 'desc'})
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.listTempUser = (req,res) => {
    Cart.find({tempUser:req.body.tempUserId})
    .populate('productID')
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
}

exports.removeTempUser = (req,res) => {
    Cart.findOneAndDelete({tempUser:req.body.tempUserId},(err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({message:"Your product is successfully removed."})
    })
}

exports.removeUser = (req,res) => {
    Cart.findOneAndDelete({userID:req.body.userId},(err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({message:"Your product is successfully removed."})
    })
}

exports.removeCart = (req,res) => {
    Cart.findOneAndDelete({_id:req.body.id},(err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({message:"Your product is successfully removed."})
    })
}

exports.updateCart = async (req,res)=>{
    const UpdatedCart = req.body;
    let UpdatedCrtLen = UpdatedCart.length;
    for(let i=0;i<UpdatedCrtLen;i++){
        try{
            await Cart.findOneAndUpdate({_id:UpdatedCart[i]._id},{$set:{quantity:UpdatedCart[i].quantity}},(err,cart)=>{
                if(err){
                    return res.status(400).json({
                        error:"Updation failed"
                    });
                }
                console.log(cart)
            })
        }catch(e){
            console.log("this error was catched at controllers/cart.js inside updateCart function")
            return res.status(400).json({error:"Cart updation failed"})
        }
       
    }
    res.json({message:"Updation success"});
}

exports.updateUserCart = (req,res) => {
    console.log(req.body);
    Cart.findOneAndUpdate({tempUser: req.body.tempId}, { $set: req.body}, {new: true}, (err, data) => {
        if(err){
            return res.status(400).json({
                        error:errorHandler(err)
                    });
        }
        res.json(data);
    })
}
