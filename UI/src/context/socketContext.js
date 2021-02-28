import socketio from 'socket.io-client';
import {createContext} from 'react';
export const socket = socketio.connect('http://13.126.96.74:5000');
export const SocketContext = createContext();
