import AWS from 'aws-sdk'
const S3_BUCKET =process.env.REACT_APP_AWS_FILES_BUCKET;

AWS.config.update({
    accessKeyId: process.env.REACT_APP_IAM_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_IAM_SECRET_KEY
})



const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET}

})



export const s3FileUpload = async (file, name) => {


    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
    };

    myBucket.putObject(params)
    .on('httpUploadProgress', (evt) => {
     
        console.log("progress",evt)
    })
    .send((err) => {
        if (err) console.log("this is an err",err)
    })
}

