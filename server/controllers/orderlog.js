const Orderlog = require('../models/orderlog');
//const { errorHandler } = require('../helpers/dbErrorHandler');

exports.listbyOrdId = (req,res) => {
    Orderlog.find({orderid:req.body.id})
    .sort({updatedAt: 'desc'})
    .populate('added_by')
    .exec((err, data) => {
        if(err){
            return res.status(400).json({
                error:'Order Log doesnot exists'
            });
        }
        res.json(data);
    })
}