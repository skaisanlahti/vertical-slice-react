import { Subscriber, Unsubscriber } from "./State";

export class Event<T> {
  private readonly subscribers = new Set<Subscriber<T>>();

  public publish(message: T): void {
    this.notify(message);
  }

  public subscribe(subscriber: Subscriber<T>): Unsubscriber {
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
