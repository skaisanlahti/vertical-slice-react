import { State } from "../../library/State";
import { Todo } from "../data/Todo";

export class RemoveTodo {
  public constructor(private readonly todos: State<Todo[]>) {}

  public handle(todoOrId: Todo | string): void {
    const todos = this.todos.get();
    const id = typeof todoOrId === "string" ? todoOrId : todoOrId.id;
    const newTodos = this.remove(todos, id);
    this.todos.set(newTodos);
  }

  private remove(todos: Todo[], id: string): Todo[] {
    return todos.filter((t) => t.id !== id);
  }
}
