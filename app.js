// This test will hit localhost:8080 with 20 concurrent connections for 10 minutes.
    var http = require('http'),
        nl = require('nodeload');

    http.createServer(function (req, res) { res.writeHead(200); res.end(); }).listen(8080);
    console.log("Server to load test listening on 8080.");

    var loadtest = nl.run({
        name: 'Example',
        host: 'localhost',
        port: 9000,
        numClients: 20,
        timeLimit: 600,
        targetRps: 200,
        stats: ['latency', 'result-codes', { name: 'http-errors', successCodes: [200], log: 'http-errors.log' }],
        requestGenerator: function(client) {
            return client.request('GET', "/" + Math.floor(Math.random()*10000));
        }
    });
    loadtest.on('end', function() { process.exit(0); });