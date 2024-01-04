const CardDetail = require('../models/cardDetail');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req,res) => {
    const cardDetail = new CardDetail(req.body);
    cardDetail.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({data});
    });
}

exports.listCardDetailsById = (req,res) => {
    console.log("Req.body",req.body);
    CardDetail.find({userId: req.body.userId,status: 1})
    .exec((err,data) => {
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        console.log(data);
        res.json(data);
    })
}

exports.updateStatus = (req,res) => {
    console.log("Body",req.body);
    CardDetail.findOneAndUpdate({ _id: req.body.id }, { $set: {status:req.body.status} }, { new: true }, (err, card) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorised to perform this action'
            });
        }
        res.json(card);
    });
}

exports.lists = (req,res) => {
    CardDetail.find()
    .sort({"updatedAt": -1})
    .populate("userId")
    .exec((err,data) => {
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data);
    })
}

exports.listActiveCardById = (req,res) => {
    console.log("Req.body",req.body);
    CardDetail.find({userId: req.body.userId, status: 1})
    .sort({"createdAt": -1})
    .limit(2)
    .exec((err,data) => {
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        console.log(data);
        res.json(data);
    })
}