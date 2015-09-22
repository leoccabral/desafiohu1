var cluster = require('cluster');
var cpus = require('os').cpus();

if (cluster.isMaster) {
    cpus.forEach(function(cpu) {
        cluster.fork();
    });
    cluster.on('listening', function(worker) {
        console.log("Cluster %d conectado", worker.process.pid);
    });

    cluster.on('disconnect', function(worker) {
        console.log('Cluster %d desconectado.', worker.process.pid);
    });

    cluster.on('exit', function(worker) {
        console.log('Cluster %d exit.', worker.process.pid);
    });
}
else {
    require('./server');
}