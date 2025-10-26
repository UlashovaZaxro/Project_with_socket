import {createServer} from 'http';
import {Server} from 'socket.io';


const httpServer = createServer();
const io = new Server(httpServer, {
    cors: { origin: "http://localhost:3000",}
});


io.on('connection', (socket) => {
    socket.on('newMessage', (msg) => {
        console.log(msg);
    });
});

httpServer.listen(4000, () => {
    console.log('server is on port🔥🚀 4000');
});