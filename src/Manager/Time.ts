let baseTime = (new Date()).getTime();
export let deltaTime;
export let time;

export const setStartTime = () => {
  baseTime = (new Date()).getTime() / 1000;
}

export const setDeltaTime = (_deltaTime: number) => {
  time = (new Date()).getTime() / 1000 - baseTime;
  deltaTime = _deltaTime;
}
