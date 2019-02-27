const express = require('express');

const cors = require('cors');

const app = express();

// app.use(
//   cors({
//     origin: 'http://10.147.140.5:3002',
//     // origin: 'http://localhost:3002',
//   })
// );

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/vis', express.static('vis'));

app.use('/con', express.static('./build'));

let server = app.listen(() => {
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
