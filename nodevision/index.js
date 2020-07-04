const express = require('express');
const path = require('path')
const {Storage} = require('@google-cloud/storage');

const multer  = require('multer')

const upload = multer().array('file'); // Very import that this matches the listing in formData
const config = require('./lib/config');
const visionText = require('./lib/vision');

const cors = require('cors');

// Imports the Google Cloud client library.

app.listen(config.server.port, e => console.log(`listening ${config.server.port}: ${e || 'ok'}`))

const app = express()
app.use(express.static(__dirname));
app.use(cors());

app.listen(config.server.port, e => console.log(`listening ${config.server.port}: ${e || 'ok'}`))

//remove
console.log(path.join(__dirname, './PlanCapture.json'))
console.log(config.google.projectId)
console.log(config.google.bucket)


app.get('/',(req,res)=>res.send('Running'))
//https://dev.to/idiglove/file-upload-with-react-express-and-google-cloud-storage-with-folder-structure-2i5j


app.post('/', cors(), function(req, res, next) {
  const storage = new Storage({
		projectId: config.google.projectId,
		keyFilename: path.join(__dirname, 'PlanCapture.json'),
  });
  
  //try {
  async function uploadFile(file, folder, callBack) {

    const bucket = storage.bucket(config.google.bucket)
    console.log(bucket.name)

    const newFileName = folder + '/' + file.originalname;
    const fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      console.log('Something is wrong! Upload failed: ' + error);
    });

    blobStream.on('finish', () => {
        const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`; //image url from firebase server
        console.log(url)
        callBack(url)
        
    });

    blobStream.end(file.buffer);
  }

  upload(req, res, function(err) {
    console.log(req.files)
    let files = req.files
    if (!files){
      return res.end('{"error": "Error uploading file. No file(s) received."}');
    }
    //for (let file in files) {
    //  console.log('working')
    //  uploadFile(files[file], req.body.folder)
    //}

    const callBack = (url) =>{
      console.log(url)

      const callBackVision = (data) => {
        console.log('called back')
        console.log(data)
        res.status(200).json({
          url,
          data
        });
      }
      
      visionText(url, callBackVision)
    }

    uploadFile(files[0], req.body.folder, callBack)
     

    if(err) {
        return res.end(`"error": "Error uploading file. "  ${err}`);
    }



    //res.end("File is uploaded");
  });
//} catch (err) {
//  res.send(err)
//}

});







