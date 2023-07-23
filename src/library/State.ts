export type Subscriber<T> = (state: T) => void;
export type Unsubscriber = () => void;
export class State<T> {
  private state: T;
  private disposed = false;
  private readonly subscribers = new Set<Subscriber<T>>();

  public constructor(initialState: T) {
    this.state = initialState;
  }

  public get(): T {
    if (this.disposed) {
      throw new Error("State has been disposed.");
    }
    return this.state;
  }

  public set(nextState: T): void {
    if (this.disposed) {
      throw new Error("State has been disposed.");
    }
    this.state = nextState;
    this.notify(nextState);
  }

  public subscribe(subscriber: Subscriber<T>): Unsubscriber {
    if (this.disposed) {
      throw new Error("State has been disposed.");
    }
    subscriber(this.state);
    this.subscribers.add(subscriber);
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  public dispose(): void {
    this.disposed = true;
    this.subscribers.clear();
  }

  private notify(value: T): void {
    for (const subscriber of this.subscribers) {
      subscriber(value);
    }
  }
}
