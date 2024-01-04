const Order = require("../models/order");
const User = require("../models/new_customer");
const Shipping = require("../models/shipping");
const Suborder = require("../models/suborder");
const Orderlog = require("../models/orderlog");
const InvHistory = require("../models/invHistory");
var randomize = require("randomatic");
const { errorHandler } = require("../helpers/dbErrorHandler");
const Product = require("../models/item");
const Shipment = require("../models/shipment");
const Orderstatuslog = require("../models/orderstatuslog");
const Couponlog = require("../models/couponLog");
const Notes = require("../models/UserNotes");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const { forEach } = require("lodash");
sgMail.setApiKey(`${process.env.SENDGRID_KEY}`);

exports.orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("userid")
    .populate("shipping")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: "Order does not exist",
        });
      }
      req.order = order;
      next();
    });
};

exports.read = (req, res) => {
  return res.json(req.order);
};

exports.createNewOrder = async (req, res) => {
  console.log("Req Data", req.body);

  // Validation Starts
  var pwdRegExp = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}$"
  );
  var nameRegExp = new RegExp("^.{1,32}$");
  var phoneRegExp = new RegExp("^.{11}$");
  var addressRegExp = new RegExp("^.{1,250}$");
  var postalRegExp = new RegExp("^.{1,20}$");
  const emailRegexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (
    !req.body.first_name &&
    !req.body.prefix &&
    !req.body.last_name &&
    !req.body.email &&
    !req.body.confirm_email &&
    !req.body.phone &&
    !req.body.password &&
    !req.body.address1 &&
    !req.body.pin_code &&
    !req.body.state
  ) {
    return res.status(400).json({
      error: "All fields are required*",
    });
  } else if (!req.body.prefix) {
    return res.status(400).json({
      error: "Title is required*",
    });
  } else if (!req.body.first_name) {
    return res.status(400).json({
      error: "First Name is required*",
    });
  } else if (!req.body.last_name) {
    return res.status(400).json({
      error: "Last Name is required*",
    });
  } else if (!req.body.email) {
    return res.status(400).json({
      error: "Email Address is required*",
    });
  } else if (!req.body.confirm_email) {
    return res.status(400).json({
      error: "Confirm Email Address is required*",
    });
  } else if (!req.body.phone) {
    return res.status(400).json({
      error: "Phone Number is required*",
    });
  } else if (!req.body.address1) {
    return res.status(400).json({
      error: "Address Line 1 is required*",
    });
  } else if (!req.body.city) {
    return res.status(400).json({
      error: "Town/City is required*",
    });
  } else if (!req.body.pin_code) {
    return res.status(400).json({
      error: "Postcode is required*",
    });
  } else if (!req.body.country) {
    return res.status(400).json({
      error: "Country is required*",
    });
  } else if (!req.body.password) {
    return res.status(400).json({
      error: "Password is required*",
    });
  } else if (!req.body.state) {
    return res.status(400).json({
      error: "State is required*",
    });
  }

  if (!emailRegexp.test(req.body.email) && req.body.email) {
    return res.status(400).json({
      error: "Enter correct email address",
    });
  }

  if (req.body.email != req.body.confirm_email) {
    return res.status(400).json({
      error: "Email Address and Confirm Email Address must be same",
    });
  }

  if (!pwdRegExp.test(req.body.password) && req.body.password) {
    return res.status(400).json({
      error:
        "Password must contains min 6 and max 15 characters, including one uppercase, lowercase letters, special characters and numbers",
    });
  }

  if (!nameRegExp.test(req.body.first_name) && req.body.first_name) {
    return res.status(400).json({
      error: "First Name must be between max 32 characters only",
    });
  }

  if (!nameRegExp.test(req.body.last_name) && req.body.last_name) {
    return res.status(400).json({
      error: "Last Name must be between max 32 characters only",
    });
  }

 

  if (!addressRegExp.test(req.body.address1) && req.body.address1) {
    return res.status(400).json({
      error: "Address Line 1 must be between max 250 characters only",
    });
  }
  if (!addressRegExp.test(req.body.address2) && req.body.address2) {
    return res.status(400).json({
      error: "Address Line 2 must be between max 250 characters only",
    });
  }

  if (!nameRegExp.test(req.body.city) && req.body.city) {
    return res.status(400).json({
      error: "City must be between max 32 characters only",
    });
  }

  if (!nameRegExp.test(req.body.state) && req.body.state) {
    return res.status(400).json({
      error: "State must be between max 32 characters only",
    });
  }

  if (!postalRegExp.test(req.body.pin_code) && req.body.pin_code) {
    return res.status(400).json({
      error: "Postal Code must be between max 20 characters only",
    });
  }

  let emailExist = await User.findOne({ cemail: req.body.email });
  if (emailExist) {
    return res.json({ error: "Email already exists try with a new one" });
  }

  let phoneNumberExists = await User.findOne({ cphone: req.body.phone });

  if (phoneNumberExists) {
    return res.json({ error: "Entered Phone Number already exists " });
  }

  // Validation Ends

  let tempOrderid;
  let prod = req.body.Prodid.split(",");
  let tempPrice = req.body.Prodprice.split(",");
  let tempQuantity = req.body.Prodquan.split(",");
  let tempName = req.body.Prodname.split(",");
  let count = prod.length - 1;
  let tempQuan;
  let tempEmail;
  let tempUserName;
  let salesTax = 0;
  //updated on 15-04-21
  let tempUserid;

  /* Genarte random String Start */
  let randomStr = randomize("0", 4);
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  let output = day + "" + month + "" + year;
  let finalString = output + "" + randomStr;
  console.log("Random string 1", finalString);
  /* Genarte random String End */

  const shipping = new Shipping(req.body);

  const order = new Order(req.body);

  // create new user
  const user = new User({
    prefix: req.body.prefix,
    cfirst: req.body.first_name,
    clast: req.body.last_name,
    cemail: req.body.email,
    cphone: req.body.phone,
    password: req.body.password,
  });

  user.save((err, userData) => {
    if (err) {
      console.log("this iz ere", err);
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    //this line was commented before
    tempUserid = userData._id;
    shipping.userid = userData._id;
    order.userid = userData._id;
    tempUserName = userData.prefix + ". " + userData.clast;
    tempEmail = userData.cemail;

    // create a shipping address

    shipping.save((err, shippingData) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      order.shipping = shippingData._id;
      order.orderid = finalString;

      // if(shippingData.state=="Texas")

      if (Number(order.quantity) == 0) {
        order.quantity = 1;
      } else {
        order.quantity = req.body.quantity;
      }

      order.save(async (err, data) => {
        if (err) {
          console.log("Order Table error");
          console.log("order Err", err);
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        tempOrderid = data._id;
        tempProductName = data.title;
        tempCost = data.price;
        tempQuantityCount = data.quantity;
        tempOrdID = data.orderid;

        if (req.body.couponType !== 0) {
          const couponLog = new Couponlog(req.body);
          console.log("Coupon");
          // this line caused error in live
          couponLog.orderid = tempOrderid;
          couponLog.couponid = req.body.couponid;
          couponLog.userid = tempUserid;
          couponLog.save((err, data2) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
          });
        }

        const emailData = {
          // Uncomment for email
          to: tempEmail, //tempEmail
          from: {
            email: `${process.env.SENDGRID_SENDER}`,
            name: "SmartDots",
          },
          templateId: "d-2f3b8d59e2ef43e499c5d961813d6ad8",
          dynamic_template_data: {
            name: tempUserName,
            content:
              "Thank you for signing up for SmartDot's updates channel. We are truly encouraged by your support and interest and will make sure not to spam your inbox.",
            subject: `Your Account is Registered Successfully`,
          },
        };
        console.log("emaildagt");

        sgMail
          .send(emailData)
          .then((sent) => console.log("SENT >>>", sent))
          .catch((err) => console.log("ERR >>>", err));

        let saves = [];
        for (let i = 0; i < count; i++) {
          console.log(prod[i]);
          const suborder = new Suborder(req.body);
          suborder.productid = prod[i];
          suborder.price = tempPrice[i];
          suborder.assign_device = tempName[i];
          tempQuan = tempQuantity[i];
          console.log("Temp Quantity", tempQuan);
          suborder.quantity = tempQuantity[i];
          suborder.orderid = tempOrderid;
          tempReserved = 0;

          for (let j = 0; j < tempQuan; j++) {
            const suborder1 = new Suborder(req.body);
            suborder1.productid = prod[i];
            suborder1.price = tempPrice[i];
            suborder1.assign_device = tempName[i];
            suborder1.orderid = tempOrderid;
            suborder1.quantity = 1;
            try {
              const entry = await suborder1.save();
              saves.push(entry);
            } catch (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            continue;
          }
        }
        console.log("Saves file: ", saves);
        return res.json(saves);
      });
    });
  });
};

exports.createUser = async (req, res) => {
  console.log("CREATE Order:", req.body);

  var nameRegExp = new RegExp("^.{1,32}$");
  var phoneRegExp = new RegExp("^.{11}$");
  var addressRegExp = new RegExp("^.{1,250}$");
  var postalRegExp = new RegExp("^.{1,20}$");

  // Validation for Choosing New Delivery Address

  if (req.body.recentAdd === "0") {
    if (
      !req.body.first_name &&
      !req.body.prefix &&
      !req.body.last_name &&
      !req.body.phone &&
      !req.body.address1 &&
      !req.body.pin_code &&
      !req.body.state
    ) {
      return res.status(400).json({
        error: "All fields are required*",
      });
    } else if (!req.body.prefix) {
      return res.status(400).json({
        error: "Title is required*",
      });
    } else if (!req.body.first_name) {
      return res.status(400).json({
        error: "First Name is required*",
      });
    } else if (!req.body.last_name) {
      return res.status(400).json({
        error: "Last Name is required*",
      });
    } else if (!req.body.phone) {
      return res.status(400).json({
        error: "Phone Number is required*",
      });
    } else if (!req.body.address1) {
      return res.status(400).json({
        error: "Address Line 1 is required*",
      });
    } else if (!req.body.city) {
      return res.status(400).json({
        error: "Town/City is required*",
      });
    } else if (!req.body.pin_code) {
      return res.status(400).json({
        error: "Postcode is required*",
      });
    } else if (!req.body.country) {
      return res.status(400).json({
        error: "Country is required*",
      });
    } else if (!req.body.state) {
      return res.status(400).json({
        error: "State is required*",
      });
    }

    if (!nameRegExp.test(req.body.first_name) && req.body.first_name) {
      return res.status(400).json({
        error: "First Name must be between max 32 characters only",
      });
    }

    if (!nameRegExp.test(req.body.last_name) && req.body.last_name) {
      return res.status(400).json({
        error: "Last Name must be between max 32 characters only",
      });
    }


    if (!addressRegExp.test(req.body.address1) && req.body.address1) {
      return res.status(400).json({
        error: "Address Line 1 must be between max 250 characters only",
      });
    }
    if (!addressRegExp.test(req.body.address2) && req.body.address2) {
      return res.status(400).json({
        error: "Address Line 2 must be between max 250 characters only",
      });
    }

    if (!nameRegExp.test(req.body.city) && req.body.city) {
      return res.status(400).json({
        error: "City must be between max 32 characters only",
      });
    }

    if (!nameRegExp.test(req.body.state) && req.body.state) {
      return res.status(400).json({
        error: "State must be between max 32 characters only",
      });
    }

    if (!postalRegExp.test(req.body.pin_code) && req.body.pin_code) {
      return res.status(400).json({
        error: "Postal Code must be between max 20 characters only",
      });
    }
  }
  // Validation Ends

  let tempOrderid;
  let prod = req.body.Prodid.split(",");
  let tempPrice = req.body.Prodprice.split(",");
  let tempQuantity = req.body.Prodquan.split(",");
  let tempName = req.body.Prodname.split(",");
  let count = prod.length - 1;
  let tempQuan;
  let salesTax = 0;

  /* Genarte random String Start */
  let randomStr = randomize("0", 4);
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  let output = day + "" + month + "" + year;
  let finalString = output + "" + randomStr;
  console.log("Random string 1", finalString);
  /* Genarte random String End */

  // req.body.price = req.body.price + parseInt(req?.body?.salesTax);
  if (req.body.salesTax) {
    req.body.price = req.body.price + parseInt(req.body.salesTax)

  }
  const shipping = new Shipping(req.body);

  const order = new Order(req.body);

  if (req.body.recentAdd == "0") {
    shipping.save((err, shippingData) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      order.shipping = shippingData._id;
      order.orderid = finalString;

      if (Number(order.quantity) == 0) {
        order.quantity = 1;
      } else {
        order.quantity = req.body.quantity;
      }

      order.save(async (err, data) => {
        if (err) {
          console.log("Order Table error");
          console.log("order Err", err);
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        tempOrderid = data._id;

        //coupon log entry
        if (req.body.couponType !== 0) {
          const couponLog = new Couponlog(req.body);
          console.log("Coupon");
          couponLog.orderid = tempOrderid;
          couponLog.couponid = req.body.couponid;
          couponLog.userid = res.locals._id;
          couponLog.save((err, data2) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
          });
        }

        let saves = [];
        for (let i = 0; i < count; i++) {
          console.log(prod[i]);
          const suborder = new Suborder(req.body);
          suborder.productid = prod[i];
          suborder.price = tempPrice[i];
          suborder.assign_device = tempName[i];
          tempQuan = tempQuantity[i];
          console.log("Temp Quantity", tempQuan);
          suborder.quantity = tempQuantity[i];
          suborder.orderid = tempOrderid;
          tempReserved = 0;

          for (let j = 0; j < tempQuan; j++) {
            const suborder1 = new Suborder(req.body);
            suborder1.productid = prod[i];
            suborder1.price = tempPrice[i];
            suborder1.assign_device = tempName[i];
            suborder1.orderid = tempOrderid;
            suborder1.quantity = 1;

            try {
              const entry = await suborder1.save();
              saves.push(entry);
            } catch (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            continue;
          }
        }
        console.log("Saves file: ", saves);
        return res.json(saves);
      });
    });
  } else {
    order.shipping = req.body.recentAdd;
    order.orderid = finalString;

    if (Number(order.quantity) == 0) {
      order.quantity = 1;
    } else {
      order.quantity = req.body.quantity;
    }

    order.save(async (err, data) => {
      if (err) {
        console.log("Order Table error");
        console.log("order Err", err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      tempOrderid = data._id;

      //coupon log entry
      if (req.body.couponType !== 0) {
        const couponLog = new Couponlog(req.body);
        console.log("Coupon");
        couponLog.orderid = tempOrderid;
        couponLog.couponid = req.body.couponid;
        couponLog.userid = res.locals._id;
        couponLog.save((err, data2) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
        });
      }

      let saves = [];
      for (let i = 0; i < count; i++) {
        console.log(prod[i]);
        const suborder = new Suborder(req.body);
        suborder.productid = prod[i];
        suborder.price = tempPrice[i];
        suborder.assign_device = tempName[i];
        tempQuan = tempQuantity[i];
        console.log("Temp Quantity", tempQuan);
        suborder.quantity = tempQuantity[i];
        suborder.orderid = tempOrderid;
        tempReserved = 0;

        for (let j = 0; j < tempQuan; j++) {
          const suborder1 = new Suborder(req.body);
          suborder1.productid = prod[i];
          suborder1.price = tempPrice[i];
          suborder1.assign_device = tempName[i];
          suborder1.orderid = tempOrderid;
          suborder1.quantity = 1;
          try {
            const entry = await suborder1.save();
            saves.push(entry);
          } catch (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          continue;
        }
      }
      return res.json(saves);
    });
  }
};

exports.getOrderDetails = (req, res) => {
  console.log("Req data", req.body);
  Order.findOne({ _id: req.body.order })
    .populate("userid")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.updateOrderStatus = (req, res) => {
  let tempuserId;
  let tempOrdID;
  let tempUsername;
  let tempEmail;
  let tempPrefix;
  Order.findOne({ _id: req.body.orderId })
    .populate("userid")
    .exec((err, ordData) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      tempuserId = ordData.userid._id;
      tempOrdID = ordData.orderid;
      tempUsername = ordData.userid.clast;
      tempEmail = ordData.userid.cemail;
      tempPrefix = ordData.userid.prefix;
      Order.findOneAndUpdate(
        { _id: req.body.orderId },
        {
          $set: {
            status: req.body.status,
            paymentId: req.body.paymentId,
            payment_date: new Date(),
          },
        },
        { new: true },
        (err, order) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }

          const emailData1 = {
            // Customer UNCOMMENT for EMAIL
            to: tempEmail, //tempEmail
            // from: `${process.env.SENDGRID_SENDER}`,
            from: {
              email: `${process.env.SENDGRID_SENDER}`,
              name: "SmartDots",
            },
            templateId: "d-2f3b8d59e2ef43e499c5d961813d6ad8",
            dynamic_template_data: {
              name: tempPrefix + ". " + tempUsername,
              content: `Welcome to SmartDots. Thank you for placing an order with us.`,
              subject: `Your Order Placed Successfully!`,
            },
          };
          sgMail
            .send(emailData1)
            .then((sent) => console.log("User Notification SENT >>>", sent))
            .catch((err) => console.log("User Notification ERR >>>", err));

          const emailData = {
            // Admin Email UNCOMMENT for EMAIL
            to: `${process.env.CONTACT_TO_EMAIL}`,
            from: {
              email: `${process.env.SENDGRID_SENDER}`,
              name: "SmartDots",
            },

            templateId: "d-8a28c959a5f94dd7be61a83133fac88c",
            dynamic_template_data: {
              content: `New order has been placed. <b>Order Id : ${tempOrdID}</b>`,
              subject: `New Order Placed!`,
            },
          };

          sgMail
            .send(emailData)
            .then((sent) =>
              console.log("Admin Notification SENT >>>-----------", sent)
            )
            .catch((err) => console.log("Admin Notification ERR >>>", err));

          var orderlog = new Orderlog({
            orderid: req.body.orderId,
            reason: "Order placed, status changed to " + req.body.status,
            added_by: tempuserId,
          });
          orderlog.save((err, data) => {
            if (err) {
              console.log("OrderLog CREATE ERROR ", err);
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            console.log("Successfully OrderLog created");
            let Result = getReservedValues(
              req.body.orderId,
              tempuserId,
              tempOrdID,
              1
            );
            res.json(data);
          });
        }
      );
    });
};

const getReservedValues = async (orderId, userId, tempOrdID, checkValue) => {
  let count = 0;
  let saves = await Suborder.find({ orderid: orderId }).exec();

  count = saves.length;

  let tempProd = "";

  for (var i = 0; i < count; i++) {
    // Product ID
    tempProd += saves[i].productid + ",";
  }

  let tempProd1 = tempProd.split(","); // Array of product ID

  var counts = {};
  for (var i = 0; i < tempProd1.length; i++) {
    // finding distinct elements
    counts[tempProd1[i]] = 1 + (counts[tempProd1[i]] || 0);
  }
  let prod = JSON.stringify(counts);
  prod = prod.replace("{", "").replace("}", "").replace(/['"]+/g, "");
  let prodArray = prod.split(",");
  var tempID = "";
  var tempValue = 0;
  for (var i = 0; i < prodArray.length - 1; i++) {
    var prodName = prodArray[i].split(":");
    tempID = prodName[0];
    tempValue = prodName[1];

    if (Number(checkValue) === 1) {
      // Moved from Quantity to Reserved
      let Res1 = await addReservedValues(tempID, tempValue, userId, tempOrdID);
    } else if (Number(checkValue) === 2) {
      // Shipped - Reserved will be reduced
      let Res2 = await updateQuan1(tempID, tempValue, userId, tempOrdID);
    } else if (Number(checkValue) === 3) {
      // Cancelled befor Shipped- Moved Reserved to Quantity
      let Res3 = await updateQuanforCancelledOrd(
        tempID,
        tempValue,
        userId,
        tempOrdID
      );
    }
  }

  return true;
};

const addReservedValues = async (ID, value, userID, orderID) => {
  console.log("ID", ID);
  let tempReserved = 0;
  let tempQuan = 0;
  let tempThreshold = 0;
  let checkQuan = 0;
  let prodName = "";
  let data = await Product.findById({ _id: ID }).exec();

  tempReserved = data.reserved;
  tempQuan = data.inventory;

  await Product.findByIdAndUpdate(
    { _id: ID },
    {
      $set: {
        reserved: Number(tempReserved) + Number(value),
        inventory: Number(tempQuan) - Number(value),
      },
    },
    { new: true }
  ).then(async (prod1) => {
    if (prod1) {
      checkQuan = prod1.inventory;
      tempThreshold = prod1.threshold;
      prodName = prod1.Device_Name;
      let hist = new InvHistory({
        product: ID,
        inventory_type: 2,
        quantity: Number(value),
        reason: `${orderID}- Quantity moved to Reserved`,
        added_by: userID,
      });
      await hist.save((err, data) => {
        if (err) {
          console.log("Inventory CREATE ERROR ", err);
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        console.log("Successfully inventory created");
        if (Number(checkQuan) <= Number(tempThreshold)) {
          const emailData = {
            // Notification mail to Admin
            to: `${process.env.CONTACT_TO_EMAIL}`,

            from: {
              email: `${process.env.SENDGRID_SENDER}`,
              name: "SmartDots",
            },

            templateId: "d-8a28c959a5f94dd7be61a83133fac88c",
            dynamic_template_data: {
              subject: "Product Inventory Update Required",
              content: `We have received a low inventory than threshold for ${prodName}.<br/><br/><strong><span style="color:#00a6e6;">Product Name:</span> ${prodName}</strong> <br /><br />You can use the following link to update the inventory:<br/><br/>
                                            <a href="${process.env.FRONT_URL}admin/inventory/${ID}" style="color:#00a6e6;">${process.env.FRONT_URL}admin/inventory/${ID}</a>`,
            },
          };
          sgMail
            .send(emailData)
            .then((sent) => console.log("SENT Notification >>>", sent))
            .catch((err) => console.log("ERR >>>", err));
        }

        return true;
      });
    }
    return true;
  });
};

const updateQuan1 = async (ID, value, userID, orderID) => {
  console.log("ID", ID);
  let tempReserved = 0;
  let tempQuan = 0;
  let tempThreshold = 0;
  let checkQuan = 0;
  let prodName = "";
  let data = await Product.findById({ _id: ID }).exec();

  tempReserved = data.reserved;
  tempQuan = data.inventory;

  await Product.findByIdAndUpdate(
    { _id: ID },
    { $set: { reserved: Number(tempReserved) - Number(value) } },
    { new: true }
  ).then(async (prod1) => {
    if (prod1) {
      checkQuan = prod1.inventory;
      tempThreshold = prod1.threshold;
      prodName = prod1.Device_Name;
      let hist = new InvHistory({
        product: ID,
        inventory_type: 2,
        quantity: Number(value),
        reason: `${orderID}- Reserved Reduced`,
        added_by: userID,
      });
      await hist.save((err, data) => {
        if (err) {
          console.log("Inventory CREATE ERROR ", err);
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        console.log("Successfully inventory created");
        if (checkQuan <= tempThreshold) {
          const emailData = {
            // Notification mail to Admin
            to: `${process.env.CONTACT_TO_EMAIL}`,
            from: {
              email: `${process.env.SENDGRID_SENDER}`,
              name: "SmartDots",
            },
            templateId: "d-8a28c959a5f94dd7be61a83133fac88c",
            dynamic_template_data: {
              subject: "Product Inventory Update Required",
              content: `We have received a low inventory than threshold for ${prodName}.<br/><br/><strong><span style="color:#00a6e6;">Product Name:</span> ${prodName}</strong> <br /><br />You can use the following link to update the inventory:<br/><br/>
                                            <a href="${process.env.FRONT_URL}admin/inventory/${ID}" style="color:#00a6e6;">${process.env.FRONT_URL}admin/inventory/${ID}</a>`,
            },
          };
          sgMail
            .send(emailData)
            .then((sent) => console.log("SENT >>>", sent))
            .catch((err) => console.log("ERR >>>", err));
        }

        return true;
      });
    }
    return true;
  });
};

const updateQuanforCancelledOrd = async (ID, value, userID, orderID) => {
  console.log("ID", ID);
  let tempReserved = 0;
  let tempQuan = 0;
  let tempThreshold = 0;
  let checkQuan = 0;
  let prodName = "";
  let data = await Product.findById({ _id: ID }).exec();
  tempReserved = data.reserved;
  tempQuan = data.inventory;

  await Product.findByIdAndUpdate(
    { _id: ID },
    {
      $set: {
        reserved: Number(tempReserved) - Number(value),
        inventory: Number(tempQuan) + Number(value),
      },
    },
    { new: true }
  ).then(async (prod1) => {
    if (prod1) {
      checkQuan = prod1.inventory;
      tempThreshold = prod1.threshold;
      prodName = prod1.Device_Name;
      let hist = new InvHistory({
        product: ID,
        inventory_type: 1,
        quantity: Number(value),
        reason: `${orderID}- Reserved move to Quantity`,
        added_by: userID,
      });
      await hist.save((err, data) => {
        if (err) {
          console.log("Inventory CREATE ERROR ", err);
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        console.log("Successfully inventory created");
        if (checkQuan <= tempThreshold) {
          const emailData = {
            // Notification mail to Admin
            to: `${process.env.CONTACT_TO_EMAIL}`,
            from: {
              email: `${process.env.SENDGRID_SENDER}`,
              name: "SmartDots",
            },
            templateId: "d-8a28c959a5f94dd7be61a83133fac88c",
            dynamic_template_data: {
              subject: "Product Inventory Update Required",
              content: `We have received a low inventory than threshold for ${prodName}.<br/><br/><strong><span style="color:#00a6e6;">Product Name:</span> ${prodName}</strong> <br /><br />You can use the following link to update the inventory:<br/><br/>
                                            <a href="${process.env.FRONT_URL}admin/inventory/${ID}" style="color:#00a6e6;">${process.env.FRONT_URL}admin/inventory/${ID}</a>`,
            },
          };
          sgMail
            .send(emailData)
            .then((sent) => console.log("SENT >>>", sent))
            .catch((err) => console.log("ERR >>>", err));
        }

        return true;
      });
    }
    return true;
  });
};

exports.list = (req, res) => {
  Order.find()
    .sort({ updatedAt: "desc" })
    .populate("userid")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.getAlluserOrders = (req, res) => {
  user_id = res.locals._id;
  Order.find({ userid: user_id })
    .populate("shipping")
    .sort({ updatedAt: "desc" })
    .exec((err, orders) => {
      if (err || !orders) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json(orders);
    });
};

exports.getAlluserOrdersAdmin = (req, res) => {
  user_id = req.body.userId;
  Order.find({ userid: user_id })
    .populate("shipping")
    .populate("userid")
    .sort({ updatedAt: "desc" })
    .exec((err, orders) => {
      if (err || !orders) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json(orders);
    });
};

exports.getRestrictUserOrders = (req, res) => {
  user_id = res.locals._id;
  Order.find({
    userid: user_id,
    status: {
      $nin: ["Order Cancelled", "Return Rejected", "Return Completed"],
    },
  })
    .populate("userid")
    .populate("shipping")
    .sort({ updatedAt: "desc" })
    .exec((err, orders) => {
      if (err || !orders) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json(orders);
    });
};

exports.getCancelledOrders = (req, res) => {
  user_id = res.locals._id;
  Order.find({ userid: user_id, status: "Order Cancelled" })
    .populate("userid")
    .populate("shipping")
    .sort({ updatedAt: "desc" })
    .exec((err, orders) => {
      if (err || !orders) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json(orders);
    });
};

exports.getAllAdress = (req, res) => {
  const user_id = res.locals._id;
  Shipping.find({ userid: user_id, status: 1 })
    .sort({ createdAt: -1 })
    .exec((err, adress) => {
      if (err || !adress) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json(adress);
    });
};

exports.getAdresses = (req, res) => {
  const user_id = res.locals._id;
  Shipping.find({ userid: user_id, status: 1 })
    .sort({ createdAt: -1 })
    .limit(2)
    .exec((err, adress) => {
      if (err) {
        return res.status(400).json({
          error: "Address doesnot exists",
        });
      }
      return res.json(adress);
    });
};

exports.updateCancelledStatus = async (req, res) => {
  const user_id = res.locals._id;
  let tempOrdID;
  let tempUserName;
  let tempEmail;
  let tempPrefix;

  let tempStatus1 = await Order.findOne({ _id: req.body.orderId }).exec();
  console.log("Temp Order1", tempStatus1);
  if (
    tempStatus1.status != "Shipped" &&
    tempStatus1.status != "Delayed" &&
    tempStatus1.status != "Awaiting Payment"
  ) {
    let ordRes = await getReservedValues(
      req.body.orderId,
      user_id,
      tempStatus1.orderid,
      3
    );
  }

  Order.findOneAndUpdate(
    { _id: req.body.orderId },
    {
      $set: {
        status: req.body.status,
        cancelled_reason: req.body.cancelled_reason,
        cancelled_by: user_id,
        cancelled_date: new Date(),
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

      User.findById({ _id: order.userid }).exec((err, docs) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        tempUserName = docs.clast;
        tempEmail = docs.cemail;
        tempPrefix = docs.prefix;

        const emailData1 = {
          to: tempEmail, //tempEmail UNCOMMENT for EMAIL
          from: {
            email: `${process.env.SENDGRID_SENDER}`,
            name: "SmartDots",
          },
          templateId: "d-2f3b8d59e2ef43e499c5d961813d6ad8",
          dynamic_template_data: {
            name: tempPrefix + ". " + tempUserName,
            content: `Your order has been successfully cancelled.<br/>
                  <span style="color:#00a6e6;">Order Id:</span><strong> ${tempOrdID}</strong>`,
            subject: `Your order has been cancelled`,
          },
        };
        sgMail
          .send(emailData1)
          .then((sent) => console.log("SENT >>>", sent))
          .catch((err) => console.log("ERR >>>", err));

        const emailData = {
          // Admin Notification UNCOMMENT for EMAIL
          to: `${process.env.CONTACT_TO_EMAIL}`,
          from: {
            email: `${process.env.SENDGRID_SENDER}`,
            name: "SmartDots",
          },
          templateId: "d-8a28c959a5f94dd7be61a83133fac88c",
          dynamic_template_data: {
            subject: "Order Cancelled",
            content: `We have received a Cancelled Order from below.<br/><br/><strong><span style="color:#00a6e6;">Order Id:</span> ${tempOrdID}</strong> <br />`,
          },
        };

        sgMail
          .send(emailData)
          .then((sent) => console.log("SENT >>>", sent))
          .catch((err) => console.log("ERR >>>", err));

        var orderlog = new Orderlog({
          orderid: req.body.orderId,
          reason: "Status Changed to " + req.body.status,
          added_by: user_id,
        });
        orderlog.save((err, data) => {
          if (err) {
            console.log("OrderLog CREATE ERROR ", err);
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          console.log("Successfully OrderLog created");
          res.json(data);
        });
      });
    }
  );
};

const checktrackUrl = (carriers, id) => {
  if (carriers === "DHL") {
    return `https://www.dhl.com/us-en/home/tracking.html?tracking-id=${id}&submit=1`;
  } else if (carriers === "UPS") {
    return `https://www.ups.com/track?loc=null&tracknum=${id}&requester=WT/trackdetails`;
  } else if (carriers === "FedEx") {
    return `https://www.fedex.com/fedextrack/?tracknumbers=${id}&cntry_code=us`;
  } else if (carriers === "USPS") {
    return `https://tools.usps.com/go/TrackConfirmAction_input?strOrigTrackNum=${id}`;
  }
  return "";
};

exports.testing = (req, res) => {
  try {
    let data =
      req.body.itemList &&
      req.body.itemList.map(
        (s, i) =>
          `<tr><td><a target="_blank" href=${checktrackUrl(
            s.carriers,
            s.trackingNo
          )} rel="noreferrer">${s.trackingNo}</a></td><td>${s.carriers
          }</td></tr>`
      );
    return res.json(data);
  } catch (error) { }
};

exports.updateManual = (req, res) => {
  const adminId = res.locals._id;

  let userId = "";
  let tempEmail;
  let tempPrefix;
  let tempUserName;
  let tempOrdID;
  let tempOrderID;
  let tempShippingid;
  let manualList = [];

  Order.findOneAndUpdate(
    { _id: req.body.orderId },
    { $set: { status: req.body.status, shipmentType: req.body.shipmentType } },
    { new: true },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      tempOrdID = order.orderid;
      tempShippingid = order.shipping;
      userId = order.userid;

      // Storing to Shipment(Shipping Details)
      const shipment = new Shipment(req.body);
      shipment.shippingid = tempShippingid;
      shipment.orderid = req.body.orderId;
      shipment.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        manualList = data.itemList;

        var orderlog = new Orderlog({
          orderid: req.body.orderId,
          reason: "Status Changed to " + req.body.status,
          added_by: adminId,
        });
        orderlog.save((err, data) => {
          if (err) {
            console.log("OrderLog CREATE ERROR ", err);
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          console.log("Successfully OrderLog created");

          let Res = getReservedValues(req.body.orderId, adminId, tempOrdID, 2);

          User.findById({ _id: userId }).exec((err, ord) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            tempUserName = ord.clast;
            tempEmail = ord.cemail;
            tempPrefix = ord.prefix;

            let tableData =
              manualList.length &&
              manualList.map(
                (s) =>
                  `<tr><td><a target="_blank" href=${checktrackUrl(
                    s.carriers,
                    s.trackingNo
                  )} rel="noreferrer">${s.trackingNo}</a></td><td>${s.carriers
                  }</td></tr>`
              );

            const emailData1 = {
              to: tempEmail,
              from: {
                email: `${process.env.SENDGRID_SENDER}`,
                name: "SmartDots",
              },
              templateId: "d-2f3b8d59e2ef43e499c5d961813d6ad8",
              dynamic_template_data: {
                name: tempPrefix + ". " + tempUserName,
                content: `Your order has been successfully shipped.<br/>
                                        <span style="color:#00a6e6;">Order Id:</span> <strong>${tempOrdID}</strong><br/>
                                       
                                        <div class="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Tracking No</th>
                                                        <th>Carriers</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    ${tableData}
                                                </tbody>
                                            </table>
                                        </div>
                                       
                                        `,
                subject: `Your order has been shipped`,
              },
            };
            sgMail
              .send(emailData1)
              .then((sent) => console.log("SENT >>>", sent))
              .catch((err) => console.log("ERR >>>", err));

            res.json(data);
          });
        });
      });
    }
  );
};

exports.updateOrderStatusAdmin = async (req, res) => {
  console.log(req.body);
  const adminId = res.locals._id;
  let tempUserName;
  let tempEmail;
  let tempOrdID;
  let tempShippingid;
  var element_content;
  var content;
  let tempUserID;
  let tempShipID;
  let tempPrefix;
  let retType;

  var exp_match =
    /(\b(https?|):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  if (req.body.status === "Shipped") {
    Order.findOneAndUpdate(
      { _id: req.body.orderId },
      {
        $set: { status: req.body.status, shipmentType: req.body.shipmentType },
      },
      { new: true },
      (err, order) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        tempOrdID = order.orderid;
        tempShippingid = order.shipping;

        // Storing to Shipment(Shipping Details)
        const shipment = new Shipment(req.body);
        shipment.shippingid = tempShippingid;
        shipment.orderid = req.body.orderId;
        shipment.save((err, data) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }

          var orderlog = new Orderlog({
            orderid: req.body.orderId,
            reason: "Status Changed to " + req.body.status,
            added_by: adminId,
          });
          orderlog.save((err, data) => {
            if (err) {
              console.log("OrderLog CREATE ERROR ", err);
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            console.log("Successfully OrderLog created");

            let Res = getReservedValues(
              req.body.orderId,
              adminId,
              tempOrdID,
              2
            );
            res.json(data);
          });
        });
      }
    );
  } else if (req.body.status === "Order Cancelled") {
    let tempStatus1 = await Order.findOne({ _id: req.body.orderId }).exec();
    console.log("Temp Order1", tempStatus1);
    if (
      tempStatus1.status != "Shipped" &&
      tempStatus1.status != "Delayed" &&
      tempStatus1.status != "Awaiting Payment"
    ) {
      let ordRes = await getReservedValues(
        req.body.orderId,
        adminId,
        tempStatus1.orderid,
        3
      );
    }

    Order.findOneAndUpdate(
      { _id: req.body.orderId },
      {
        $set: {
          status: req.body.status,
          cancelled_reason: req.body.cancelled_reason,
          cancelled_by: adminId,
          cancelled_date: new Date(),
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

        User.findById({ _id: order.userid }).exec((err, docs) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          tempUserName = docs.clast;
          tempEmail = docs.cemail;
          tempPrefix = docs.prefix;

          const emailData1 = {
            to: tempEmail, //tempEmail UNCOMMENT for EMAIL
            from: {
              email: `${process.env.SENDGRID_SENDER}`,
              name: "SmartDots",
            },
            templateId: "d-2f3b8d59e2ef43e499c5d961813d6ad8",
            dynamic_template_data: {
              name: tempPrefix + ". " + tempUserName,
              content: `Your order has been successfully cancelled.<br/>
                        <span style="color:#00a6e6;">Order Id:</span> <strong>${tempOrdID}</strong>`,
              subject: `Your order has been cancelled`,
            },
          };
          sgMail
            .send(emailData1)
            .then((sent) => console.log("SENT >>>", sent))
            .catch((err) => console.log("ERR >>>", err));

          const emailData = {
            // Admin Notification UNCOMMENT for EMAIL
            to: `${process.env.CONTACT_TO_EMAIL}`,
            from: {
              email: `${process.env.SENDGRID_SENDER}`,
              name: "SmartDots",
            },
            templateId: "d-8a28c959a5f94dd7be61a83133fac88c",
            dynamic_template_data: {
              subject: "Order Cancelled",
              content: `We have received a Cancelled Order from below.<br/><br/><strong><span style="color:#00a6e6;">Order Id:</span> ${tempOrdID}</strong> <br />`,
            },
          };

          sgMail
            .send(emailData)
            .then((sent) => console.log("SENT >>>", sent))
            .catch((err) => console.log("ERR >>>", err));

          var orderlog = new Orderlog({
            orderid: req.body.orderId,
            reason: "Status Changed to " + req.body.status,
            added_by: adminId,
          });
          orderlog.save((err, data) => {
            if (err) {
              console.log("OrderLog CREATE ERROR ", err);
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            console.log("Successfully OrderLog created");

            res.json(data);
          });
        });
      }
    );
  } else if (req.body.status === "Delivered") {
    /* else if(req.body.status === "Delayed") {

        Order.findOneAndUpdate({ _id: req.body.orderId }, { $set: { status: req.body.status } },{ new: true }, (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }   
                tempOrdID = order.orderid;
                tempUserID = order.userid;
                var orderstatuslog = new Orderstatuslog({orderid: req.body.orderId, reason: req.body.reason, resolution_time: req.body.resolution_time})
                orderstatuslog.save((err, data) => {
                    if(err) {
                        console.log('Order Status Log CREATE ERROR ', err);
                        return res.status(400).json({
                            error: errorHandler(err)
                        });         
                    }     
    
                    User.findById({_id:tempUserID})
                    .exec((err,docs) => {
                        if(err) {
                            return res.status(400).json({
                                error:errorHandler(err)
                            });
                        }
                        tempUserName = docs.clast;
                        tempEmail = docs.cemail;
                        tempPrefix = docs.prefix;
            
                        var orderlog = new Orderlog({orderid: req.body.orderId, reason: "Status Changed to "+req.body.status, added_by:adminId})
                        orderlog.save((err, data) => {
                            if(err) {
                                console.log('OrderLog CREATE ERROR ', err);
                                return res.status(400).json({
                                    error: errorHandler(err)
                                });         
                            }       
                            console.log('Successfully OrderLog created');
                            console.log('res',data);
                            res.json(data);
                        })
                    });
                });
    
    
        })

    } */
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

        User.findById({ _id: order.userid }).exec((err, docs) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          tempUserName = docs.clast;
          tempEmail = docs.cemail;
          tempPrefix = docs.prefix;

          Shipment.find({ orderid: req.body.orderId }).exec((err, ships) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            //tempShipID = ships[0].shipmentid
            content = ships[0].message;
            if (!exp_match.test(content)) {
              element_content = ships[0].message;
            } else {
              element_content = content.replace(
                exp_match,
                "<a href='$1'>Link of tracking</a>"
              );
            }

            const emailData1 = {
              to: tempEmail, //tempEmail UNCOMMENT for EMAIL
              from: {
                email: `${process.env.SENDGRID_SENDER}`,
                name: "SmartDots",
              },
              templateId: "d-2f3b8d59e2ef43e499c5d961813d6ad8",
              dynamic_template_data: {
                name: tempPrefix + ". " + tempUserName,
                content: `Your order has been successfully delivered.<br/>
                            <span style="color:#00a6e6;">Order Id:</span> <strong>${tempOrdID}</strong><br/>
                          
                            `,
                subject: `Your order has been delivered successfully`,
              },
            };
            sgMail
              .send(emailData1)
              .then((sent) => console.log("SENT >>>", sent))
              .catch((err) => console.log("ERR >>>", err));

            var orderlog = new Orderlog({
              orderid: req.body.orderId,
              reason: "Status Changed to " + req.body.status,
              added_by: adminId,
            });
            orderlog.save((err, data) => {
              if (err) {
                console.log("OrderLog CREATE ERROR ", err);
                return res.status(400).json({
                  error: errorHandler(err),
                });
              }
              console.log("Successfully OrderLog created");
              res.json(data);
            });
          });
        });
      }
    );
  } else if (req.body.status === "Return Completed") {
    if (req.body.retType === 1) {
      retType = "Replacement";
    } else {
      retType = "Refund";
    }

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

        User.findById({ _id: order.userid }).exec((err, docs) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          tempUserName = docs.clast;
          tempEmail = docs.cemail;
          tempPrefix = docs.prefix;

          const emailData1 = {
            // customer Notification for Return Completed // UNCOMMENT FOR EMAIL
            to: tempEmail, //tempEmail
            from: {
              email: `${process.env.SENDGRID_SENDER}`,
              name: "SmartDots",
            },
            templateId: "d-2f3b8d59e2ef43e499c5d961813d6ad8",
            dynamic_template_data: {
              subject: `Your ${retType} was successfull`,
              name: tempPrefix + ". " + tempUserName,
              content: `Your ${retType} for the Order is successfull.<br/><br/><strong><span style="color:#00a6e6;">Order Id:</span> ${tempOrdID}</strong> <br />`,
            },
          };
          sgMail
            .send(emailData1)
            .then((sent) => console.log("SENT >>>", sent))
            .catch((err) => console.log("ERR >>>", err));

          var orderlog = new Orderlog({
            orderid: req.body.orderId,
            reason: "Status Changed to " + req.body.status,
            added_by: adminId,
          });
          orderlog.save((err, data) => {
            if (err) {
              console.log("OrderLog CREATE ERROR ", err);
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            console.log("Successfully OrderLog created");
            res.json(data);
          });
        });
      }
    );
  } else {
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

        var orderlog = new Orderlog({
          orderid: req.body.orderId,
          reason: "Status Changed to " + req.body.status,
          added_by: adminId,
        });
        orderlog.save((err, data) => {
          if (err) {
            console.log("OrderLog CREATE ERROR ", err);
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          console.log("stattts", req.body.status);

          if (req.body.status == "Delayed") {
            User.findById({ _id: order.userid }).exec((err, docs) => {
              if (err) {
                return res.status(400).json({
                  error: errorHandler(err),
                });
              }

              tempUserName = docs.clast;
              tempPrefix = docs.prefix;
              tempEmail = docs.cemail;
              const emailData1 = {
                to: tempEmail, //tempEmail UNCOMMENT for EMAIL
                from: {
                  email: `${process.env.SENDGRID_SENDER}`,
                  name: "SmartDots",
                },
                templateId: "d-2f3b8d59e2ef43e499c5d961813d6ad8",
                dynamic_template_data: {
                  name: tempPrefix + ". " + tempUserName,
                  content: `Your order is delayed.<br/>
                          <span style="color:#00a6e6;">Order Id:</span> <strong>${tempOrdID}</strong>`,
                  subject: `Your order is delayed `,
                },
              };
              sgMail
                .send(emailData1)
                .then((sent) => console.log("SENT Delayed mail>>>", sent))
                .catch((err) => console.log("ERR >>>", err));
            });
          }
          console.log("Successfully OrderLog created");
          res.json(data);
        });
      }
    );
  }
};

exports.getSubOrder = (req, res) => {
  Suborder.find({ orderid: req.body.id })
    .populate("productid")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.AddUserNote = (req, res) => {
  const notes = new Notes({ orderId: req.body.orderId, note: req.body.note });
  notes.save((err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        error: "Operation Failed",
      });
    }
    console.log("Note added successfully");
    res.json(data);
  });
};

exports.getUserNotes = (req, res) => {
  Notes.find({ orderId: req.params.orderId }).exec((err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        error: "Data fetching failed",
      });
    }
    console.log("the adata is", data);
    res.json(data);
  });
};


exports.getOrderByUserId = (req, res) => {
  const jsonString = req.body
  console.log(jsonString)
  Order.find({ userid: req.body.id})
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "User have not purchased the product. Please choose the right product",
        });
      }

      if(data.length>0){
        
        if(data.length==1){
          console.log("only 1")
        }
        if(data.length>1){
          console.log("more than 1")
        }

        const currentDates = data[0].createdAt
        
        //const currentDates = data.createdAt; // Replace this with your actual date value

        const currentDate = new Date(currentDates);
        // Create a new date by adding 2 years to the current date
        const updatedDate = new Date(currentDate);
        updatedDate.setFullYear(currentDate.getFullYear() + 2);

        // Format the original and updated dates as ISO strings
        const originalDateStr = currentDate.toISOString();
        const updatedDateStr = updatedDate.toISOString();

        // Create a JSON response object with both dates
        const jsonResponse = {
        purchaseDate: originalDateStr,
        warrentyEndDate: updatedDateStr,
        // Include other data as needed
      };

        return res.json(jsonResponse);
      }
      // else{
      //   return res.status(200).json({
      //     error: "User does not order productsssss",
      //   });
      // }
    });
};

exports.getOrderByUserIdandProductId = (req, res) => {
  console.log(req.body)
  Order.find({ userid: req.body.id})
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "User have not purchased the product. Please choose the righ product",
        });
      }

      if(data.length>0){
        
        if(data.length==1){
          console.log("only 1")
        }
        if(data.length>1){
          console.log("more than 1")
        }

        const currentDates = data[0].createdAt
        
        //const currentDates = data.createdAt; // Replace this with your actual date value

        const currentDate = new Date(currentDates);
        // Create a new date by adding 2 years to the current date
        const updatedDate = new Date(currentDate);
        updatedDate.setFullYear(currentDate.getFullYear() + 2);

        // Format the original and updated dates as ISO strings
        const originalDateStr = currentDate.toISOString();
        const updatedDateStr = updatedDate.toISOString();

        // Create a JSON response object with both dates
        const jsonResponse = {
        purchaseDate: originalDateStr,
        warrentyEndDate: updatedDateStr,
        // Include other data as needed
      };

        return res.json(jsonResponse);
      }
      // else{
      //   return res.status(200).json({
      //     error: "User does not order productsssss",
      //   });
      // }
    });
};

// exports.getOrderByUserId = (req, res) => {
//   Order.find({ userid: req.body.id})
//   // .sort({ status: "Delivered" })
//     .exec((err, data) => {
//       if (err) {
//         return res.status(400).json({
//           error: "User doesnot order products",
//         });
//       }
//       console.log("hias",data)
//       if(data.length>1){
//         const orderIds = data.map(order => order._id);
//         console.log("orderIds",orderIds)
//         for(const orderId of orderIds){
//           console.log("orderIdssss",orderId)
//           Suborder.find({orderid:orderId}).exec((err,data)=>{
//             if(err){
//               return res.status(400).json({
//                 error: "User doesnot order products",
//               });
//             }
//           }
//           )
//         }
//         res.json(data)
//       }
      
//     });
// };
//   Order.find({ userid: req.body.id})
//   // .sort({ status: "Delivered" })
//   .exec((err, data) => {
//   if (err) {
//   return res.status(400).json({
//   error: "User doesnot order products",
//   });
//   }
//   console.log("hias",data)
//   if(data.length>1){
//   const orderIds = data.map(order => order.orderid);
//   console.log("orderIds",orderIds)
//   async function getSuborders(){
//   const datas = await Promise.all(orderIds.map(orderId => Suborder.find({orderid:orderId}).exec()));
//   res.json(datas);
//   }
//   getSuborders();
//   }
  
//   });
//   };