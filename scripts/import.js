#!/usr/bin/env node

var http = require('http'),
  fs = require('fs');

var options = process.argv.slice(2),
    dir = '../files/',
    name = 'default',
    ext = 'txt',
    urlPath = './prueba.txt';

if( options.length == 3 ){
  urlPath = options[0];
  name = options[1];
  ext = options[2];
}else if( options.length == 2 ){
  urlPath = options[0];
  name = options[1];
}else if( options.length == 1 ){
  urlPath = options[0];
}

var file = fs.createWriteStream(dir+name+'.'+ext),
  request = http.request(urlPath,function(res){
    res.pipe(file);
  });

request.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

request.end();