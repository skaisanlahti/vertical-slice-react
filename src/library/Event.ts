import { Subscriber, Unsubscriber } from "./State";

export class Event<T> {
  public publish(message: T): void {
    this.notify(message);
  }

  public subscribe(subscriber: Subscriber<T>): Unsubscriber {
    this.subscribers.add(subscriber);
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  public dispose(): void {
    this.subscribers.clear();
  }

  private readonly subscribers = new Set<Subscriber<T>>();
  private notify(value: T): void {
    for (const subscriber of this.subscribers) {
      subscriber(value);
    }
  }
}
