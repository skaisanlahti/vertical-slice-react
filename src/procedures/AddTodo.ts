import { BehaviorSubject } from "rxjs";
import { Todo, TodoStatePort } from "../shared-data/TodoState";
import { Result, fail, ok } from "../utils/Result";
import { createId } from "../utils/createId";

export interface AddTodoStatePort {
  getTask(): string;
  setTask(task: string): void;
  setTaskError(error: string): void;
  setHandlerError(error: string): void;
  setIsLoading(isLoading: boolean): void;
}

export class AddTodoStateAdapter implements AddTodoStatePort {
  public readonly task = new BehaviorSubject("");
  public readonly taskError = new BehaviorSubject("");
  public readonly handlerError = new BehaviorSubject("");
  public readonly isLoading = new BehaviorSubject(false);

  public getTask(): string {
    return this.task.getValue();
  }

  public setTask(task: string): void {
    this.task.next(task);
  }

  public setTaskError(error: string): void {
    this.taskError.next(error);
  }

  public setHandlerError(error: string): void {
    this.handlerError.next(error);
  }

  public setIsLoading(isLoading: boolean): void {
    this.isLoading.next(isLoading);
  }
}

export class AddTodoHandler {
  public constructor(
    private readonly todoState: TodoStatePort,
    private readonly handlerState: AddTodoStatePort
  ) {}

  public handle() {
    const task = this.handlerState.getTask();
    const todos = this.todoState.getTodos();

    const validation = this.validateTask(task);
    if (validation.isError) {
      return this.handlerState.setTaskError(validation.error.message);
    }

    const newTodo = this.createTodo(task);
    const newTodos = this.addTo(todos, newTodo);
    this.todoState.setTodos(newTodos);
  }

  private validateTask(task: string): Result<string, Error> {
    if (task.length === 0) {
      return fail(new Error("too short"));
    }
    return ok(task);
  }

  private createTodo(task: string): Todo {
    return { id: createId(), task, done: false };
  }

  private addTo(todos: Todo[], todo: Todo): Todo[] {
    return [...todos, todo];
  }
}
