const express = require('express');

const cors = require('cors');

const app = express();

app.use(
  cors({
    // origin: 'http://localhost:3002',
    origin: 'https://see-the-volume.herokuapp.com/',
  })
);

app.get('/', express.static('./homepage'));

app.use('/vis', express.static('./vis'));

app.use('/con', express.static('./build'));

let server = app.listen(process.env.PORT || 3002, () => {
  console.log('See the volume Server is running');
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
