const fs = require('fs');
const path = require('path');

const visionText = (fileName, callBack) => {

  const callVision = async () => {
    console.log(fileName)
    // export GOOGLE_APPLICATION_CREDENTIALS=PlanCapture.json

    //export API_ENDPOINT = 'http://localhost:3000/
    //${process.env.REACT_APP_API_ENDPOINT}/`

    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    // const clientOptions = {apiEndpoint: 'eu-vision.googleapis.com'};
    const client = new vision.ImageAnnotatorClient({
      keyFilename: path.join(__dirname, '../PlanCapture.json'),
    });
  
    //const [result] = await client.textDetection(fileName, {language_hints: ["en"]});
    const [result] = await client.documentTextDetection(fileName);

    //document_text_detection
    //const detections = result.textAnnotations;
    //const detections = result;
    //const a = detections.textAnnotations[0].description
    //console.log(a)
    //console.log(detections.fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words[0].symbols[0].text)
    //console.log('Text:');
    //const [result] = await client.textDetection(fileName);
    //const detections = result.textAnnotations;
    //console.log('Text:');
    //detections.forEach(text => console.log(text));
    // Performs label detection on the image file
    // const [result] = await client.labelDetection(fileName);
    // const labels = result.labelAnnotations;
    // console.log('Labels:');
    // labels.forEach(label => console.log(label.description));

    const detections = result.textAnnotations;

    let data = detections.map(text => (
      {
        "text": text.description,
        "bounds": text.boundingPoly.vertices.map(vertex => ({
          "x": vertex.x,
          "y": vertex.y
        }))
      }
    ));
    callBack(data)
    
    //djson = JSON.stringify(djson, null, 2);
    //fs.writeFile(`${fileName}.json`, djson, (err) => {
    //    if (err) throw err;
    //    console.log('Data written to file');
    //});

    //console.log('vision complete');
    //console.log(data);
  } 

  console.log('vision called')

  fileName = fileName.replace(' ','_')

  const ext = path.extname(fileName);
  console.log(ext)
  if (['.tif','tiff'].includes(ext)){
    console.log('converting tif')
    

    const Jimp = require("jimp")
 
    Jimp.read(fileName, function (err, file) {
      if (err) {
        console.log(err)
      } else {
        fileName = fileName.replace(ext,'.jpg')
        console.log(fileName)
        file.write(fileName,
          callVision
        )
      }
    })

  } else {
    callVision()
  }
  
}

module.exports = visionText;

//visionText('junk/SP229975_0.jpg', x => console.log(x[0]))
//visionText('../SP133484.jpg', x => console.log(x[0]))
