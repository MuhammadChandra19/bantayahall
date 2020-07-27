import { Input } from "antd";

export class Timer {
  public times: Array<number>;
  public time: number;
  private running: boolean;
  private display: Input;
  constructor(display: Input) {
    this.times = [0, 1, 0];
    this.display = display;
    this.print();
  }

  public reset(): void {
    this.times = [0, 1, 0];
  }

  private calculate(): void {
    if (this.times[2] >= 100) {
      this.times[1] += 1;
      this.times[2] -= 100;
    }
    if (this.times[1] >= 60) {
      this.times[0] += 1;
      this.times[1] -= 60;
    }
    this.times[2] += 1;
  }

  public start(): void {
    if (!this.time) {
      this.time = performance.now();
    }
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }
  }

  private step(timestamp: number): void {
    if (!this.running) return;
    this.calculate();
    this.time = timestamp;
    this.print();
    requestAnimationFrame(this.step.bind(this));
  }

  public stop(): void {
    this.running = false;
    this.time = null;
  }

  private print(): void {
    const addZero = this.times[1] < 10
    this.display.input.value = `${this.times[0]}: ${addZero ? 0 : ''}${this.times[1]}`
  }
}