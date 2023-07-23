import { Theme } from "../styles/data/Theme";
import { TodoForm } from "../todos/components/TodoForm";
import { TodoList } from "../todos/components/TodoList";
import { useApp, useAppState } from "./Application";

export function App() {
  const app = useApp();
  const theme = useAppState(app.switchTheme.theme);

  function loadDefaults() {
    app.loadDefaultTodos.handle();
  }

  function switchTheme() {
    app.switchTheme.handle();
  }

  return (
    <main>
      <h1>Hello world</h1>
      <TodoForm />
      <TodoList />
      <button onClick={loadDefaults}>Defaults</button>
      <button onClick={switchTheme} style={{ textTransform: "capitalize" }}>
        {theme === Theme.Dark ? Theme.Light : Theme.Dark} theme
      </button>
    </main>
  );
}
