let baseTime = (new Date()).getTime();
export let deltaTime;
export let time;

export const getFormatedCounter = () => {
  if (!time) {
    return '00:00';
  } else if (time < 60) {
    return '0' + (time / 100).toFixed(2).replace('.', ':');
  } else {
    const secs = time % 60;
    const min = Math.floor(time / 60);

    return `${min < 10 ? '0' + min : min}:${secs < 10 ? '0' + secs : secs}`;
  }
}

export const setStartTime = () => {
  baseTime = (new Date()).getTime() / 1000;
}

export const setDeltaTime = (_deltaTime: number) => {
  time = (new Date()).getTime() / 1000 - baseTime;
  deltaTime = _deltaTime;
}
