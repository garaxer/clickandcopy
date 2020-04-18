async function quickstart(fileName) {
  // export GOOGLE_APPLICATION_CREDENTIALS=PlanCapture.json
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  // const clientOptions = {apiEndpoint: 'eu-vision.googleapis.com'};
  const client = new vision.ImageAnnotatorClient();
 
  //const [result] = await client.textDetection(fileName, {language_hints: ["en"]});
  const [result] = await client.documentTextDetection(fileName);

  //document_text_detection
  //const detections = result.textAnnotations;
  const detections = result;
  const a = detections.textAnnotations[0].description
  console.log(a)
  //console.log(detections.fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words[0].symbols[0].text)
  //console.log('Text:');

  detections.textAnnotations.forEach(text => console.log(text));


  //const [result] = await client.textDetection(fileName);
  //const detections = result.textAnnotations;
  //console.log('Text:');
  //detections.forEach(text => console.log(text));
  // Performs label detection on the image file
  // const [result] = await client.labelDetection(fileName);
  // const labels = result.labelAnnotations;
  // console.log('Labels:');
  // labels.forEach(label => console.log(label.description));
}

quickstart('SP229975_0.jpg')