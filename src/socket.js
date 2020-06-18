import io from 'socket.io-client';
import { API_URL } from "./constants";

export const getSocket = userId => Socket(userId);
export const removeSocket = () => {
  Socket.instance = null;
};

function Socket (userId) {
  if (!Socket.instance) {
    Socket.instance = io(API_URL, {
      query: {
        userId
      }
    });
  }
  return Socket.instance;
}