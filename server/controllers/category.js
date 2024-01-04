const Category = require('../models/category');
const Product = require('../models/item');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req,res) => {
    console.log("Req Data", req.body);
    var nameRegExp = new RegExp("^.{1,32}$");

    if(!req.body.name && !req.body.added_by){
        return res.status(400).json({
            error:"All fields are required*"
        })
    }
    else if(!req.body.name){
        return res.status(400).json({
            error:"Category Name is required*"
        })
    }
    else if(!req.body.added_by){
        return res.status(400).json({
            error:"Access Denied. Admin resource!"
        })
    }

    if(!nameRegExp.test(req.body.name) && req.body.name) {
        return res.status(400).json({
            error: 'Category Name must be between max 32 characters only'
        });
    } 

    const category = new Category(req.body);
    category.save((err,data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        console.log("Res Data",data);
        res.json(data);
    })

}

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category does not exist'
            });
        }
        req.category = category;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.category);
};

exports.update = (req,res) => {

    console.log("Req Data", req.body);
    var nameRegExp = new RegExp("^.{1,32}$");

    if(req.body.added_by){
        return res.status(400).json({
            error:"Access Denied. Admin resource!"
        })
    }

    if(!req.body.name){
        return res.status(400).json({
            error:"Category Name is required*"
        })
    }

    if(!nameRegExp.test(req.body.name) && req.body.name) {
        return res.status(400).json({
            error: 'Category Name must be between max 32 characters only'
        });
    } 

    Category.findOneAndUpdate({_id: req.body.id}, { $set: req.body}, {new: true}, (err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorised to perform this action'
            });
        }
        res.json(data)
    })

}

exports.list = (req,res) => {
    Category.find({status:0})
    .sort({updatedAt: 'desc'})
    .populate('added_by')
    .exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    })
}

exports.remove = (req, res) => {
    const category = req.category;
    Product.find({ Device_Group:category.name }).exec((err, data) => {
        if (data.length >= 1) {
            return res.status(400).json({
                message: `Sorry. You cant delete ${category.name}. It has ${data.length} associated products.`
            });
        } else {
            category.remove((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json({
                    message: 'Category deleted'
                });
            });
        }
    });
};

// Check Category

exports.checkCategory = (req,res) => {
    console.log("Req data", req.body);
    Category.find({name:req.body.name})
    .exec((err,data) => {
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json(data);
    })
}

// Soft delete
exports.removeStatus = (req,res) => {
    Category.findOneAndUpdate({_id: req.body.id}, {$set:{status:req.body.status}}, {new: true}, (err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    })
}

exports.listforProd = (req,res) => {
    Category.find({status:0})
    .sort({name: 'asc'})
    .select('name _id')
    .exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    })
}

exports.listAll = (req,res) => {
    Category.find({status:{$ne:2}})
    .sort({updatedAt: 'desc'})
    .populate('added_by')
    .exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    })
}