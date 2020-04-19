const express = require('express')
const app = express()
app.listen(PORT=8080,e=>console.log(`listening ${PORT}: ${e || 'ok'}`))
const formidable = require('formidable')

app.post('/upload', (req, res) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error', err)
      throw err
    }
    console.log('Fields', fields)
    console.log('Files', files)
    for (const file of Object.entries(files)) {
      console.log(file)
    }
  })
  console.log('done')
})