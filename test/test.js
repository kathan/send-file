const sendFile = require('../index.js');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const formidable = require('formidable');
const app = express();
const port = 4536;

//==== Start Server ====
app.use((req, res, next)=>{
  if (req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    //console.log('Server received post. Parsing files...');
    form.parse(req, function(err, fields, files) {
      if(err){return;}
      req.body = fields;
      //req.files = files;
      var files_obj = {};
      for(var i in Object.keys(files)){
        files_obj[i] = fs.readFileSync(files[i].path);
        //files_obj[i] = fs.createReadStream(files[i].path);
      }
      req.files = files_obj;
      console.log(files_obj);
      next();
    });
    return;
  }
  next();
});

app.post('*', (req, res) => {
  console.log({file_name: req.files.file.name});
  res.send('Success!');
});

var server = app.listen(port, () => {
  //console.log(`Test app listening on port ${port}!`);
  //==== Send File ====
  sendFile(`http://localhost:${port}`, path.resolve(__dirname, 'big.file'), (err, result, reply)=>{
    if(reply.statusCode === 200){
      console.log('Success!');
    }else{
      console.log('Error!', reply.statusCode);
    }
    //==== Close server ====
    server.close();
  });
});