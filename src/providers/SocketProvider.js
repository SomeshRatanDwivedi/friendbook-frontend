import { createContext, useContext } from 'react';
import { io } from 'socket.io-client'
import { config } from '../utils/config';

const socketUrl=config.socket_url

const socket = io(socketUrl);

const SocketContext=createContext(socket);

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider=({children})=>{
    return <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
}

