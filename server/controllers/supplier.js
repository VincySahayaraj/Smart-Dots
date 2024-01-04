const Supplier = require('../models/supplier');
const Product = require('../models/item');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.supplierById = (req, res, next, id) => {
    Supplier.findById(id).exec((err, supplier) => {
        if (err || !supplier) {
            return res.status(400).json({
                error: 'Supplier not found'
            });
        }
        req.supplier = supplier;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.supplier);
};

exports.create = (req, res) => {

    console.log("req", req.body);

    if (!req.body.companyName && !req.body.added_by) {
        return res.status(400).json({
            error: "All fields are required*"
        })
    }
    else if (!req.body.companyName) {
        return res.status(400).json({
            error: "Company Name is required*"
        })
    }
    else if (!req.body.added_by) {
        return res.status(400).json({
            error: "Access Denied. Admin resource*"
        })
    }

    const supplier = new Supplier(req.body);
    supplier.save((err, data) => {
        if (err) {
            console.log("Error", err);
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};


exports.update = (req, res) => {

    /* var nameRegExp = new RegExp("^.{1,50}$");
    const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phoneRegExp = new RegExp("^.{11}$");
 */
    if (req.body.added_by) {
        return res.status(400).json({
            error: "Access Denied. Admin resource."
        })
    }


    if (!req.body.companyName) {
        return res.status(400).json({
            error: "Company Name is required*"
        })
    }

    /* if(!nameRegExp.test(req.body.contactName) && req.body.contactName) {
        return res.status(400).json({
            error: 'Contact Name must be between max 50 characters only!'
        });
    } 

    if(!nameRegExp.test(req.body.companyName) && req.body.companyName) {
        return res.status(400).json({
            error: 'Company Name must be between max 50 characters only!'
        });
    } 

    if(!emailRegexp.test(req.body.email) && req.body.email) {
        return res.status(400).json({
            error: 'Enter correct email address!'
        });
    } 

    if(!phoneRegExp.test(req.body.phone) && req.body.phone) {
        return res.status(400).json({
            error: 'Please enter a valid phone number(e.g 07123456789)'
        });
    }  */

    Supplier.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true }, (err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorised to perform this action'
            });
        }
        res.json(data)
    })
};


exports.remove = (req, res) => {
    const supplier = req.supplier;
    Product.find({ Supplier: supplier.companyName }).exec((err, data) => {
        if (data.length >= 1) {
            return res.status(400).json({
                message: `Sorry. You cant delete ${supplier.companyName}. It has ${data.length} associated products.`
            });
        } else {
            supplier.remove((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json({
                    message: 'Supplier deleted'
                });
            });
        }
    });
};


exports.list = (req, res) => {
    Supplier.find()
        .sort({ updatedAt: 'desc' })
        .populate('added_by')
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};

// Check Supplier

exports.checkSupplier = (req, res) => {
    Supplier.find({ companyName: req.body.name })
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        })
}
