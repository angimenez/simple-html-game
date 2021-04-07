let then, interval, fps, time, seconds, deltaTime;

const updateDeltaTime = () => {
  let currentTime = Date.now();
  deltaTime = currentTime - then;
  then = currentTime;
  time += deltaTime;
  if (time / 1000 >= 1) {
    fps = parseInt(1000 / deltaTime);
    time = 0;
    seconds ++;
  }
};

const initializeTime = () => {
  then = Date.now();
  deltaTime = 0;
  fps = 0;
  time = 0;
  seconds = 0;
};
