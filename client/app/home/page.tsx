"use client"
import useSocket from '@/hooks/useSocket'


const SERVER_URL = {
    URL: 'http://localhost:4000'
}

function ProfilePage() {
    const socket = useSocket(SERVER_URL.URL)

    const sendMessage = () => {
        socket.current?.emit('newMessage', 'Hello from client!')
    };

    return (
        <button onClick={sendMessage} className="px-6 py-3 bg-red-400">Send message</button>
    );
}

export default ProfilePage