var running = 0;
var subdomain = __filename.split('.')[1];
var watching = 's.' + subdomain + '.gabbyville.com'
var process = require('process');
process.chdir('s.' + subdomain + '.gabbyville.com');
require('chokidar').watch('.', {
    ignored: /[\/\\]\./
}).on('all', function (event, path) {
    if (!running) {
        running = 1;
        var exec = require('child_process').exec;
        exec('..\\mk\\bin\\meteor-kitchen main.json ../' + subdomain + '.gabbyville.com', function (error, stdout, stderr) {
            console.log(stdout);
            running = 0;
        });
    }
});