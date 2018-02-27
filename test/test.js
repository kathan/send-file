const sendFile = require('../index.js');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 4536;

//==== Start Server ====
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(fileUpload());
app.post('*', (req, res) => {
  console.log({file_name: req.files.file.name, data: req.files.file.data.toString()});
  res.send('Success!');
});

var server = app.listen(port, () => {
  console.log(`Test app listening on port ${port}!`);
  //==== Send File ====
  sendFile(`http://localhost:${port}`, path.resolve(__dirname, 'test.file'), (err, result, reply)=>{
    if(reply.statusCode === 200){
      console.log('Success!');
    }else{
      console.log('Error!', reply.statusCode);
    }
    //==== Close server ====
    server.close();
  });
});