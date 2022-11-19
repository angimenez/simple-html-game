const SOCKET_URL = "http://localhost:3000";

const socket = io(SOCKET_URL, { autoconnect: true });

socket.connect();

const getSocketLatency = () =>
  new Promise((resolve, reject) => {
    if (!socket) reject("Socket object is needed");
    const prevTime = Date.now();
    socket.emit("ping", (pong) => {
      const lastTime = Date.now();
      const latency = (lastTime - prevTime) / 1000;
      console.log(pong, latency);
      resolve(latency);
    });
  });

getSocketLatency();

const emitData = (data) => {
  socket.emit("updateStatus", data);
};

const addSocketListener = (evt, callback) => {
  socket.on(evt, callback);
};

const joinGame = (roomId) =>
  new Promise((resolve, reject) => {
    socket.emit("joinGame", roomId, (arrObj, idObj, err) => {
      if (err) {
        reject(err);
      }
      resolve({ arrObj, idObj });
    });
  });
