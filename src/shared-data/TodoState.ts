import { BehaviorSubject } from "rxjs";

// shared data
export type Todo = {
  id: string;
  task: string;
  done: boolean;
};

export interface TodoStatePort {
  getTodos(): Todo[];
  setTodos(newTodos: Todo[]): void;
}

export class TodoStateAdapter implements TodoStatePort {
  public readonly todos = new BehaviorSubject<Todo[]>([]);

  public getTodos(): Todo[] {
    return this.todos.getValue();
  }

  public setTodos(newTodos: Todo[]): void {
    this.todos.next(newTodos);
  }
}
