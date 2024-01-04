const InvHistory = require('../models/invHistory');
const Product = require('../models/item');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.listByProdId = (req,res) => {
    InvHistory.find({product:req.body.productId, status:{$ne:0}})
    .populate('added_by')
    .sort({updatedAt: 'desc'})
    .exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error:'Inventoty History doesnot exists'
            });
        }
        res.json(data)
    })
}

exports.create = async (req,res) => {
    const invhistory = new InvHistory(req.body);

    let addQuan = 0;

    let subQuan = 0;

    if (!invhistory.product || !invhistory.reason || !invhistory.inventory_type || !invhistory.quantity || !invhistory.added_by ) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    if(Number(invhistory.quantity) > 10000) {
        return res.status(400).json({
            error: 'Max Quantity limit is 10000!'
        });
    }

    try {

        let productData = await Product.findOne({_id:invhistory.product}).exec()

        if( !productData ){
            return res.status(400).json({
                error: 'Product not found!'
            });        
        }

        if(Number(invhistory.inventory_type) === 1){ // Add Inventory
            
            addQuan = Number(invhistory.quantity) + Number(productData.inventory);

            if( Number(addQuan) > 1000 ){
                return res.status(400).json({
                    error: 'Max Quantity limit is 10000!'
                });        
            }

            let addProdData = await Product.findOneAndUpdate({_id:invhistory.product},{$set: {inventory: addQuan}}, {new: true});

        }
        else if(Number(invhistory.inventory_type) === 2) {

            subQuan = Number(productData.inventory) - Number(invhistory.quantity);

            if(Number(subQuan) < 0){
                return res.status(400).json({
                    error: 'Min Quantity is 0!'
                });
            }

            let subProdData = await Product.findOneAndUpdate({_id:invhistory.product},{$set: {inventory: subQuan}}, {new: true});

        }
        else {
            return res.status(400).json({
                error: "You are not authorised to perform this action"
            });
        }

        invhistory.save((err,data) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        })
        
    } catch (error) {

        return res.status(400).json({
            error: "Something went wrong, Please try again."
        });
        
    }

}

