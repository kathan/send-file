const FormData = require('form-data');
const fs = require('fs');
const sendFile = function(url, files, data, callback){
  if(typeof data === 'function'){
    callback = data;
    data = {};
  }

  var form = new FormData();
  for(var i in data){
    form.append(i, data[i]);
  }
  if(Array.isArray(files)){
    for(var i in files){
      if(fs.existsSync(files[i])){
        //console.log(`Appending files[i]`);
        form.append('file'+i, fs.createReadStream(files[i]));
      }else{
        return callback(`${files[i]} does not exist.`, false);
      }
    }
  }else{
    if(fs.existsSync(files)){
      form.append('file', fs.createReadStream(files));
    }else{
      return callback(`${files} does not exist.`, false);
    }
  }
  form.submit(url, function(err, reply) {
    if(err){return callback(err, false, reply);}
    if(reply.statusCode === 200){
      return callback(null, true, reply);
    }
    //reply.end(); // for node-0.10.x 
    return callback(null, false, reply);
  });
};
    
module.exports = sendFile;