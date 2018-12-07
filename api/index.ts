const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {

  let users = [];
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('message', (message) => {
        console.log('MESSAGE : ' + message);
        console.log(message);
        io.emit('message', message);
    });
});

const port = process.env.PORT || 8080;
http.listen(port, () => {
    console.log('Server runing on : http://localhost:' + port);
});
