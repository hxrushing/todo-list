import { useContext } from 'react';
import { TodoContext } from './contexts/TodoContext';
import './App.css';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { FilterControls } from './components/FilterControls';
import { ThemeToggle } from './components/ThemeToggle';
import { useTodoContext } from './hooks/useTodoContext';

export function App() {
  const { filteredTodos, theme } = useTodoContext();

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <h1>待办事项清单</h1>
        <ThemeToggle />
        <TodoForm />
        <FilterControls />
        <div className="todo-list">
          {filteredTodos.map((todo: any) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App
