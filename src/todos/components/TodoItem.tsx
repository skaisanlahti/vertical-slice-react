import { useApp } from "../../application/Application";
import { Todo } from "../data/Todo";

type Props = { todo: Todo };
export function TodoItem({ todo }: Props) {
  const app = useApp();

  function remove(id: string) {
    return () => {
      app.removeTodo.handle(id);
    };
  }
  return (
    <p className="todo_list-item" key={todo.id} onClick={remove(todo.id)}>
      {todo.task}
    </p>
  );
}
