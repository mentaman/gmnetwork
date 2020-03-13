const net = require('net');
const PORT = 3002;
const server = net.createServer();

server.on('error', (err) => {
    // Handle errors here.
    console.log("server error", err);
    throw err;
});
  
server.on('connection', (socket) => {
    console.log("a user connected");
    let interval = null;
    
    socket.on('data', (data) => {
        console.log("recieved data back");
        console.log(data.toString('utf8'));
    });
    socket.on('end', () => {
        console.log('socket end');
        clearInterval(interval);
    });
    socket.on('close', () => {
        console.log('socket close');
        clearInterval(interval);
    });
    socket.on('error', (e) => {
        console.log("socket error", e);
    });
    socket.write('awesome!');

    interval = setInterval(() => {
        try {
            socket.write('awesome!');
        } catch(e) {
            console.log("failed sending message");
        }
        
    }, 1000);
})

server.listen(3002, () => {
    console.log('opened server on', server.address());
});