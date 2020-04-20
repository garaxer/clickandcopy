const fs = require('fs');
const path = require('path');

const visionText = async (fileName, callBack) => {
  console.log(fileName)
  // export GOOGLE_APPLICATION_CREDENTIALS=PlanCapture.json
  // process.env.REACT_APP_API_ENDPOINT
  //export API_URL='http://localhost:3000/'
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
  //console.log(detections.fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words[0].symbols[0].text)

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
  await callBack(data)
  console.log('vision called')
}


//fileName = fileName.replace(' ','_')
const tiftojpg = () => {
  const ext = path.extname(fileName);
  console.log(ext)
  if (['.tif','.tiff'].includes(ext)){
    console.log('converting tif')
    
    const Jimp = require("jimp")
  
    Jimp.read(fileName, function (err, file) {
      if (err) {
        console.log(err)
      } else {
        console.log(fileName);
        fileName = path.basename(fileName).replace(ext,'.jpg')
        console.log(fileName);
        file.write(fileName,
          callVision
        )
      }
    })
  } else {
    callVision()
  }
  //djson = JSON.stringify(djson, null, 2);
  //fs.writeFile(`${fileName}.json`, djson, (err) => {
  //    if (err) throw err;
  //    console.log('Data written to file');
  //});

  //console.log('vision complete');
  //console.log(data); 
}

module.exports = visionText;



//visionText('junk/SP229975_0.jpg', x => console.log(x[0]))
//visionText('../SP133484.jpg', x => console.log(x[0]))
