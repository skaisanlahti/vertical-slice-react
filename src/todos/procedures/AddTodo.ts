import { Result, fail, ok } from "../../library/Result";
import { State } from "../../library/State";
import { createId } from "../../library/createId";
import { Todo } from "../data/Todo";

export class AddTodo {
  public readonly task = new State("");
  public readonly error = new State("");

  public constructor(private readonly todos: State<Todo[]>) {}

  public handle(): void {
    const task = this.task.get();
    const validation = this.validate(task);
    if (validation.isError) {
      return this.error.set(
        `Task validation failed: ${validation.error.message}`
      );
    }

    const todos = this.todos.get();
    const newTodo = this.create(task);
    const newTodos = this.add(todos, newTodo);

    this.todos.set(newTodos);
    this.task.set("");
    this.error.set("");
  }

  private validate(task: string): Result<string, Error> {
    if (task.length === 0) {
      return fail(new Error("too short"));
    }
    return ok(task);
  }

  private create(task: string): Todo {
    return { id: createId(), task, done: false };
  }

  private add(todos: Todo[], todo: Todo): Todo[] {
    return [...todos, todo];
  }
}
