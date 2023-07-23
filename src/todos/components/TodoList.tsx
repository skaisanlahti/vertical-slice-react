import { useApp, useAppState } from "../../application/Application";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const app = useApp();
  const todos = useAppState(app.todos);

  return (
    <section className="todo_list">
      {todos.map((todo) => {
        return <TodoItem todo={todo} />;
      })}
    </section>
  );
}
