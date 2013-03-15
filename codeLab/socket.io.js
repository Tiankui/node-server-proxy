var io = require('socket.io').listen(4000);

io.sockets.on('connection',function (content) {
  console.log(content);
});
