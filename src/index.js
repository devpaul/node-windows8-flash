var express = require('express');
var fs = require('fs');

function createServerCmd() {
    var server = express();
    registerMiddleware(server);
    registerEndpoints(server);
    return server;
}

function registerMiddleware(server) {
    server.use(express.methodOverride());
    server.use(server.router);
    server.use(function(err, req, res, next) {
        res.status(400);
        res.send(err);
    });
}

function registerEndpoints(server) {
    server.get('/', function(req, res) {
        res.set('X-UA-Compatible', 'requiresActiveX=true');
        res.send('hi');
    });
    server.get('/meta', function(req, res) {
        fs.readFile('./src/index.html', function(err, data) {
            if(err) {
                console.error("Could not open file: %s", err);
                process.exit(1);
            }

            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(data);
            res.end();
        });

    });

}

function startServerCmd(server) {
    server.listen(8111);
}

var server = createServerCmd();
startServerCmd(server);
