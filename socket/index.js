var os = require('os');
module.exports = function (server) {
    var io = require('socket.io').listen(server);
    io.sockets.on('connection', function (socket) {
        console.log("Connection " + socket.id + " accepted.");
        var sysinfoInterval = setInterval(function () {
            var sysinfo = {'hostname': os.hostname(),
                'systemtype': os.type(),
                'release': os.release(),
                'uptime': os.uptime(),
                'loadavg': os.loadavg(),
                'totalmem': os.totalmem(),
                'freemem': os.freemem(),
                'cpus': os.cpus(),
                'disk': ''
            };
            io.sockets.emit('sysinfo', sysinfo);
        }, 10000);
        socket.on('message', function (message) {
            console.log("Received message: " + message + " - from client " + socket.id);

        });
        socket.on('disconnect', function () {
            clearInterval(sysinfoInterval);
            console.log("Connection " + socket.id + " terminated.");
        });
    });

    io.sockets.on('connection', function (socket) {
        console.log("Connection1 " + socket.id + " accepted.");
        socket.on('message', function (message) {
            console.log("Received message: " + message + " - from client " + socket.id);

        });
        socket.on('disconnect', function () {
            console.log("Connection " + socket.id + " terminated.");
        });
    });
};
