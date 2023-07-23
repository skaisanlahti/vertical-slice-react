import { State } from "../../library/State";
import { Todo } from "../data/Todo";

export class LoadTodos {
  public readonly error = new State("");

  public constructor(
    private readonly key: string,
    private readonly todos: State<Todo[]>
  ) {}

  public handle(): void {
    const json = localStorage.getItem(this.key);
    if (!json) {
      return this.error.set("No todos found.");
    }

    try {
      const todos: Todo[] = JSON.parse(json);
      this.todos.set(todos);
    } catch (error) {
      this.error.set(`Failed to deserialize todos: ${error}`);
    }
  }
}
