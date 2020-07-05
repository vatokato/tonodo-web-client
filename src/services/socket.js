import io from 'socket.io-client';

export const getSocket = userId => Socket(userId);
export const removeSocket = () => {
  Socket.instance = null;
};

function Socket (userId) {
  if (!Socket.instance) {
    Socket.instance = io('http://localhost:3000', {
      query: {
        test: 1,
        userId
      }
    });
  }
  return Socket.instance;
}