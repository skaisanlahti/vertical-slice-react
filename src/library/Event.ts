import { Subscriber, Unsubscriber } from "./State";

export class Event<T> {
  private disposed = false;
  private readonly subscribers = new Set<Subscriber<T>>();

  public publish(message: T): void {
    if (this.disposed) {
      throw new Error("Event has been disposed.");
    }
    this.notify(message);
  }

  public subscribe(subscriber: Subscriber<T>): Unsubscriber {
    if (this.disposed) {
      throw new Error("Event has been disposed.");
    }
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
