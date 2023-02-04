const SOCKET_URL = "http://192.168.1.142:3000";

const socket = io(SOCKET_URL, { autoconnect: true });

socket.connect();

let latency = 0;

const getSocketLatency = () =>
  new Promise((resolve, reject) => {
    if (!socket) reject("Socket object is needed");
    const prevTime = Date.now();
    socket.emit("ping", (pong) => {
      const lastTime = Date.now();
      latency = (lastTime - prevTime) / 1000;
      resolve(latency);
    });
  });

getSocketLatency();

const emitData = (data) =>
  new Promise((resolve, reject) => {
    if (!socket) reject("Socket object is needed");
    const prevTime = Date.now();
    socket.emit("updateStatus", data, () => {
      const lastTime = Date.now();
      latency = lastTime - prevTime;
      resolve();
    });
  });

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
