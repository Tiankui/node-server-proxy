var cluster = require('cluster');

module.exports = function (callback) {

    if (cluster.isMaster) {

        var cpuCount = require('os').cpus().length;

        for (var i = 0; i < cpuCount; i++) {
            cluster.fork();
        }

        cluster.on('exit', function (worker) {
            console.log('Worker ' + worker.id + ' died!!!!');
            cluster.fork();
        });

    } else {
        callback();
        console.log('Worker ' + cluster.worker.id + ' runing!');
    }
};
