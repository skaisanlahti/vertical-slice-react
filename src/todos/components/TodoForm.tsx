import { ChangeEvent, FormEvent } from "react";
import { useApp, useAppState } from "../../application/Application";

export function TodoForm() {
  const app = useApp();
  const task = useAppState(app.addTodo.task);

  function submit(e: FormEvent) {
    e.preventDefault();
    app.addTodo.handle();
  }

  function setTask(e: ChangeEvent<HTMLInputElement>) {
    app.addTodo.task.set(e.currentTarget.value);
  }

  return (
    <form className="todo_form" onSubmit={submit}>
      <input className="todo_form-input" value={task} onChange={setTask} />
      <button className="todo_form-submit" type="submit">
        Submit
      </button>
    </form>
  );
}
