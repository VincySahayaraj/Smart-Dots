const Shipping = require("../models/shipping");
const Shipment = require("../models/shipment");
const Order = require("../models/order");
require("dotenv").config();
const { errorHandler } = require("../helpers/dbErrorHandler");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(`${process.env.SENDGRID_KEY}`);
const request = require("request");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xml2js = require("xml2js");
var builder = new xml2js.Builder();

exports.read = (req, res) => {
  console.log("hiii");
  return res.json(req.shipping);
};

exports.shippingById = (req, res, next, id) => {
  Shipping.findById(id).exec((err, shipping) => {
    if (err || !shipping) {
      return res.status(400).json({
        error: "Address not found",
      });
    }
    req.shipping = shipping;
    next();
  });
};

exports.update = (req, res) => {
  console.log("udpate", req.body);
  var phoneRegExp = new RegExp("^.{11}$");
  var zipcode = Number(req.body.pin_code);
  if (zipcode&&String(zipcode).length != 5) {
    return res.status(400).json({
      error: "Zip Code must be in 5 digits only*",
    });
  }
  if (!phoneRegExp.test(req.body.phone) && req.body.phone) {
    return res.status(400).json({
      error: "Please enter a valid phone number(e.g 07123456789)",
    });
  }

  Shipping.findOneAndUpdate(
    { _id: req.body.ID },
    { $set: req.body },
    { new: true },
    (err, shipping) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorised to perform this action",
        });
      }
      res.json(shipping);
    }
  );
};

exports.updateStatus = (req, res) => {
  Shipping.findOneAndUpdate(
    { _id: req.body.Id },
    { $set: { status: 2 } },
    { new: true },
    (err, shipping) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorised to perform this action",
        });
      }
      res.json(shipping);
    }
  );
};

exports.getShippingByUserId = (req, res) => {
  Shipping.find({ userid: req.body.id, status: 1 })
  .populate("new_user")
    .sort({ createdAt: -1 })
    .limit(2)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Address doesnot exists",
        });
      }
      res.json(data);
    });
};

exports.getShipment = (req, res) => {
  Shipment.findOne({ orderid: req.body.orderId }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.updateShipment = (req, res) => {
  let tempEmail;
  let tempPrefix;
  let tempUserName;
  let tempOrdID;
  let tempOrderID;

  Shipment.findByIdAndUpdate(
    { _id: req.body.ID },
    {
      $set: {
        shipmentid: req.body.shipmentid,
        label: req.body.tempImg,
        trackLink: req.body.tempUrl,
      },
    },
    { new: true },
    (err, shipping) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorised to perform this action",
        });
      }

      Order.findById({ _id: shipping.orderid })
        .populate("userid")
        .exec((err, ord) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          tempOrdID = ord.orderid;
          tempOrderID = ord._id;
          tempUserName = ord.userid.clast;
          tempEmail = ord.userid.cemail;
          tempPrefix = ord.userid.prefix;

          const emailData1 = {
            to: tempEmail,
            from: {
              email: `${process.env.SENDGRID_SENDER}`,
              name: 'SmartDots'
          },
            templateId: "d-2f3b8d59e2ef43e499c5d961813d6ad8",
            dynamic_template_data: {
              name: tempPrefix + ". " + tempUserName,
              content: `Your order has been successfully shipped.<br/>
                                <span style="color:#00a6e6;">Order Id:</span> <strong>${tempOrdID}</strong><br/>
                                <span style="color:#00a6e6;">Shipment Id:</span> <strong>${req.body.shipmentid}</strong><br/>
                                <span>You can track your order any time using this link: ${req.body.tempUrl} </span>`,
              subject: `Your order has been shipped`,
            },
          };
          sgMail
            .send(emailData1)
            .then((sent) => console.log("SENT >>>", sent))
            .catch((err) => console.log("ERR >>>", err));

          res.json(ord);
        });
    }
  );
};

exports.updateShipment1 = (req, res) => {
  let tempEmail;
  let tempPrefix;
  let tempUserName;
  let tempOrdID;
  let tempOrderID;
  Shipment.findByIdAndUpdate(
    { _id: req.body.ID },
    {
      $set: {
        shipmentid: req.body.shipmentid,
        label: req.body.shipImage,
        preferred_date: req.body.preferred_date,
        preferred_max_time: req.body.preferred_max_time,
        preferred_min_time: req.body.preferred_min_time,
      },
    },
    { new: true },
    (err, shipping) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorised to perform this action",
        });
      }

      Order.findById({ _id: shipping.orderid })
        .populate("userid")
        .exec((err, ord) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          tempOrdID = ord.orderid;
          tempOrderID = ord._id;
          tempUserName = ord.userid.clast;
          tempEmail = ord.userid.cemail;
          tempPrefix = ord.userid.prefix;

          const emailData1 = {
            to: tempEmail,
            from: {
              email: `${process.env.SENDGRID_SENDER}`,
              name: 'SmartDots'
          },
            templateId: "d-2f3b8d59e2ef43e499c5d961813d6ad8",
            dynamic_template_data: {
              name: tempPrefix + ". " + tempUserName,
              content: `Your order has been successfully shipped.<br/>
                            <span style="color:#00a6e6;">Order Id:</span> <strong>${tempOrdID}</strong><br/>
                            <span style="color:#00a6e6;">Shipment Id:</span> <strong>${req.body.shipmentid}</strong><br/>
                            `,
              subject: `Your order has been shipped`,
              fromname: 'Tean smartdots',
            },
          };
          sgMail
            .send(emailData1)
            .then((sent) => console.log("SENT >>>", sent))
            .catch((err) => console.log("ERR >>>", err));

          res.json(ord);
        });
    }
  );
};

exports.updatePickupId = (req, res) => {
  Shipment.findOneAndUpdate(
    { _id: req.body.ID },
    {
      $set: {
        preferred_date: req.body.preferred_date,
        preferred_max_time: req.body.preferred_max_time,
        preferred_min_time: req.body.preferred_min_time,
      },
    },
    { new: true },
    (err, shipping) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorised to perform this action",
        });
      }
      res.json(shipping);
    }
  );
};

exports.create = (req, res) => {
  const shipping = new Shipping(req.body);
  shipping.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.checkMiles = (req, res) => {
  var zipcode = Number(req.body.miles);
  if (String(zipcode).length != 5) {
    return res.status(400).json({
      error: "Zip Code must be in 5 digits only*",
    });
  }

  request(
    {
      url: `https://www.zipcodeapi.com/rest/h5qbjtNZDI5xEOVI2f5fyduSkl3KNaYu6BUGQSj846TTLwUZEczVzYFA6jizfxlo/distance.json/75036/${zipcode}/miles`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(400).json({
          error: "Invalid Zip Code",
        });
      }

      res.json(JSON.parse(body));
    }
  );
};

//function for retrieving the xml response from the worldwide express shipping api

exports.getRates = (req, res) => {
  //need the parameters from the front end to generate the xml request
  console.log(req.body);
  /* console.log(req.body.items[0])
    console.log("height",req.body.items[0].height) */
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open(
    "POST",
    "http://uat.wwex.com:8090/webServices/services/SpeedFreightShipment",
    true
  );

  const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wwex="http://www.wwexship.com">
    <soapenv:Header>     
        <wwex:AuthenticationToken>        
            <wwex:loginId>${process.env.WWEX_LOGINID}</wwex:loginId>  
            <wwex:password>${process.env.WWEX_PASSWORD}</wwex:password>     
            <wwex:licenseKey>${process.env.WWEX_LISCENCE_KEY}</wwex:licenseKey>   
            <wwex:accountNumber>${process.env.WWEX_ACC_NUMBER}</wwex:accountNumber>       
        </wwex:AuthenticationToken>   
    </soapenv:Header>  
    <soapenv:Body>    
        <wwex:quoteSpeedFreightShipment>    
            <wwex:freightShipmentQuoteRequest>      
                <wwex:senderState>AZ</wwex:senderState>      
                <wwex:senderZip>85027</wwex:senderZip>   
                <wwex:senderCountryCode>USA</wwex:senderCountryCode>    

                <wwex:receiverState>${req.body.destination_state}</wwex:receiverState>   
                <wwex:receiverZip>${req.body.destination_postal_code}</wwex:receiverZip>  
                <wwex:receiverCountryCode>USA</wwex:receiverCountryCode>  
                                        
                <wwex:commdityDetails>                
                    <wwex:is11FeetShipment>N</wwex:is11FeetShipment>    
                    <wwex:handlingUnitDetails>                
                        <wwex:wsHandlingUnit>                  
                            <wwex:typeOfHandlingUnit>Box</wwex:typeOfHandlingUnit>  
                            <wwex:numberOfHandlingUnit>${req.body.quantity}</wwex:numberOfHandlingUnit>  
                            <wwex:handlingUnitHeight>${req.body.height}</wwex:handlingUnitHeight>
                            <wwex:handlingUnitLength>${req.body.length}</wwex:handlingUnitLength>
                            <wwex:handlingUnitWidth>${req.body.width}</wwex:handlingUnitWidth>
                            <wwex:lineItemDetails>  
                                <wwex:wsLineItem>                         
                                    <wwex:lineItemHazmatInfo xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/><wwex:lineItemClass>50</wwex:lineItemClass>  
                                    <wwex:lineItemWeight>${req.body.weight}</wwex:lineItemWeight>                     
                                    <wwex:lineItemDescription>${req.body.description}</wwex:lineItemDescription>           
                                   
                                </wwex:wsLineItem>     
                            </wwex:lineItemDetails> 
                        </wwex:wsHandlingUnit>        
                    </wwex:handlingUnitDetails>    
                </wwex:commdityDetails>   
            </wwex:freightShipmentQuoteRequest>   
        </wwex:quoteSpeedFreightShipment>   
    </soapenv:Body> </soapenv:Envelope>`;

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        // console.log(xmlhttp.responseText);
        var options = {
          explicitArray: false,
          tagNameProcessors: [xml2js.processors.stripPrefix],
        };

        xml2js.parseString(xmlhttp.responseText, options, (err, result) => {
          if (err) {
            console.log("An error has occurred: " + err);
            return res.status(400).json({
              error: "Something went wrong, Please try again",
            });
          }

          // Get the soap body object
          var soapBody = result.Envelope.Body;
          // Remove optional attribute(s) from <Body> element.
          if (soapBody.$) {
            delete soapBody.$;
          }
          // Get the body XML if needed
          var soapBodyXML = builder.buildObject(soapBody);
          // console.log("New Data",soapBodyXML);
          xml2js
            .parseStringPromise(soapBodyXML, {
              mergeAttrs: true,
            })
            .then((result125) => {
              if (
                result125.quoteSpeedFreightShipmentResponse
                  .quoteSpeedFreightShipmentReturn[0].responseStatusCode[0] == 0
              ) {
                console.log(
                  "error occcured",
                  result125.quoteSpeedFreightShipmentResponse
                    .quoteSpeedFreightShipmentReturn[0].errorDescriptions[0]
                    .freightShipmentErrorDescription[0].errorDescription[0]
                );
                return res.status(400).json({
                  error:
                    result125.quoteSpeedFreightShipmentResponse
                      .quoteSpeedFreightShipmentReturn[0].errorDescriptions[0]
                      .freightShipmentErrorDescription[0].errorDescription[0],
                });
              }
              const json = JSON.stringify(result125, null, 4);
              console.log("JSON", json);
              res.json(json);
            })
            .catch((err12) => {
              /* console.log("JSON Error",err12) */
              return res.status(400).json({
                error: "Something went wrong please try again!",
              });
            });
        });
        return;
      }
      /*  console.log("error",xmlhttp.statusText) */
      return res.status(400).json({ error: "rate fetching failed" });
    }
  };
  // Send the POST request
  xmlhttp.setRequestHeader("Content-type", 'text/xml;charset="utf-8"');
  xmlhttp.setRequestHeader(
    "SOAPAction",
    '"http://www.wwexship.com/webServices/services/SpeedFreightShipment"'
  );
  xmlhttp.send(xml);
  // send request
  // ...
};

function formatAMPM(date) {
  var dataSplice = String(date).split(":");
  var hours = dataSplice[0];
  var minutes = dataSplice[1];
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  /* minutes = minutes < 10 ? '0'+minutes : minutes; */
  var strTime = hours + ":" + minutes + " " + ampm;
  console.log("Time 1", strTime);
  return strTime;
}

exports.Bookshipment = async (req, res) => {
  console.log(req.body);
  var preferredDate;
  var preferredMinTime;
  var preferredMaxTime;

  if (req.body.preferred_date) {
    var date = new Date(req.body.preferred_date);
    var tempMonth = date.getMonth() + 1;
    if (!isNaN(date.getTime())) {
      // Months use 0 index.
      if (Number(tempMonth) < 10) {
        tempMonth = "0" + tempMonth;
      }
      var resData = tempMonth + "/" + date.getDate() + "/" + date.getFullYear();

      preferredDate = resData;
      console.log("Res Dayta", preferredDate);
    }
  } else {
    return res.status(400).json({ error: "Preferred Date is required*" });
  }

  if (req.body.preferred_min_time) {
    preferredMinTime = formatAMPM(req.body.preferred_min_time);
    console.log("am/pm", preferredMinTime);
  } else {
    return res.status(400).json({ error: "Preferred Min Time is required*" });
  }

  if (req.body.preferred_max_time) {
    preferredMaxTime = formatAMPM(req.body.preferred_max_time);
    console.log("preferredMaxTime", preferredMaxTime);
  }

  /* return res.status(400).json({error:"Preferred Date is required*"}) */
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open(
    "POST",
    "http://uat.wwex.com:8090/webServices/services/SpeedFreightShipment",
    true
  );

  const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wwex="http://www.wwexship.com">
        <soapenv:Header>     
            <wwex:AuthenticationToken>        
                <wwex:loginId>${process.env.WWEX_LOGINID}</wwex:loginId>  
                <wwex:password>${process.env.WWEX_PASSWORD}</wwex:password>     
                <wwex:licenseKey>${process.env.WWEX_LISCENCE_KEY}</wwex:licenseKey>   
                <wwex:accountNumber>${process.env.WWEX_ACC_NUMBER}</wwex:accountNumber>  
            </wwex:AuthenticationToken>   
        </soapenv:Header>  
        <soapenv:Body> 
            <wwex:bookSpeedFreightShipment>    
                <wwex:freightShipmentBookRequest>      
                <wwex:shipmentQuoteId>${req.body.selected_courier_id}</wwex:shipmentQuoteId> 

                    <wwex:freightShipmentSenderDetail>  
                        <wwex:senderCompanyName> Sample name</wwex:senderCompanyName>
                        <wwex:senderAddressLine1> sample adress</wwex:senderAddressLine1>
                        <wwex:senderState>AZ</wwex:senderState>      
                        <wwex:senderZip>85027</wwex:senderZip> 
                        <wwex:senderCity>phoenix</wwex:senderCity> 
                        <wwex:senderCountryCode>USA</wwex:senderCountryCode>
                        <wwex:senderPhone>555-555-1834</wwex:senderPhone>
                    </wwex:freightShipmentSenderDetail> 

                    <wwex:freightShipmentReceiverDetail>  
                        <wwex:receiverCompanyName>${req.body.destination_name}</wwex:receiverCompanyName>
                        <wwex:receiverAddressLine1>${req.body.destination_address_line_1}</wwex:receiverAddressLine1>
                        <wwex:receiverState>${req.body.destination_state}</wwex:receiverState>   
                        <wwex:receiverZip>${req.body.destination_postal_code}</wwex:receiverZip> 
                        <wwex:receiverCity>${req.body.destination_city}</wwex:receiverCity> 
                        <wwex:receiverCountryCode>USA</wwex:receiverCountryCode>
                        <wwex:receiverPhone>${req.body.destination_phone_number}</wwex:receiverPhone>
                    </wwex:freightShipmentReceiverDetail> 

                    <wwex:shipmentDate>${preferredDate}</wwex:shipmentDate>
                    <wwex:shipmentReadyTime>${preferredMinTime}</wwex:shipmentReadyTime>
                    <wwex:shipmentClosingTime>${preferredMaxTime}</wwex:shipmentClosingTime>
                </wwex:freightShipmentBookRequest>   
            </wwex:bookSpeedFreightShipment>   
        </soapenv:Body> </soapenv:Envelope>`;

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        var options = {
          explicitArray: false,
          tagNameProcessors: [xml2js.processors.stripPrefix],
        };

        xml2js.parseString(xmlhttp.responseText, options, (err, result) => {
          if (err) {
            console.log("An error has occurred: " + err);
            return res.status(400).json({
              error: "Something went wrong, Please try again",
            });
          }
          // Get the soap body object
          var soapBody = result.Envelope.Body;

          // Remove optional attribute(s) from <Body> element.
          if (soapBody.$) {
            delete soapBody.$;
          }

          // Get the body XML if needed
          var soapBodyXML = builder.buildObject(soapBody);

          /* console.log("New Data",soapBodyXML); */

          xml2js
            .parseStringPromise(soapBodyXML, {
              mergeAttrs: true,
            })
            .then((result125) => {
              if (
                result125.bookSpeedFreightShipmentResponse
                  .bookSpeedFreightShipmentReturn[0].responseStatusCode[0] == 0
              ) {
                console.log(
                  "error occcured",
                  result125.bookSpeedFreightShipmentResponse
                    .bookSpeedFreightShipmentReturn[0].errorDescriptions[0]
                    .freightShipmentErrorDescription[0].errorDescription[0]
                );
                return res.status(400).json({
                  error:
                    result125.bookSpeedFreightShipmentResponse
                      .bookSpeedFreightShipmentReturn[0].errorDescriptions[0]
                      .freightShipmentErrorDescription[0].errorDescription[0],
                });
              }
              const json = JSON.stringify(result125, null, 4);
              /* console.log("JSON", json); */
              res.json(json);
            })
            .catch((err12) => console.log("JSON Error", err12));
        });

        return;
        // alert('done. use firebug/console to see network response');
      }
      /* console.log("error",xmlhttp.responseText) */
    }
  };
  // Send the POST request
  xmlhttp.setRequestHeader("Content-type", 'text/xml;charset="utf-8"');
  xmlhttp.setRequestHeader(
    "SOAPAction",
    '"http://www.wwexship.com/webServices/services/SpeedFreightShipment"'
  );
  xmlhttp.send(xml);
  // send request
  // ...
};
