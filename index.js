const express = require('express');

const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3002',
    // origin: 'https://see-the-volume.herokuapp.com/',
  })
);

app.use(express.static(__dirname + '/homepage'));

app.use('/visualizer', express.static('./vis'));

app.use('/controller', express.static('./build'));

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + '/notFound.html');
});

let server = app.listen(process.env.PORT || 3002, () => {
  console.log('See the volume Server is running');
});

let io = require('socket.io')(server);

io.sockets.on('connection', socket => {
  // console.log('Client Connected: ' + socket.id);

  socket.on('mode', data => {
    // console.log(data);
    io.sockets.emit('mode', data);
  });

  socket.on('sensitivity', data => {
    // console.log(data);
    io.sockets.emit('sensitivity', data);
  });

  socket.on('checkid', data => {
    io.sockets.emit('checkid', data);
  });

  socket.on('sendinfo', data => {
    io.sockets.emit('sendinfo', data);
  });

  socket.on('disconnect', function() {
    // console.log('Client has disconnected');
    io.sockets.emit('sendinfo', {
      id: socket.id.substring(0, 4),
      mode: 'circle',
      sensitivity: 150,
      connected: false,
    });
  });
});
