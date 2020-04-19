const express = require('express');
const path = require('path')
const multer  = require('multer')
const upload = multer().array('imgCollection')
const config = require('./lib/config');
// Imports the Google Cloud client library.
const {Storage} = require('@google-cloud/storage');

const app = express()
app.listen(PORT = 3000, e => console.log(`listening ${PORT}: ${e || 'ok'}`))
console.log(path.join(__dirname, './PlanCapture.json'))
console.log(config.google.projectId)

app.get('/',(req,res)=>res.send('Running'))
//https://dev.to/idiglove/file-upload-with-react-express-and-google-cloud-storage-with-folder-structure-2i5j

app.post('/', function(req, res, next) {
 
  //const storage = new Storage({projectId: 'plancapture', keyFilename: });

  const storage = new Storage({
		projectId: config.google.projectId,
		keyFilename: path.join(__dirname, 'PlanCapture.json'),
  });
  
  async function uploadFile(file, folder) {

    const bucket = storage.bucket(config.google.bucket)

    const newFileName = folder + '/' + file.originalname;

    let fileUpload = bucket.file(newFileName);
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
        res.status(200).json({
          data: {
            url: url,
          },
        });
    });

    blobStream.end(file.buffer);
  }

  upload(req, res, function(err) {
    let files = req.files

    for (let file in files) {
      uploadFile(files[file], req.body.folder)
    }

    if(err) {
        return res.end("Error uploading file." + err);
    }
    res.end("File is uploaded");
  });

});







