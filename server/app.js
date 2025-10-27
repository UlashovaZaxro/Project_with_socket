import {createServer} from 'http';
import {Server} from 'socket.io';


const httpServer = createServer();
const io = new Server(httpServer, {
    cors: { origin: "http://localhost:3000",}
});

const usersSocket = {};

io.on('connection', (socket) => {
    socket.on('register', (userId) => {
        usersSocket[userId] = socket.id;
        console.log(usersSocket)
    });
    
    socket.on('newNotify', (message) => {
        const senderUserId = message.senderId;
        const senderUserName = message.senderName;        
        const recieverId = String(message.rec_id);
        console.log(message);
        const recieverSocketID = usersSocket[recieverId];
        io.to(recieverSocketID).emit('newNotify', `Your post was ${message.type}d by ${senderUserName}`);
    });

    socket.on("disconnect", () => {
        delete usersSocket[socket.id]
    });

});



httpServer.listen(4000, () => {
    console.log('server is on port🔥🚀 4000');
});