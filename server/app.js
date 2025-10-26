import {createServer} from 'http';
import {Server} from 'socket.io';


const httpServer = createServer();
const io = new Server(httpServer, {

});


io.on('connection', (socket) => {
    console.log(socket);  
});

httpServer.listen(4000, () => {
    console.log('listening on *:4000');
});