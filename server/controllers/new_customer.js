const User = require('../models/new_customer');
const { errorHandler } = require('../helpers/dbErrorHandler');
require("dotenv").config();
const crypto = require("crypto");
const async= require("async");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.list = (req,res) => {
    User.find()
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

exports.updateStatus = (req,res) => {
    console.log(req.body);
    User.findOneAndUpdate({ _id: req.body.userid }, { $set: {status:req.body.status} }, { new: true }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorised to perform this action'
            });
        }
        res.json(user);
    });
}

exports.adminUpdate = (req, res) => { 
    console.log(req.body);
    if(!req.body.prefix && !req.body.cfirst && !req.body.clast && !req.body.cemail && !req.body.password && !req.body.cphone){
        return res.status(400).json({
            error:"All fields are required*"
        })
    } else if(!req.body.prefix) {
        return res.status(400).json({
          error: 'Title is required*'
      });
    } else if(!req.body.cfirst) {
        return res.status(400).json({
            error: 'First Name is required*'
        });
    } else if(!req.body.clast) {
        return res.status(400).json({
            error: 'Last Name is required*'
        });
    } else if(!req.body.cemail) {
        return res.status(400).json({
            error: 'Email Address is required*'
        });
    } else if(!req.body.cphone) {
        return res.status(400).json({
            error: 'Phone Number is required*'
        });  
    }


    var nameRegExp = new RegExp("^.{1,32}$");
    var emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phoneRegExp = new RegExp("^.{11}$");
    var pwdRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,15}$");
    if(!req.body.prefix) {
        return res.status(400).json({
            error: 'Prefix field is required'
        });
    }
 
    if(!nameRegExp.test(req.body.cfirst) && req.body.cfirst) {
        return res.status(400).json({
            error: 'First Name must be between max 32 characters only'
        });
    } 

    if(!nameRegExp.test(req.body.clast) && req.body.clast) {
        return res.status(400).json({
            error: 'Last Name must be between max 32 characters only'
        });
    } 

    if(!emailRegexp.test(req.body.cemail) && req.body.cemail) {
        return res.status(400).json({
            error: 'Enter correct email address'
        });
    } 

    if(!phoneRegExp.test(req.body.cphone) && req.body.cphone) {
        return res.status(400).json({
            error: 'Please enter a valid phone number(e.g 07123456789)'
        });
    } 
    if(!pwdRegExp.test(req.body.password) && req.body.password) {
        return res.status(400).json({
            error: 'Password must contains min 6 and max 15 characters, including one uppercase, lowercase letters, special characters and numbers'
        });
    } 
    if(req.body.password.length >0){
        User.findOne({_id: req.body.userid},(err,user)=>{
            if(err || !user){
                res.status(400).json({
                    error:"You are not authorised to perform this action"
                });
            }
            user.password=req.body.password;
           user.save((err,data)=>{
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            console.log("password changed by admin",data)
           })
        })
    }

    User.findOneAndUpdate({ _id: req.body.userid }, { $set: req.body }, { new: true }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorised to perform this action'
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.updateCustomerId = (req,res) => {
    console.log(req.body);
    if(!req.body.customerid) {
        return res.status(400).json({
            error: 'CustomerId is required!'
        });
    }
    User.findOneAndUpdate({ _id: req.body.userid }, { $set: {customerid:req.body.customerid} }, { new: true }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorised to perform this action'
            });
        }
        res.json(user);
    });
}

exports.userUpdate = (req, res) => { 
    
    console.log(req.body);

    if(!req.body.prefix && !req.body.cfirst && !req.body.clast && !req.body.cemail && !req.body.cphone){
        return res.status(400).json({
            error:"All fields are required*"
        })
    } else if(!req.body.prefix) {
        return res.status(400).json({
          error: 'Title is required*'
      });
    } else if(!req.body.cfirst) {
        return res.status(400).json({
            error: 'First Name is required*'
        });
    } else if(!req.body.clast) {
        return res.status(400).json({
            error: 'Last Name is required*'
        });
    } else if(!req.body.cemail) {
        return res.status(400).json({
            error: 'Email Address is required*'
        });
    } else if(!req.body.cphone) {
        return res.status(400).json({
            error: 'Phone Number is required*'
        });  
    }

    var nameRegExp = new RegExp("^.{1,32}$");
    const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phoneRegExp = new RegExp("^.{11}$");
    if(!req.body.prefix) {
        return res.status(400).json({
            error: 'Prefix field is required'
        });
    }
 
    if(!nameRegExp.test(req.body.cfirst) && req.body.cfirst) {
        return res.status(400).json({
            error: 'First Name must be between max 32 characters only'
        });
    } 

    if(!nameRegExp.test(req.body.clast) && req.body.clast) {
        return res.status(400).json({
            error: 'Last Name must be between max 32 characters only'
        });
    } 

    if(!emailRegexp.test(req.body.cemail) && req.body.cemail) {
        return res.status(400).json({
            error: 'Enter correct email address'
        });
    } 

    if(!phoneRegExp.test(req.body.cphone) && req.body.cphone) {
        return res.status(400).json({
            error: 'Please enter a valid phone number(e.g 07123456789)'
        });
    } 
    
    User.findOneAndUpdate({ _id: req.body.userid }, { $set: req.body }, { new: true }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorised to perform this action'
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.changePassword = (req, res) => {
    let {password, password1, password2} =  req.body;
    var pwdRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,15}$");
  
     if(password1 != password2){
  
        return res.json({
            error: 'Passwords dont match, please try again.'
        });
    }
    User.findOne({_id: res.locals._id}, (err, user) => {
        if(err || !user) {
          

            return res.status(400).json({
                error: 'User not found'
            });
         
        }  

        if(!user.authenticate(password)) {
            console.log("this is an err")
            return res.json({
                error: 'Enter the correct password'
            });
        }
        console.log("errno",user)
        password = password1;
        if (password) {
            if (!pwdRegExp.test(password)) {
                
                return res.json({
                    error: 'Password must contains min 6 and max 15 characters, including one uppercase, lowercase letters, special characters and numbers'
                });
            } else {
                
                user.password = password;
            }
        }
   
        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
         
            res.json(updatedUser);
        });
    });
}

//reset password
exports.resetPassword = (req,res)=>{
    console.log("req.body--------",req.body)
    async.waterfall([
        (done)=>{
            crypto.randomBytes(20,(err,buf)=>{
                const token = buf.toString('hex');
                done(err,token);
            });
        },
        (token,done)=>{
            User.findOne({cemail:req.body.email},(err,user)=>{
                if(err || !user){
                    console.log("req.body22",user)
                    return res.status(400).json({
                        error:"Email does not exist, Please register"
                    });
                }
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                user.save((err)=>{
                    done(err,token,user);
                })
            });
        },
        (token,user,done)=>{
            const emailData = {
              to: user.cemail, 
              from: {
                email: `${process.env.SENDGRID_SENDER}`,
                name: 'SmartDots'
            },
              subject:"Password reset Link",
              content:[{type:"text/plain",value:"You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
              "Please click on the following link, or paste this into your browser to complete the process:\n\n" 
            + process.env.FRONT_URL + "/reset/" + token + "\n\n" +
              "If you did not request this, please ignore this email and your password will remain unchanged.\n"}]     
          };          
            sgMail.send(emailData)
            .then(sent => {
                console.log('SENT >>>', sent);
                res.json("success")
            })
            .catch(err => {
                console.log('ERR >>>--', err);
                done(err,'done');
            });
            
        }
    ],(err)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                error:"Something went wrong"
            });
        }   
    })
}

exports.userResetPassword = (req,res)=>{
    User.findOne({resetPasswordToken:req.params.token,resetPasswordExpires:{$gt:Date.now()}},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"Password reset token is invalid, or expired."
            })
        }
        return res.json({
            message:"Valid token"
        });
    })
}

exports.CreateNewPassword = (req,res)=>{
    async.waterfall([
        (done)=>{
            let {password,password1} = req.body;
            const pwdRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,15}$");
            if(password != password1){
                return res.status(400).json({
                    error: 'Passwords dont match, please try again.'
                });
            }
            User.findOne({resetPasswordToken:req.params.token,resetPasswordExpires:{$gt:Date.now()}},(err,user)=>{
                if(err || !user){
                    return res.status(400).json({
                        error:"Password reset token is invalid, or expired."
                    })
                }
                if (password) {
                    if (!pwdRegExp.test(password)) {
                        return res.status(400).json({
                            error: 'Password must contains min 6 and max 15 characters, including one uppercase, lowercase letters, special characters and numbers'
                        });
                    } else {
                        user.password = password;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;
                    }
                }
                user.save((err, user) => {
                    if (err) {
                        console.log('USER UPDATE ERROR', err);
                        return res.status(400).json({
                            error: 'password updation failed'
                        });
                        
                    }
                    done(err,user)
                });
            })
        },
        (user,done)=>{
            const emailData = {
                to: user.cemail, 
                from: {
                    email: `${process.env.SENDGRID_SENDER}`,
                    name: 'SmartDots'
                },
                subject:"Your password has been changed",
                content:[{type:"text/plain",value:"Hello,\n\n" +
                "This is a confirmation that the password for your account " + user.cemail + " has just been changed.\n"}]     
            };          
              sgMail.send(emailData)
              .then(sent => {
                  console.log('SENT >>>', sent);
                  res.json("success")
              })
              .catch(err => {
                  console.log('ERR >>>', err);
                  done(err);
              });
        }
    ],(err)=>{
        res.status(400).json({
            error:"Something went wrong"
        })
    });
}






//Uncomment in the case of testing the email


// exports.mailTest=(req,res)=>{
// console.log("sendgridsender",process.env.SENDGRID_SENDER)
//     const emailData = {
//         ///  User Notification for Return Accepted  // UNCOMMENT for EMAIL
//         to: "developer.ecesis2021@gmail.com",
//         from: `${process.env.SENDGRID_SENDER}`,
//         templateId: "d-2f3b8d59e2ef43e499c5d961813d6ad8",
//         dynamic_template_data: {
//           subject: `Your  request was accepted`,
//           name: "tempPrefix" + ". " + "tempUserName",
//           content: `Your request for the Order is accepted.<br/><br/><strong><span style="color:#00a6e6;">Order Id:</span> </strong> <br /><br />You can use the following link to check your order status:<br/><br/>
//                             <a href="${process.env.FRONT_URL}allorders/" style="color:#00a6e6;">${process.env.FRONT_URL}allorders/</a>`,
//         },
//       };
//       sgMail
//         .send(emailData)
//         .then((sent) => console.log("SENT >>>", sent))
//         .catch((err) => console.log("ERR >>>", err.response.body));
    
// }