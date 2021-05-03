import io from "socket.io-client";
var connectionOptions =  {
    "force new connection" : false,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 100000000000000000,                  
    "transports" : ["websocket"]
  };
  
const ENDPOINT = "http://127.0.0.1:3001";

export const socket = io.connect(ENDPOINT, connectionOptions);