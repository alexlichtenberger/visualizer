const express = require('express');

const app = express();

app.use('/vis', express.static('public'));

app.use('/con', express.static('./controller/build'));

let server = app.listen(3002, () => {
  console.log('Running on port 3002');
});

let io = require('socket.io')(server);

io.sockets.on('connection', socket => {
  console.log('Client Connected: ' + socket.id);

  socket.on('mode', data => {
    console.log(data);
    io.sockets.emit('mode', data);
  });

  socket.on('sensitivity', data => {
    console.log(data);
    io.sockets.emit('sensitivity', data);
  });

  socket.on('disconnect', function() {
    console.log('Client has disconnected');
  });
});
