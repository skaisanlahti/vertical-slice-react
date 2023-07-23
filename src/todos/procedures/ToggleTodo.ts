import { State } from "../../library/State";
import { Todo } from "../data/Todo";

export class ToggleTodo {
  public constructor(private readonly todos: State<Todo[]>) {}

  public handle(todoOrId: Todo | string): void {
    const todos = this.todos.get();
    const id = typeof todoOrId === "string" ? todoOrId : todoOrId.id;
    const newTodos = this.toggle(todos, id);
    this.todos.set(newTodos);
  }

  private toggle(todos: Todo[], id: string): Todo[] {
    return todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  }
}
