"use client"
import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

function useSocket(URL: string) {
    const socket = useRef<null | Socket>(null)

    useEffect(() => {
        socket.current = io(URL);

        return () => {
            socket.current?.disconnect()
        }

    }, [])

    return socket
}

export default useSocket