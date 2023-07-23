import { State } from "../../library/State";
import { createId } from "../../library/createId";
import { Todo } from "../data/Todo";

export class LoadDefaultTodos {
  private readonly DEFAULT_TODOS: Todo[] = [
    { id: createId(), task: "Shopping", done: false },
    { id: createId(), task: "Working", done: false },
    { id: createId(), task: "Studying", done: false },
    { id: createId(), task: "Cooking", done: false },
  ];

  public constructor(private readonly todos: State<Todo[]>) {}

  public handle(): void {
    this.todos.set(this.DEFAULT_TODOS);
  }
}
