const Address = require("../models/address");

exports.addAddress = async (req, res) => {
    // console.log("Address:", req);
    console.log("CREATE Address:", req.body);
    const address = new Address(req.body);
    address.save(async (err, data) => {
          if (err) {
            console.log("Address Table error");
            console.log("Address Err", err);
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
        Address.find()
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

