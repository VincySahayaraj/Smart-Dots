const Item = require("../models/item");
const { errorHandler } = require("../helpers/dbErrorHandler");
const formidable = require("formidable"); // image upload
const _ = require("lodash");
const fs = require("fs"); // file system
const InvHistory = require("../models/invHistory");
const { s3FileUpload } = require("../utils/fileUpload");

exports.itemById = (req, res, next, id) => {
  console.log("datas",res.data)
  Item.findById(id)
    .populate("added_by")
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found!",
        });
      }

      console.log("product",product);
      req.product = product;
      console.log("prod",req.product )
      next();
    });
};

exports.read = (req, res) => {
  //req.product.photo = undefined;
  return res.json(req.product);
};

exports.create = (req, res) => {
  console.log("req.bodyyyyy", req.body);

  var tempRes;
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // check for all fields
    const {
      Device_Name,
      Description,
      Color,
      Style,
      Technology,
      Cost_Price,
      SmartDots_MSRP,
      Supplier,
      added_by,
      threshold,
      inventory,
      category,
      images,
      checkImg,
      shipping_charge,
      mainImageURL,
      galleryImageURL,
    } = fields;

    console.log("req.bodyyyyy", fields);

    if (
      !Device_Name ||
      !Description ||
      !Color ||
      !Style ||
      !Technology ||
      !Cost_Price ||
      !SmartDots_MSRP ||
      !Supplier ||
      !inventory ||
      !threshold ||
      !added_by ||
      !category
    ) {
      return res.status(400).json({
        error: "All Mandatory fields are required*",
      });
    }
    if (!mainImageURL) {
      return res.status(400).json({
        error: "Product Image is mandatory*",
      });
    }

    

    if (Number(inventory) > 10000) {
      return res.status(400).json({
        error: "Max Quantity limit is 10000!",
      });
    }

    if (Number(threshold) > Number(inventory)) {
      return res.status(400).json({
        error: "Threshold must be less than quantity!",
      });
    }

    let product = new Item(fields);

    if (checkImg) {
      console.log("body", images);
      product.images = JSON.parse(images);
    }
    if (mainImageURL) {
      product.photo = mainImageURL;
    }

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      // if (files.photo.size > 1000000) {
      //     return res.status(400).json({
      //         error: 'Image should be less than 1mb in size'
      //     });
      // }
      // product.photo.data = fs.readFileSync(files.photo.path);
      // product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        console.log("PRODUCT CREATE ERROR ", err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      tempRes = result;

      var hist = new InvHistory({
        product: result._id,
        inventory_type: 1,
        quantity: product.inventory,
        reason: "New Product Added ",
        added_by: result.added_by,
      });
      hist.save((err, data) => {
        if (err) {
          console.log("Inventory CREATE ERROR ", err);
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        console.log("Successfully inventory created");
        res.json(tempRes);
      });
    });
  });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.update = (req, res) => {
  console.log("datas",res.data)
  var tempRes;
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // check for all fields
    const { threshold, images, checkImg, mainImageURL,galleryImageURL } = fields;

    let product = req.product;
    product = _.extend(product, fields);

    if (checkImg) {
      product.images = JSON.parse(images);
    }

    if (Number(threshold) > Number(product.inventory)) {
      return res.status(400).json({
        error: "Threshold must be less than quantity!",
      });
    }

    if (!product.category) {
      return res.status(400).json({
        error: "Category is required*",
      });
    }

    // 1kb = 1000
    // 1mb = 1000000
    console.log("these are files", files);

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      // product.photo.data = fs.readFileSync(files.photo.path);
      // product.photo.contentType = files.photo.type;
    }
    if (!mainImageURL) {
      return res.status(400).json({
        error: "Image should be uploaded",
      });
    } else {
      product.photo = mainImageURL;
    }
    product.save((err, result) => {
      if (err) {
        console.log("PRODUCT CREATE ERROR ", err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json(result);
    });
  });
};

exports.getProducts = (req, res) => {
  Item.find({ isSmartDots: { $ne: true }, status: { $ne: 1 } })
    .select("_id Device_Name Color")
    .sort({ Device_Name: "asc" })
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.listSmartDotsProducts = (req, res) => {
  Item.find({ isSmartDots: true, status: { $ne: 1 } })
    .select("_id Device_Name SmartDots_MSRP status photo")
    .sort({ updatedAt: "desc" })
    /*  .populate('added_by') */
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

// For Admin Side
exports.listSmartDotsProductsAdmin = (req, res) => {
  Item.find({ isSmartDots: true, status: { $ne: 1 } })
    .select(
      "_id Part_No Device_Name Cost_Price SmartDots_MSRP Supplier Device_Group status inventory threshold category photo"
    )
    .sort({ updatedAt: "desc" })
    .populate("category")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

// Soft delete
exports.remove = (req, res) => {
  Item.findOneAndUpdate(
    { _id: req.body.id },
    { $set: req.body },
    { new: true },
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    }
  );
};

// Adding Product/Accessories to smartdots
exports.addToSmartDot = (req, res) => {
  Item.findOneAndUpdate(
    { _id: req.body.id },
    { $set: req.body },
    { new: true },
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    }
  );
};

// For updating all datas
exports.updateStatus = async (req, res) => {
  try {
    var data = await Item.updateMany({}, { $set: { status: 0 } });
    res.json({ message: "Updated Successfully" });
  } catch (error) {
    return res.status(400).json({
      error: errorHandler(error),
    });
  }
};

exports.listMasterProducts1 = (req, res) => {
  Item.find({ status: { $ne: 1 } })
    .sort({ updatedAt: "desc" })
    .populate("added_by")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.listMasterProducts = (req, res) => {
  Item.find({ status: { $ne: 1 } })
    .select(
      "_id Part_No Device_Name Cost_Price SmartDots_MSRP Supplier Device_Group status inventory threshold isSmartDots"
    )
    .sort({ updatedAt: "desc" })
    .populate("added_by")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.getProductsByCategory = (req, res) => {
  Item.find({ category: req.body.id, isSmartDots: true, status: { $ne: 1 } })
    .sort({ updatedAt: "desc" })
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};
