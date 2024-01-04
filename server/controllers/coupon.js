const Coupon = require('../models/coupon');
const Order = require('../models/order');
const User = require('../models/new_customer');
const Couponlog = require('../models/couponLog');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  console.log("Data", req.body);
  if (Number(req.body.value_type) === 2) {
    if (Number(req.body.coupon_value) > 100) {
      return res.status(400).json({
        error: `Coupon's Percentage limit is only 100%`
      });
    }
  }
  const coupon = new Coupon(req.body);
  coupon.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    console.log("Result", data);
    res.json({ data });
  })
}

exports.list = (req, res) => {
  Coupon.find()
    .sort({ updatedAt: 'desc' })
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(data);
    });
};

/* exports.getCoupons = async(req,res) => {
    try {
        const data = await Coupon.aggregate([
            {
                $mat
            }
        ])
    } catch (error) {
        return res.status(400).json({
            error:"something went wrong"
        });
    }
} */


exports.couponById = (req, res, next, id) => {
  Coupon.findById(id).exec((err, coupon) => {
    if (err || !coupon) {
      return res.status(400).json({
        error: 'Coupon does not exist'
      });
    }
    req.coupon = coupon;
    next();
  });
};

exports.update = (req, res) => {
  console.log("Address", req.body);
  if (Number(req.body.value_type) === 2) {
    if (Number(req.body.coupon_value) > 100) {
      return res.status(400).json({
        error: `Coupon's Percentage limit is only 100%`
      });
    }
  }
  Coupon.findOneAndUpdate({ _id: req.body.couponID }, { $set: req.body }, { new: true }, (err, coupon) => {
    if (err) {
      return res.status(400).json({
        error: 'You are not authorised to perform this action'
      });
    }
    console.log(coupon)
    res.json(coupon);
  });
};

exports.read = (req, res) => {
  console.log("res",req.coupon)
  return res.json(req.coupon);
};


exports.couponCheck1 = async (req, res) => {
  console.log("Coupon", req.body)
  if (!req.body.coupon) {
    return res.status(400).json({
      error: 'Coupon Code is required*'
    });
  }

  let couponValues = await Coupon.findOne({ coupon_code: req.body.coupon }).exec()

  let tempCouponId;
  let tempDate = new Date();
  console.log("Today Date", tempDate);
  var tempDate1 = tempDate.toISOString().slice(0, 10);
  console.log("Today Date1", tempDate1);
  let tempStart;
  let tempEnd;
  let start;
  let end;
  let todayDate;
  let couponLogValues;

  if (!couponValues) {
    return res.status(400).json({
      error: 'We do not recognise this coupon.'
    });
  }
  else {

    tempCouponId = couponValues._id;
    tempStart = couponValues.start_date;
    tempEnd = couponValues.end_date;

    tempStart = tempStart.toISOString().slice(0, 10);
    tempEnd = tempEnd.toISOString().slice(0, 10);

    todayDate = Date.parse(tempDate1);
    start = Date.parse(tempStart);
    end = Date.parse(tempEnd);
    console.log("Today Date1", tempDate1);
    console.log("temp Start", tempStart);
    console.log("temp End", tempEnd);

    console.log("Start", start);
    console.log("End", end);
    console.log("Today", todayDate);

    couponLogValues = await Couponlog.find({ couponid: tempCouponId }).exec()
    console.log("COupon Log Values", couponLogValues.length);
    console.log("Coupon Limit", couponValues.coupon_limit)
    if (couponLogValues.length >= couponValues.coupon_limit) {
      return res.status(400).json({
        error: 'Sorry, the maximum number of limit for this coupon has been reached.'
      });
    }
  }

  let subPlan = await User.findOne({ _id: res.locals._id }).exec()

  let orderValues = await Order.findOne({ userid: res.locals._id, status: { $ne: "Order Cancelled" } }).exec()

  console.log("Subscription Plan", subPlan.subscription_plan);
  console.log("Customer Type", couponValues.customer_type)
  console.log("SubPlan", subPlan);
  console.log("Coupon Values", couponValues);
  console.log("Order Values", orderValues);

  if (orderValues) {

    if (subPlan.subscription_plan === 0 && couponValues.customer_type === 5) { // Silver plan
      console.log("Silver");
      if ((todayDate >= start) && (todayDate <= end)) {
        Couponlog.findOne({ userid: res.locals._id, couponid: tempCouponId }, (err, docs1) => {
          if (!docs1) {
            console.log("Docs1", couponValues)
            res.json(couponValues);
          }
          else {
            res.status(400).json({
              error: 'You already used this coupon'
            });
          }
        });
      }
      else {
        return res.status(400).json({
          error: 'Sorry, that coupon code is expired'
        });
      }
    }
    else if (subPlan.subscription_plan === 1 && couponValues.customer_type === 4) { // Gold Plan
      console.log("Gold");
      if ((todayDate >= start) && (todayDate <= end)) {
        Couponlog.findOne({ userid: res.locals._id, couponid: tempCouponId }, (err, docs1) => {
          if (!docs1) {
            console.log("Docs1", couponValues)
            res.json(couponValues);
          }
          else {
            res.status(400).json({
              error: 'You already used this coupon'
            });
          }
        });
      }
      else {
        return res.status(400).json({
          error: 'Sorry, that coupon code is expired'
        });
      }
    }
    else if (couponValues.customer_type === 3) { // All Paid Customers Plan
      console.log("All");
      if ((todayDate >= start) && (todayDate <= end)) {
        Couponlog.findOne({ userid: res.locals._id, couponid: tempCouponId }, (err, docs1) => {
          if (!docs1) {
            console.log("Docs1", couponValues)
            res.json(couponValues);
          }
          else {
            res.status(400).json({
              error: 'You already used this coupon'
            });
          }
        });
      }
      else {
        return res.status(400).json({
          error: 'Sorry, that coupon code is expired'
        });
      }
    }
    else {
      return res.status(400).json({
        error: 'You are not allowed to use this coupon.'
      });
    }
  }
  else { // Un Paid Customers

    if (couponValues.customer_type === 2) {
      console.log("Un Paid Customer");
      if ((todayDate >= start) && (todayDate <= end)) {
        Couponlog.findOne({ userid: res.locals._id, couponid: tempCouponId }, (err, docs1) => {
          if (!docs1) {
            console.log("Docs1", couponValues)
            res.json(couponValues);
          }
          else {
            res.status(400).json({
              error: 'You already used this coupon'
            });
          }
        });
      }
      else {
        return res.status(400).json({
          error: 'Sorry, that coupon code is expired'
        });
      }
    }
    else {
      return res.status(400).json({
        error: 'You are not allowed to use this coupon.'
      });
    }
  }
}

exports.couponCheck = async (req, res) => {

  console.log("Coupon", req.body)
  if (!req.body.coupon) {
    return res.status(400).json({
      error: 'Coupon Code is required*'
    });
  }

  let couponValues = await Coupon.findOne({ coupon_code: req.body.coupon,status:1 }).exec()

  let tempCouponId;
  let tempDate = new Date();
  console.log("Today Date", tempDate);
  var tempDate1 = tempDate.toISOString().slice(0, 10);
  console.log("Today Date1", tempDate1);
  let tempStart;
  let tempEnd;
  let start;
  let end;
  let todayDate;
  let couponLogValues;

  if (!couponValues) {
    return res.status(400).json({
      error: 'We do not recognise this coupon.'
    });
  }
  else {

    tempCouponId = couponValues._id;
    tempStart = couponValues.start_date;
    tempEnd = couponValues.end_date;

    tempStart = tempStart.toISOString().slice(0, 10);
    tempEnd = tempEnd.toISOString().slice(0, 10);

    todayDate = Date.parse(tempDate1);
    start = Date.parse(tempStart);
    end = Date.parse(tempEnd);
    console.log("Today Date1", tempDate1);
    console.log("temp Start", tempStart);
    console.log("temp End", tempEnd);

    console.log("Start", start);
    console.log("End", end);
    console.log("Today", todayDate);

    couponLogValues = await Couponlog.find({ couponid: tempCouponId }).exec()
    console.log("COupon Log Values", couponLogValues.length);
    console.log("Coupon Limit", couponValues.coupon_limit)
    if (couponLogValues.length >= couponValues.coupon_limit) {
      return res.status(400).json({
        error: 'Sorry, the maximum number of limit for this coupon has been reached.'
      });
    }

  }

  let orderValues = await Order.findOne({ userid: res.locals._id, status: { $ne: "Order Cancelled" } }).exec()

  console.log("Customer Type", couponValues.customer_type)
  console.log("Coupon Values", couponValues);
  console.log("Order Values", orderValues);

  if (orderValues) {

    if (couponValues.customer_type === 3 || couponValues.customer_type === 4 || couponValues.customer_type === 5 || couponValues.customer_type === 6) { // All Paid Customers Plan
      console.log("All");
      if ((todayDate >= start) && (todayDate <= end)) {
        Couponlog.findOne({ userid: res.locals._id, couponid: tempCouponId }, (err, docs1) => {
          if (!docs1) {
            console.log("Docs1", couponValues)
            res.json(couponValues);
          }
          else {
            res.status(400).json({
              error: 'You already used this coupon'
            });
          }
        });
      }
      else {
        return res.status(400).json({
          error: 'Sorry, that coupon code is expired'
        });
      }
    }
    else {
      return res.status(400).json({
        error: 'You are not allowed to use this coupon.'
      });
    }

  }
  else { // Un Paid Customers

    if (couponValues.customer_type === 2 || couponValues.customer_type === 4 || couponValues.customer_type === 5 || couponValues.customer_type === 6) {
      console.log("Un Paid Customer");



      if ((todayDate >= start) && (todayDate <= end)) {
        Couponlog.findOne({ userid: res.locals._id, couponid: tempCouponId }, (err, docs1) => {
          if (!docs1) {
            console.log("Docs1", couponValues)



            res.json(couponValues);
          }
          else {
            res.status(400).json({
              error: 'You already used this coupon'
            });
          }
        });
      }
      else {
        return res.status(400).json({
          error: 'Sorry, that coupon code is expired'
        });
      }
    }
    else {
      return res.status(400).json({
        error: 'You are not allowed to use this coupon.'
      });
    }
  }
}



exports.newUserCouponCheck = (req, res) => {

  console.log("Coupon", req.body)
  if (!req.body.coupon) {
    return res.status(400).json({
      error: 'Coupon Code is required*'
    });
  }
  let tempCouponId;
  let tempDate = new Date();
  console.log("Today Date", tempDate);
  var tempDate1 = tempDate.toISOString().slice(0, 10);
  let tempStart;
  let tempEnd;
  let start;
  let end;
  let todayDate;

  Coupon.findOne({ coupon_code: req.body.coupon }, async (err, docs) => {
    if (err || !docs) {
      return res.status(400).json({
        error: 'We do not recognise this coupon.'
      });
    }
    tempCouponId = docs._id;
    tempStart = docs.start_date;
    tempEnd = docs.end_date;
    tempStart = tempStart.toISOString().slice(0, 10);

    tempEnd = tempEnd.toISOString().slice(0, 10);

    todayDate = Date.parse(tempDate1);
    start = Date.parse(tempStart);
    end = Date.parse(tempEnd);
    console.log("Today Date1", tempDate1);
    console.log("temp Start", tempStart);
    console.log("temp End", tempEnd);
    console.log("Start", start);
    console.log("End", end);
    console.log("Today", todayDate);

    let couponLogValues = await Couponlog.find({ couponid: tempCouponId }).exec()
    console.log("Length", couponLogValues.length);
    console.log("Coupon Limit", docs.coupon_limit)
    if (couponLogValues.length >= docs.coupon_limit) {
      return res.status(400).json({
        error: 'Sorry, the maximum number of limit for this coupon has been reached.'
      });
    }

    if (docs.customer_type === 1 || docs.customer_type === 4 || docs.customer_type === 5 || docs.customer_type === 6) {

      if ((todayDate >= start) && (todayDate <= end)) {
        res.json(docs);
      }
      else {
        return res.status(400).json({
          error: 'Sorry, that coupon code is expired'
        });
      }

    }
    else {

      return res.status(400).json({
        error: 'You are not allowed to use this coupon.'
      });

    }
  })
}


exports.getCouponLogsByCouponId = (req, res) => {
  console.log("Body", req.body);
  Couponlog.find({ couponid: req.body.couponId })
    .populate('userid')
    .populate('orderid')
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      console.log("Result", data);
      res.json(data)
    })
}

exports.couponLoglist = (req, res) => {
  console.log("coupon")
  Couponlog.find()
    .select('couponid')
    .sort({ updatedAt: 'desc' })
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(data);
    });
};

exports.getCouponByOrderId = (req, res) => {
  console.log("Body", req.body);
  Couponlog.findOne({ orderid: req.body.orderId })
    .populate('orderid')
    .populate('couponid')
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      console.log("Result", data);
      res.json(data)
    })
}

exports.updateCouponStatus = async (req, res) => {
  console.log("reqq", req.body);
  try {
    let result = await Coupon.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          status: req.body.status,
        },
      }
    );

    console.log("result", result);
    return res.status(200).json({ err: false });
  } catch (err) {
    return res.status(400).json({ err: true });
  }
};