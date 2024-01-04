const Returnreq = require("../models/returnreq");
const Order = require("../models/order");
const User = require("../models/new_customer");
const Orderlog = require("../models/orderlog");
const { errorHandler } = require("../helpers/dbErrorHandler");
const formidable = require("formidable"); // image upload
const _ = require("lodash");
const fs = require("fs"); // file system
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(`${process.env.SENDGRID_KEY}`);

exports.returnReqById = (req, res, next, id) => {
  Returnreq.findById(id).exec((err, returnreq) => {
    if (err || !returnreq) {
      return res.status(400).json({
        error: "Return requests not found",
      });
    }
    req.returnreq = returnreq;
    next();
  });
};

exports.read = (req, res) => {
  req.returnreq.photo = undefined;
  return res.json(req.returnreq);
};

exports.create = (req, res) => {
  console.log("ok");

  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log("Error1");
        return res.status(400).json({
          error: "Image could not be uploaded",
        });
      }
      const { return_message, return_reason, return_type, orderid } = fields;

      /*  if( !return_message || !return_reason || !return_type || !orderid){
            console.log("Error2")
            return res.status(400).json({
                error: 'All fields are required'
            });
        } */
      let product = new Returnreq(fields);

      // 1kb = 1000
      // 1mb = 1000000

      if (files.photo) {
        // console.log("FILES PHOTO: ", files.photo);
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: "Image should be less than 1mb in size",
          });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }

      product.save(async (err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        console.log("Result", data);
        let result = orderStatusUpdate(
          orderid,
          return_type,
          return_message,
          return_reason
        );
        res.json({ data });
      });
    });
  } catch (err) {
    console.log("this is an err", err);
  }
};

const orderStatusUpdate = (
  orderID,
  return_type,
  return_message,
  return_reason
) => {
  let retType;
  if (return_type === 1) {
    retType = "Replacement";
  } else {
    retType = "Refund";
  }
  console.log("OrderID", orderID);
  Order.findOneAndUpdate(
    { _id: orderID },
    { $set: { status: "Return Requested" } },
    { new: true },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      const emailData = {
        // Admin Notification // EMail Part UNCOMMENT
        to: `${process.env.CONTACT_TO_EMAIL}`,
        from: {
          email: `${process.env.SENDGRID_SENDER}`,
          name: 'SmartDots'
      },
        templateId: "d-8a28c959a5f94dd7be61a83133fac88c",
        dynamic_template_data: {
          subject: `Request for Order ${retType}`,
          content: `We have received a new request for Order ${retType}.<br/><br/><strong><span style="color:#00a6e6;">Order Id:</span> ${order.orderid}</strong> <br /><br />
                <strong><span style="color:#00a6e6;">Message:</span> ${return_message}</strong> <br /><br />
                <strong><span style="color:#00a6e6;">Reason:</span> ${return_reason}</strong> <br /><br />
                <strong><span style="color:#00a6e6;">Type:</span> ${retType}</strong> <br /><br />`,
        },
      };

      sgMail
        .send(emailData)
        .then((sent) => console.log("SENT >>>", sent))
        .catch((err) => console.log("ERR >>>", err));
      return true;
    }
  );
};

exports.update = (req, res) => {
  console.log(req.body);
  let tempId;
  let tempUserName;
  let tempPrefix;
  let tempEmail;
  let tempOrderid;
  let tempUserid;
  let retType;
  Returnreq.findOneAndUpdate(
    { _id: req.body.returnId },
    {
      $set: { return_status: req.body.return_status, status_date: new Date() },
    },
    { new: true },
    (err, prod) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorised to perform this action",
        });
      }
      console.log("Success", prod);
      tempId = prod.orderid;

      if (prod.return_type === 1) {
        retType = "Replacement";
      } else {
        retType = "Refund";
      }

      if (prod.return_status === 1) {
        Order.findOneAndUpdate(
          { _id: tempId },
          { $set: { status: "Return Accepted" } },
          { new: true },
          (err, order) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            console.log("Order success", order);
            tempOrderid = order.orderid;
            tempUserid = order.userid;

            User.findById({ _id: order.userid }).exec((err, docs) => {
              if (err) {
                return res.status(400).json({
                  error: errorHandler(err),
                });
              }
              tempUserName = docs.clast;
              tempEmail = docs.cemail;
              tempPrefix = docs.prefix;

              const emailData = {
                ///  User Notification for Return Accepted  // UNCOMMENT for EMAIL
                to: tempEmail,
                from: {
                  email: `${process.env.SENDGRID_SENDER}`,
                  name: 'SmartDots'
              },
                templateId: "d-2f3b8d59e2ef43e499c5d961813d6ad8",
                dynamic_template_data: {
                  subject: `Your ${retType} request was accepted`,
                  name: tempPrefix + ". " + tempUserName,
                  content: `Your request for the Order ${retType} is accepted.<br/><br/><strong><span style="color:#00a6e6;">Order Id:</span> ${tempOrderid}</strong> <br /><br />You can use the following link to check your order status:<br/><br/>
                                    <a href="${process.env.FRONT_URL}allorders/${tempUserid}" style="color:#00a6e6;">${process.env.FRONT_URL}allorders/${tempUserid}</a>`,
                },
              };
              sgMail
                .send(emailData)
                .then((sent) => console.log("SENT >>>", sent))
                .catch((err) => console.log("ERR >>>", err));
            });
          }
        );
      } else if (prod.return_status === 2) {
        Order.findOneAndUpdate(
          { _id: tempId },
          {
            $set: {
              status: "Return Rejected",
              cancelled_reason: req.body.cancelled_reason,
            },
          },
          { new: true },
          (err, order) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            console.log("Order success", order);
            tempOrderid = order.orderid;
            tempUserid = order.userid;

            User.findById({ _id: order.userid }).exec((err, docs) => {
              if (err) {
                return res.status(400).json({
                  error: errorHandler(err),
                });
              }
              tempUserName = docs.clast;
              tempEmail = docs.cemail;
              tempPrefix = docs.prefix;

              const emailData = {
                /// User Notification for Return Rejected // UNCOMMENT for EMAIL
                to: tempEmail,
                from: {
                  email: `${process.env.SENDGRID_SENDER}`,
                  name: 'SmartDots'
              },
                templateId: "d-2f3b8d59e2ef43e499c5d961813d6ad8",
                dynamic_template_data: {
                  subject: `Your ${retType} request was rejected`,
                  name: tempPrefix + ". " + tempUserName,
                  content: `Your request for the Order ${retType} is Rejected.<br/><br/><strong><span style="color:#00a6e6;">Order Id:</span> ${tempOrderid}</strong> <br /><br/><strong><span style="color:#00a6e6;">Reason:</span> ${req.body.cancelled_reason}</strong> <br />`,
                },
              };
              sgMail
                .send(emailData)
                .then((sent) => console.log("SENT >>>", sent))
                .catch((err) => console.log("ERR >>>", err));
            });
          }
        );
      }
      res.json(prod);
    }
  );
};

exports.list = (req, res) => {
  Returnreq.find()
    .sort({ updatedAt: "desc" })
    .populate("orderid")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.getReqByOrderId = (req, res, next, id) => {
  console.log(id);
  Returnreq.find({ orderid: id }).exec((err, returnreq) => {
    if (err || !returnreq) {
      return res.status(400).json({
        error: "Return requests not found",
      });
    }
    req.returnreq = returnreq;
    next();
  });
};

exports.readReturn = (req, res) => {
  return res.json(req.returnreq);
};

exports.photo = (req, res, next) => {
  if (req.returnreq.photo.data) {
    res.set("Content-Type", req.returnreq.photo.contentType);
    return res.send(req.returnreq.photo.data);
  }
  next();
};

exports.updateByOrderId = (req, res) => {
  console.log(req.body);
  let tempUserName;
  let tempEmail;
  let tempPrefix;
  let tempUserid;
  let returnType;

  if (Number(req.body.retTpe) === 1) {
    returnType = "Replacement";
  } else {
    returnType = "Refund";
  }

  if (req.body.status === "Return Accepted") {
    Order.findOneAndUpdate(
      { _id: req.body.orderId },
      { $set: { status: req.body.status } },
      { new: true },
      (err, order) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        tempOrdID = order.orderid;
        tempUserid = order.userid;

        User.findById({ _id: order.userid }).exec((err, docs) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          tempUserName = docs.clast;
          tempEmail = docs.cemail;
          tempPrefix = docs.prefix;

          var orderlog = new Orderlog({
            orderid: req.body.orderId,
            reason: "Status Changed to " + req.body.status,
            added_by: res.locals._id,
          });
          orderlog.save((err, data) => {
            if (err) {
              console.log("OrderLog CREATE ERROR ", err);
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            console.log("Successfully OrderLog created");
            console.log("res", data);

            getReturnByOrdId(req.body.orderId, req.body.status);

            const emailData = {
              /// User Notification for Return Accepted // UNCOMMENT FOR EMAIL
              to: tempEmail,
              from: {
                email: `${process.env.SENDGRID_SENDER}`,
                name: 'SmartDots'
            },
              templateId: "d-2f3b8d59e2ef43e499c5d961813d6ad8",
              dynamic_template_data: {
                subject: `Your ${returnType} request was accepted`,
                name: tempPrefix + ". " + tempUserName,
                content: `Your request for the Order ${returnType} is accepted.<br/><br/><strong><span style="color:#00a6e6;">Order Id:</span> ${tempOrdID}</strong> <br /><br />You can use the following link to check your order status:<br/><br/>
                                <a href="${process.env.FRONT_URL}allorders/${tempUserid}" style="color:#00a6e6;">${process.env.FRONT_URL}allorders/${tempUserid}</a>`,
              },
            };
            sgMail
              .send(emailData)
              .then((sent) => console.log("SENT >>>", sent))
              .catch((err) => console.log("ERR >>>", err));

            res.json(data);
          });
        });
      }
    );
  } else if (req.body.status === "Return Rejected") {
    Order.findOneAndUpdate(
      { _id: req.body.orderId },
      {
        $set: {
          status: req.body.status,
          cancelled_reason: req.body.cancelled_reason,
        },
      },
      { new: true },
      (err, order) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        tempOrdID = order.orderid;
        tempUserid = order.userid;

        User.findById({ _id: order.userid }).exec((err, docs) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          tempUserName = docs.clast;
          tempEmail = docs.cemail;
          tempPrefix = docs.prefix;

          var orderlog = new Orderlog({
            orderid: req.body.orderId,
            reason: "Status Changed to " + req.body.status,
            added_by: res.locals._id,
          });
          orderlog.save((err, data) => {
            if (err) {
              console.log("OrderLog CREATE ERROR ", err);
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            console.log("Successfully OrderLog created");
            console.log("res", data);

            getReturnByOrdId(req.body.orderId, req.body.status);

            const emailData = {
              /// User Notification for Return Rejected // UNCOMMENT FOR EMAIL
              to: tempEmail,
              from: {
                email: `${process.env.SENDGRID_SENDER}`,
                name: 'SmartDots'
            },
              templateId: "d-2f3b8d59e2ef43e499c5d961813d6ad8",
              dynamic_template_data: {
                subject: `Your ${returnType} request was rejected`,
                name: tempPrefix + ". " + tempUserName,
                content: `Your request for the Order ${returnType} is Rejected.<br/><br/><strong><span style="color:#00a6e6;">Order Id:</span> ${tempOrdID}</strong> <br /><br/><strong><span style="color:#00a6e6;">Reason:</span> ${req.body.cancelled_reason}</strong> <br />`,
              },
            };
            sgMail
              .send(emailData)
              .then((sent) => console.log("SENT >>>", sent))
              .catch((err) => console.log("ERR >>>", err));

            res.json(data);
          });
        });
      }
    );
  }
};

const getReturnByOrdId = (orderID, status) => {
  let temp = 0;
  let tempID;
  if (status === "Return Accepted") {
    temp = 1;
  } else {
    temp = 2;
  }
  Returnreq.find({ orderid: orderID }).exec((err, data) => {
    if (err) {
      console.log("Error1");
      return false;
    }
    console.log("data", data[0]._id);
    tempID = data[0]._id;

    Returnreq.findOneAndUpdate(
      { _id: tempID },
      { $set: { return_status: temp, status_date: new Date() } },
      { new: true },
      (err, prod) => {
        if (err) {
          console.log("Error2");
          return false;
        }
        console.log("Success", prod);
        return true;
      }
    );
  });
};

exports.orderById1 = (req, res, next, id) => {
  Order.findById(id)
    .populate("userid")
    .populate("shipping")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: "Order not found",
        });
      }
      req.order = order;
      next();
    });
};

exports.read1 = (req, res) => {
  return res.json(req.order);
};
