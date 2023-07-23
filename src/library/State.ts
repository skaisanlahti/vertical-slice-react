export type Subscriber<T> = (state: T) => void;
export type Unsubscriber = () => void;
export class State<T> {
  private state: T;
  private readonly subscribers = new Set<Subscriber<T>>();

  public constructor(initialState: T) {
    this.state = initialState;
  }

  public get(): T {
    return this.state;
  }

  public set(nextState: T): void {
    this.state = nextState;
    this.notify(nextState);
  }

  public subscribe(subscriber: Subscriber<T>): Unsubscriber {
    subscriber(this.state);
    this.subscribers.add(subscriber);
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  private notify(value: T): void {
    for (const subscriber of this.subscribers) {
      subscriber(value);
    }
  }
}
