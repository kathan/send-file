var FormData = require('form-data'),
    http = require('http'),
    fs = require('fs'),
    sendFile = function(url, file, data, callback){
      if(typeof data === 'function'){
        callback = data;
        data = {};
      }

      if(fs.existsSync(file)){
        var form = new FormData();
        for(var i in data){
          form.append(i, data[i]);
        }
        form.append('file', fs.createReadStream(file));
        //form.getHeaders({'Content-Type', ''});
        form.submit(url, function(err, reply) {
          if(err){return callback(err, false, reply);}
          if(reply.statusCode === 200){
            return callback(null, true, reply);
          }
          reply.resume(); // for node-0.10.x 
          return callback(null, false, reply);
        });
      }else{
        return callback(`${file} does not exist.`, false);
      }
    };
    
module.exports = sendFile;