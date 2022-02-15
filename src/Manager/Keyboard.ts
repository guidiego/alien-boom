class Keyboard {
  private keysPressed: string[] = [];
  constructor() {
    window.addEventListener('keydown', (e) => {
      if (this.keysPressed.indexOf(e.code) === -1) {
        this.keysPressed.push(e.code);
      }
    })

    window.addEventListener('keyup', (e) => {
      const mayIdx = this.keysPressed.indexOf(e.code);
      if (mayIdx > -1) {
        this.keysPressed = [...this.keysPressed.slice(0, mayIdx), ...this.keysPressed.slice(mayIdx + 1, this.keysPressed.length)];
      }
    })
  }

  isEveryPressed(...keys: string[]) {
    return keys.every(this.isPressed.bind(this));
  }

  isSomePressed(...keys: string[]) {
    return keys.some(this.isPressed.bind(this));
  }

  isPressed(key) {
    return this.keysPressed.indexOf(key) > -1;
  }
}

export default new Keyboard();
