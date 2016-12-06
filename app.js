var express = require('express');
var commandLineArgs = require('command-line-args');

// Parse the command line options
const optionDefinitions = [
  {name: "port", type: Number},
];
var options = commandLineArgs(optionDefinitions);

var app = express();
app.set('port', options.port || 5000);
app.use(express.static('public'));

app.listen(app.get('port'), function(err) {
    console.log('Server running on port ' + app.get('port'));
});
