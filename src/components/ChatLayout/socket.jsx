import { host } from '../../utils/apiRoutes'
import { io } from "socket.io-client";

export const socket =  io(host, {
    transports: ['websocket']
  });
