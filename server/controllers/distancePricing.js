const DistancePricing = require('../models/distancePricing'); // Import your Mongoose model

exports.addDistancePricing = async (req, res) => {

    console.log(req.body);
    const { startDistance, endDistance, price } = req.body;

  try {

    const distanceList = DistancePricing.find({});
    //console.log("distanceList",distanceList)
    // Check if the start distance already exists in the database
    const existingStartDistance = await DistancePricing.findOne({startDistance} );
    console.log("existingStartDistance",existingStartDistance)
    // Check if the end distance already exists in the database
    const existingEndDistance = await DistancePricing.findOne( {endDistance });
    console.log("existingEndDistance",existingEndDistance)
    // Check if there is an overlapping range in the database
    const overlappingPricing = await DistancePricing.findOne({
      $or: [
        {
          $and: [
            { startDistance: { $lte: startDistance } },
            { endDistance: { $gte: startDistance } },
          ],
        },
        {
          $and: [
            { startDistance: { $lte: endDistance } },
            { endDistance: { $gte: endDistance } },
          ],
        },
      ],
    });
    console.log("overlappingPricing",overlappingPricing)
    if (existingStartDistance || existingEndDistance || overlappingPricing) {
      return res.status(400).json({ error: 'Distance range already exists in the database' });
    }
    const distancePricing = new DistancePricing(req.body);
    //await distancePricing.save();
    res.status(201).json(distancePricing);
  } 
  catch (err) {
    console.error("Error adding distance pricing:", err);
    res.status(400).json({ error: 'Error adding distance pricing' });
  }
};