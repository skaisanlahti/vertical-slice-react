import { State } from "../../library/State";
import { Todo } from "../data/Todo";

export class SaveTodos {
  public readonly error = new State("");

  public constructor(
    private readonly key: string,
    private readonly todos: State<Todo[]>
  ) {}

  public handle(): void {
    const todos = this.todos.get();
    let json: string;

    try {
      json = JSON.stringify(todos);
    } catch (error) {
      return this.error.set(`Failed to serialize todos: ${error}`);
    }

    try {
      localStorage.setItem(this.key, json);
      this.error.set("");
    } catch (error) {
      this.error.set(`Failed to save todos: ${error}`);
    }
  }
}
