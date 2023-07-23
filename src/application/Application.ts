import { useSyncExternalStore } from "react";
import { State } from "../library/State";
import { createTypedContext } from "../library/createTypedContext";
import { SwitchTheme } from "../styles/procedures/SwitchTheme";
import { Todo } from "../todos/data/Todo";
import { AddTodo } from "../todos/procedures/AddTodo";
import { LoadDefaultTodos } from "../todos/procedures/LoadDefaultTodos";
import { LoadTodos } from "../todos/procedures/LoadTodos";
import { RemoveTodo } from "../todos/procedures/RemoveTodo";
import { SaveTodos } from "../todos/procedures/SaveTodos";
import { ToggleTodo } from "../todos/procedures/ToggleTodo";

export class Application {
  public readonly todos = new State<Todo[]>([]);
  public readonly addTodo = new AddTodo(this.todos);
  public readonly removeTodo = new RemoveTodo(this.todos);
  public readonly toggleTodo = new ToggleTodo(this.todos);
  public readonly loadDefaultTodos = new LoadDefaultTodos(this.todos);

  private readonly TODOS_STORAGE_KEY = "todos";
  public readonly loadTodos = new LoadTodos(this.TODOS_STORAGE_KEY, this.todos);
  public readonly saveTodos = new SaveTodos(this.TODOS_STORAGE_KEY, this.todos);

  public readonly switchTheme = new SwitchTheme();

  public constructor() {
    this.loadDefaultTodos.handle();
    this.loadTodos.handle();
    this.todos.subscribe(() => this.saveTodos.handle());
  }
}

export const [useApp, AppProvider, AppConsumer] =
  createTypedContext<Application>();

export function useAppState<T>(state: State<T>) {
  return useSyncExternalStore(
    (subscriber) => state.subscribe(subscriber),
    () => state.get()
  );
}
