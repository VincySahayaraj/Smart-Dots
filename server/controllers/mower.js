const Mower = require("../models/mower");
const { errorHandler } = require("../helpers/dbErrorHandler");
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId; // Import ObjectId


exports.createMower = async (req, res) => {
  console.log("CREATE Mowersssssss:", req.body);
    const mower = new Mower(req.body.values);
        mower.save(async (err, data) => {
          if (err) {
            console.log("Mower Table error");
            console.log("Mower Err", err);
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          console.log("data",data)
          res.send(data)
          tempOrderid = data._id;
        });
    }

    exports.list = (req,res) => {
        Mower.find()
        //.populate("added_by")
        .populate("customer_id")
        .sort({ updatedAt: "desc" })
        .populate("mowerModel")
        .exec((err, data) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        })
    }

    exports.read = (req, res) => {
      return res.json(req.mower);
    };

    exports.mowerById = (req, res, next, id) => {
      console.log(id)
      Mower.findById(id)
      .populate("customer_id")
      .populate("mowerModel")
      .exec((err, mower) => {
        if (err || !mower) {
          return res.status(400).json({
            error: 'Mower does not exist'
          });
        }
        req.mower = mower;
        next();
      });
    };

    exports.getMowerByMowerId = (req, res) => {
      Mower.find({ _id: req.body.id})
      .populate("customer_id")
      .populate("mowerModel")
        .exec((err, data) => {
          if (err) {
            return res.status(400).json({
              error: "Data fetching failed",
            });
          }
          res.json(data);
        });
    };

    exports.mowerByUserId = (req, res, next, id) => {
      console.log("id", id)
      Mower.find({ added_by: id})
      .populate("customer_id")
      .populate("mowerModel")
      .exec((err, mower) => {
        if (err || !mower) {
          return res.status(400).json({
            error: 'Failed to list the mower under a user'
          });
        }
        req.mower = mower;
        next();
      });
    };

    exports.getMowerListForUser = (req, res) => {
      console.log("tttt",req.mower)
      return res.json(req.mower);
    };
    
    exports.update = async(req, res) => {

      const updatedData = req.body.values;
console.log("data",updatedData)
      const existingRecord = await Mower.findOne({
      _id: { $ne: req.mower._id },
      mowerName: updatedData.mowerName,
       //mowerModel: updatedData.mowerModel._id,
       mowerModel: updatedData.mowerModel,
      mowerSerialNo: updatedData.mowerSerialNo,
      mowerModelNo: updatedData.mowerModelNo,
      purchaseFromSmartdots: updatedData.purchaseFromSmartdots,
      dateOfPurchase: updatedData.dateOfPurchase,
      warrantyEndDate: updatedData.warrantyEndDate,
      address: updatedData.address,
      thirdYearwarranty: updatedData.thirdYearwarranty,
      customer_id: updatedData.customer_id,
      updated_by:updatedData.updated_by,
      //added_by: updatedData.added_by._id,
      added_by: updatedData.added_by,
      })
      console.log("exist",existingRecord)
      if(existingRecord){
        if(existingRecord.mowerName == updatedData.mowerName){
          return res.status(400).json({ error: 'Name already exist. Please change the name' });
        }
        return res.status(400).json({ error: 'Values already exist' });
      }
      console.log(req.body.id)
      const updatedRecord = await Mower.findOneAndUpdate({ _id: req.body.id }, 
        { $set: 
          {
            mowerName: updatedData.mowerName,
            //mowerModel:updatedData.mowerModel._id,
            mowerModel:updatedData.mowerModel,
            mowerSerialNo: updatedData.mowerSerialNo,
            mowerModelNo: updatedData.mowerModelNo,
            purchaseFromSmartdots: updatedData.purchaseFromSmartdots,
            dateOfPurchase:updatedData.dateOfPurchase,
            warrantyEndDate:updatedData.warrantyEndDate,
            address : updatedData.address,
            thirdYearwarranty : updatedData.thirdYearwarranty,
            customer_id:updatedData.customer_id,
            //added_by:updatedData.added_by._id,
            added_by:updatedData.added_by,
            updated_by:updatedData.updated_by,
          }
      , }, { new: true }, (err, mower) => {
        if (err) {
          return res.status(400).json({error: 'You are not authorised to perform this action'});
        }
        res.json(mower);
      });

      // Mower.findOneAndUpdate({ _id: req.body._id }, 
      //   { $set: 
      //     {
      //       mowerName: req.body.mowerName,
      //       mowerModel:req.body.mowerModel._id,
      //       mowerSerialNo: req.body.mowerSerialNo,
      //       mowerModelNo: req.body.mowerModelNo,
      //       purchaseFromSmartdots: req.body.purchaseFromSmartdots,
      //       dateOfPurchase:req.body.dateOfPurchase,
      //       warrantyEndDate:req.body.warrantyEndDate,
      //       address : req.body.address,
      //       thirdYearwarranty : req.body.thirdYearwarranty,
      //       added_by:req.body.added_by._id,
      //     }
      // , }, { new: true }, (err, mower) => {
      //   if (err) {
      //     return res.status(400).json({
      //       error: 'You are not authorised to perform this action'
      //     });
      //   }
      //   console.log(mower)
      //   res.json(mower);
      // });
    };

    // exports.getMowerListForUser = (req, res) => {
    //   Mower.find({ added_by: req.body.id})
    //   .populate("added_by")
    //   .populate("mowerModel")
    //     .exec((err, data) => {
    //       if (err) {
    //         return res.status(400).json({
    //           error: "Data fetching failed",
    //         });
    //       }
    //       res.json(data);
    //     });
    // };
    
// const Mower = require('../models/mower');
// const { errorHandler } = require('../helpers/dbErrorHandler');
// require("dotenv").config();


// exports.list = (req,res) => {
//     Mower.find()
//     .sort({updatedAt: 'desc'})
//     .exec((err, data) => {
//         if(err){
//             return res.status(400).json({
//                 error: errorHandler(err)
//             });
//         }
//         res.json(data);
//     })
// }
