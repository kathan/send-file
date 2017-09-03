/*
curl -X POST -v -F key=141AA6BE613466174965CCE30C0F0EA63543131C7F8633FFE4E092BD9914322B -F 'products=["1A123","1A126"]' -F asset=@/Users/avddk/Desktop/error.png http://qaxstbap001.qa2-sap.grainger.com:8080
*/
const http = require('http');
const fileUpload = require('express-fileupload');
const express = require('express');
const app = express();
const port = 8080;

app.post('*', (req, res) => {
  res.send({body: req.body, file_name: req.files.name});
})

app.listen(port, () => {
  console.log(`Test app listening on port ${port}!`)
})

