var fs = require('fs');

function roll_up_js(filename) {
  var src = fs.readFileSync(__dirname + '/' + filename, 'utf8');
  return src.replace(/require\('(.*?)'\);/g, function(match, p1) {
    return '(function(exports) {var module={exports:exports};' + roll_up_js(p1) + ' return module.exports;})({});';
  });
}

console.log('<html><head><style>' + fs.readFileSync(__dirname + '/usbbarev0.css', 'utf8'));
console.log('</style><script>');
if (process.argv > 2) {
  console.log(fs.readFileSync(process.argv[2], 'utf8'));
} else {
  console.log("rawpcapdata = null;");
}
console.log('</script><script>' + roll_up_js('/usbbarev0.js'));
console.log('</script><body></body></html>');
