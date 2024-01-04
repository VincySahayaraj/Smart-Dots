const AWS = require("aws-sdk");
const s3bucket = new AWS.S3({
  accessKeyId: process.env.IAM_ACCESS_KEY,
  secretAccessKey: process.env.IAM_SECRET_KEY,
  Bucket: process.env.AWS_FILES_BUCKET,
});

exports.s3FileUpload = async (req, res) => {
  let file = req.files.file;
  let currentTime = Date.now();

  let name = currentTime + file.name;
  console.log(req.files);
  try {
    var params = {
      Bucket: process.env.AWS_FILES_BUCKET,
      Key: "" + name,
      Body: file.data,
    };

    s3bucket.upload(params, async function (err, data) {
      if (err) {
        console.log("error in callback");
        console.log(err);
        res.json({ error: true });
      } else {
        console.log("<<===S3  UPLOAD SUCCESS===>>");
        console.log(data);
        let filePath = data.Location;
        console.log("THIS IS MY FILES PATHHHHH", filePath);
        // updates the file path from aws to Po

        res.json({ error: false, url: filePath });
      }
    });
  } catch (err) {
    console.log("err", err);

    res.json({ error: true });
  }
};

exports.galleryUpload = async (req, res) => {
  try {
    let responseURL = [];
    let galleryImage = req.files.gallery;
    console.log("this galeery Image",req.files.gallery)

    if(Array.isArray(galleryImage))
    {
    for (let i = 0; i < galleryImage.length; i++) {
      let url =await multiplefileUpload(galleryImage[i]);
      
      responseURL.push(url)


    }
  }
  else
  {
    let url =await multiplefileUpload(galleryImage);
      
      responseURL.push(url)
  }

    res.json({error:false,url:responseURL})
  } catch (err) {
    console.log("err", err);

    res.json({ error: true });
  }
};

const multiplefileUpload = (file) => {
  console.log("file",file)
  let currentTime = Date.now();

  let name = currentTime + file.name;

  var params = {
    Bucket: process.env.AWS_FILES_BUCKET,
    Key: "" + name,
    Body: file.data,
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, async function (err, data) {
      if (err) {
        console.log("error in callback");
        console.log(err);
        reject(err);
      } else {
        console.log("<<===S3  UPLOAD SUCCESS===>>");
        console.log(data);
        let filePath = data.Location;
        console.log("THIS IS MY FILES PATHHHHH", filePath);
        // updates the file path from aws to Po
        resolve(filePath);
      }
    });
  });
};
