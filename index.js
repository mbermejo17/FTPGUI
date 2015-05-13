var formidable = require('formidable'),
    Client = require('ftp'),
    http = require('http'),
    util = require('util');
 
http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload 
    var form = new formidable.IncomingForm();
    form.uploadDir = "upload"; 
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
    return;
   } 
  if (req.url == '/') {
     var c = new Client();

     var connectionProperties = {
    host: "",
    user: "",
    password: ""
};
     c.on('ready', function() {
      c.list(function(err, list) {
        if (err) throw err;
        console.dir(list);
        c.end();
      });
    });
    // connect to localhost:21 as anonymous 

    c.connect(connectionProperties);
  }
  // show a file upload form 
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);

