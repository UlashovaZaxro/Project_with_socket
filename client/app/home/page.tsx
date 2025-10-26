"use client"
import useSocket from '@/hooks/useSocket'

const SERVER_URL = {
    URL: 'http://localhost:4000'
}

function ProfilePage() {
    const socket = useSocket(SERVER_URL.URL)
    return <h1 className='text-9xl'>Home Page</h1>
}

export default ProfilePage