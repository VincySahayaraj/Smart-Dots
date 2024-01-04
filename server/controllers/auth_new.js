const User = require("../models/new_customer");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");

// For Customer Registration
exports.register = (req, res) => {
  console.log(req.body);

  var prefixRegExp = new RegExp("^.{1,20}$");
  var nameRegExp = new RegExp("^.{1,32}$");
  var emailRegexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //var phoneRegExp = new RegExp("^.{11}$");
  var pwdRegExp = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}$"
  );

  if (
    !req.body.firstName &&
    !req.body.lastName &&
    !req.body.email &&
    !req.body.password &&
    !req.body.phone
  ) {
    return res.status(400).json({
      error: "All fields are required*",
    });
  } /* else if(!req.body.prefix) {
        return res.status(400).json({
          error: 'Title is required*'
      });
    } */ else if (!req.body.firstName) {
    return res.status(400).json({
      error: "First Name is required*",
    });
  } else if (!req.body.lastName) {
    return res.status(400).json({
      error: "Last Name is required*",
    });
  } else if (!req.body.email) {
    return res.status(400).json({
      error: "Email Address is required*",
    });
  } else if (!req.body.phone) {
    return res.status(400).json({
      error: "Phone Number is required*",
    });
  }

  if (!emailRegexp.test(req.body.email) && req.body.email) {
    return res.status(400).json({
      error: "Enter correct email address",
    });
  }

  if (!pwdRegExp.test(req.body.password) && req.body.password) {
    return res.status(400).json({
      error:
        "Password must contains min 6 and max 15 characters, including one uppercase, lowercase letters, special characters and numbers",
    });
  }

  if (!nameRegExp.test(req.body.firstName) && req.body.firstName) {
    return res.status(400).json({
      error: "First Name must be between max 32 characters only",
    });
  }

  if (!nameRegExp.test(req.body.lastName) && req.body.lastName) {
    return res.status(400).json({
      error: "Last Name must be between max 32 characters only",
    });
  }

  if (!prefixRegExp.test(req.body.prefix) && req.body.prefix) {
    return res.status(400).json({
      error: "Prefix must be between max 20 characters only",
    });
  }

  const user = new User(req.body);
  user.role = 0;
  user.cfirst = req.body.firstName;
  user.clast = req.body.lastName;
  user.cemail = req.body.cemail;
  user.cphone = req.body.cphone;
  user.save((err, user) => {
    if (err) {
      console.log("err", err);
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user });
  });
};

// For Admin Registration
exports.adminRegister = (req, res) => {
  console.log("12", req.body);

  var prefixRegExp = new RegExp("^.{1,20}$");
  var nameRegExp = new RegExp("^.{1,32}$");
  var emailRegexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var phoneRegExp = new RegExp("^.{11}$");
  var pwdRegExp = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}$"
  );

  if (
    !req.body.prefix &&
    !req.body.firstName &&
    !req.body.lastName &&
    !req.body.email &&
    !req.body.password &&
    !req.body.phone
  ) {
    return res.status(400).json({
      error: "All fields are required*",
    });
  } else if (!req.body.prefix) {
    return res.status(400).json({
      error: "Title is required*",
    });
  } else if (!req.body.firstName) {
    return res.status(400).json({
      error: "First Name is required*",
    });
  } else if (!req.body.lastName) {
    return res.status(400).json({
      error: "Last Name is required*",
    });
  } else if (!req.body.email) {
    return res.status(400).json({
      error: "Email Address is required*",
    });
  } else if (!req.body.phone) {
    return res.status(400).json({
      error: "Phone Number is required*",
    });
  }

  if (!emailRegexp.test(req.body.email) && req.body.email) {
    return res.status(400).json({
      error: "Enter correct email address",
    });
  }

  if (!pwdRegExp.test(req.body.password) && req.body.password) {
    return res.status(400).json({
      error:
        "Password must contains min 6 and max 15 characters, including one uppercase, lowercase letters, special characters and numbers",
    });
  }

  if (!nameRegExp.test(req.body.firstName) && req.body.firstName) {
    return res.status(400).json({
      error: "First Name must be between max 32 characters only",
    });
  }

  if (!nameRegExp.test(req.body.lastName) && req.body.lastName) {
    return res.status(400).json({
      error: "Last Name must be between max 32 characters only",
    });
  }

  if (!prefixRegExp.test(req.body.first_name) && req.body.first_name) {
    return res.status(400).json({
      error: "Prefix must be between max 20 characters only",
    });
  }

  if(!phoneRegExp.test(req.body.phone) && req.body.phone) {
        return res.status(400).json({
            error: 'Please enter a valid phone number(e.g 07123456789)'
        });
    }  

  const user = new User({
    prefix: req.body.prefix,
    cfirst: req.body.firstName,
    clast: req.body.lastName,
    cemail: req.body.email,
    cphone: req.body.phone,
    password: req.body.password,
    role: req.body.role,
  });
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user });
  });
};

exports.login = async(req, res) => {
  console.log("Data123", req.body);

  if (!req.body.cemail && !req.body.password) {
    return res.status(400).json({
      error: "All fields are required*",
    });
  } else if (!req.body.cemail) {
    return res.status(400).json({
      error: "Email is required*",
    });
  } else if (!req.body.password) {
    return res.status(400).json({
      error: "Password is required*",
    });
  }

  // find the user based on email
  const { cemail, password } = req.body;


  User.findOne({ cemail }, (err, user) => {
console.log("user",user)
  
    if (err || !user) {
      console.log("We do not recognise this email, please register.");
      return res.status(400).json({
        error: "We do not recognise this email, please register.",
      });
    }

    // if user is found make sure the email and password match
    // create authenticate method in user model
    if(user.status!=1)
    {
      return res.status(400).json({error:"User is blocked by admin!"})
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password not match",
      });
    }

    // generate a signed token with user id and secret

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // persist the token as 't' in cookie with expiry date
    const cookie = req.cookies.token;

    if (cookie == undefined) {
      res.cookie("token", token, { httpOnly: true, sameSite: false });
    } else {
      //to handle the situation where the client browser may have a cookie named "token" from other applications
      res.clearCookie("token");
      res.cookie("token", token, { httpOnly: true, sameSite: false });
    }

    console.log("Succcess");

    // return response with user and token to frontend client
    return res.status(200).json({ message: "login success", token: token });
    // const {_id,prefix, name, lastname, email, role,customerid, subscription_paid, subscriptionid,isSubCancelled} = user
    // return res.json({token, user: {_id,prefix,name,lastname,email,role,customerid,subscription_paid, subscriptionid,isSubCancelled}});
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

exports.checktoken = (req, res) => {
  const req_token = req.headers["authorization"];

  console.log("this is reqtoken", req_token);

  let auth = false;
  if (!req_token) {
    return res.status(200).json({ message: "Please login" });
  }
  try {
    if (!jwt.verify(req_token, process.env.JWT_SECRET)) throw "token not valid";
    else {
      console.log("toekn is valid");
      auth = true;
    }
  } catch (err) {
    console.log("Invalid token");
  }

  if (!auth) {
    console.log("token verfiy failed");
    return res.status(400).json({ message: "token verification failed" });
  } else {
    const data = jwt.verify(req_token, process.env.JWT_SECRET);
    User.findById(data._id).exec((err, user) => {
      if (err || !user) {
        console.log("no user");
        return res.status(400).json({
          error: "User not found",
        });
      }
      const { _id, prefix, cfirst, clast, cemail, role, cphone, customerid } =
        user;
      return res
        .status(200)
        .json({
          user: {
            _id,
            prefix,
            cfirst,
            clast,
            cemail,
            role,
            cphone,
            customerid,
          },
        });
      // return res.status(200).json({"user":user});
    });
  }
};

exports.verifytokenMiddleware = (req, res, next) => {
  const req_token = req.headers["authorization"];
  if (!req_token) {
    return res.status(403).json({
      error: "Access denied!",
    });
  }
  if (req_token == "null") {
    console.log("string null errr");
    return res.status(403).json({
      error: "Access denied!",
    });
  }
  const data = jwt.verify(req_token, process.env.JWT_SECRET);
  if (!data) {
    return res.status(400).json({ message: "token verification failed" });
  }
  User.findById(data._id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    const { _id, prefix, cfirst, clast, cemail, role, cphone, customerid } =
      user;
    res.locals = {
      _id,
      prefix,
      cfirst,
      clast,
      cemail,
      role,
      cphone,
      customerid,
    };
    next();

  });
};
exports.isAuth = (req, res, next) => {
  if (!res.locals) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (res.locals.role === 0) {
    return res.status(403).json({
      error: "Admin resourse! Access denied",
    });
  }
  next();
};

