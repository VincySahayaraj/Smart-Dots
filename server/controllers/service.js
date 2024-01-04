const Service = require("../models/service");

//ADD NEW SERVICE - INCLUDES DUPLICATE SERVICE NAME CHECK
    exports.addService = async (req, res) => {
  console.log("CREATE Service:", req.body.values);
  
  try {

    const existingRecord = await Service.findOne({
      serviceName: req.body.values.serviceName,
      })

      if(existingRecord){
          return res.status(400).json({ error: 'Name already exist. Please change the name' });
      }


   // Retrieve the number of existing services
   const serviceCount = await Service.countDocuments();
    
   // Generate a new ID by incrementing the count
   const newId = serviceCount + 1;
    const serviceDataWithId = {
      id: newId,
      ...req.body.values,
    };

    console.log("da",serviceDataWithId)

    const service = new Service(serviceDataWithId);
    await service.save(); // Use await to properly handle the promise
    
    console.log("Service data saved:", service);
    
    res.status(201).json(service);
  } catch (err) {
    console.error("Error adding service:", err);
    res.status(400).json({ error: 'Error adding service' });
  }
    };

// LIST ALL SERVICES
    exports.list = (req,res) => {
        Service.find()
        .exec((err, data) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        })
    };

//LIST SERVICES BY ID
    exports.serviceById = (req, res, next, id) => {
      console.log(id)
      Service.findById(id)
      .exec((err, service) => {
        if (err || !service) {
          return res.status(400).json({
            error: 'Servicess does not exist'
          });
        }
        req.service = service;
        next();
      });
    };

    exports.read = (req, res) => {
      return res.json(req.service);
    };

// UPDATE DETAILS OF SERVICE INCLUDES DUPLICATE CHECK
    exports.update = async(req, res) => {
      const updatedData = req.body.values;
      console.log("data",updatedData)
      const existingRecord = await Service.findOne({
      _id: { $ne: req.service._id },
      serviceName: updatedData.serviceName,
      })
      console.log("exist",existingRecord)
      if(existingRecord){
        if(existingRecord.serviceName == updatedData.serviceName){
          return res.status(400).json({ error: 'Name already exist. Please change the name' });
        }
        return res.status(400).json({ error: 'Values already exist' });
      }
      console.log(req.body.id)
      const updatedRecord = await Service.findOneAndUpdate({ _id: req.body.id }, 
        { $set: 
          {
            serviceName: updatedData.serviceName,
            updated_by:updatedData.updated_by,
          }
      , }, { new: true }, (err, service) => {
        if (err) {
          return res.status(400).json({error: 'You are not authorised to perform this action'});
        }
        res.json(service);
      });

    };

// SOFT DELETE THE SERVICE
    exports.changeServiceStatus = (req,res) => {
      console.log("req.body",req.body)
      Service.findOneAndUpdate(
        { _id: req.body.id }, 
        //{ $set: req.body}, 
        { $set:
          {
            status:req.body.status,
            updated_by:req.body.updated_by
          } 
        },
        { new: true }, (err, service) => {
        if (err) {
          return res.status(400).json({error: 'You are not authorised to perform this action'});
        }
        res.json({
          message: 'Service status updated'
      });
      });
    };

