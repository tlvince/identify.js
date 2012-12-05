var fs = require('fs');
var identify = require('../lib/identify');

var html = fs.readFileSync('index.html').toString();
console.log(identify(html));
