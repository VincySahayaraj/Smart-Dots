const Contact = require('../models/contact');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.contactById = (req,res,next,id) => {
    Contact.findById(id).exec((err, contact) => {
        if(err || !contact){
            return res.status(400).json({
                error: 'Contact not found!'
            })
        }
        req.contact = contact;
        next();
    });
};

exports.read = (req,res) => {
    return res.json(req.contact);
};

exports.create = (req,res) => {
    console.log("Data", req.body)

    if(!req.body.contactName || !req.body.message || !req.body.email || !req.body.reg_type){
        return res.status(400).json({
            error: "All fields are required*"
        })
    }

    var nameRegExp = new RegExp("^.{1,32}$");
    const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var msgRegExp = new RegExp("^.{1,1000}$");

    if(!emailRegexp.test(req.body.email) && req.body.email) {
        return res.status(400).json({
            error: 'Enter correct email address'
        });
    } 

    if(!nameRegExp.test(req.body.contactName) && req.body.contactName) {
        return res.status(400).json({
            error: 'Contact Name must be between 1 to 32 characters!'
        });
    } 

    if(!msgRegExp.test(req.body.message) && req.body.message) {
        return res.status(400).json({
            error: 'Message max limit is exceeded!'
        });
    } 
    
    const contact = new Contact(req.body);

    contact.save((err,data) => {
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data)
    })
}

exports.remove = (req, res) => {
    const contact = req.contact;
    contact.remove((err, data) => {
    if (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
    res.json({message: 'Contact deleted'});
    });     
};

exports.list = (req,res) => {
    Contact.find()
    .sort({updatedAt: 'desc'})
    .exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    })
}