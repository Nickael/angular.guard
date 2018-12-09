const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {

  let users = [];
    console.log('user connected\n\n');

    socket.on('disconnect', () => {
        console.log('user disconnected\n\n');
    });
    socket.on('message', (message) => {
        console.log(message, '\n\n');
        const regex = /[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/gm;
        console.log(message.length);
        if (message.length == 38) {
          console.log(message, '\n\no\n\n');
        }
        io.emit('message', message);
    });
});

const port = process.env.PORT || 8080;
http.listen(port, () => {
    console.log('Server runing on : http://localhost:' + port);
});
