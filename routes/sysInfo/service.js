var os = require('os');
module.exports = function (req, res, next) {
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
    req.data = sysinfo;
    next();
}