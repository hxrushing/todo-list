import { useContext } from 'react';
import { TodoContext } from './contexts/TodoContext';
import './App.css';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { FilterControls } from './components/FilterControls';
import { ThemeToggle } from './components/ThemeToggle';
import { Pagination } from './components/Pagination';
import type { Todo } from './types/todo';
import { useTodoContext } from './hooks/useTodoContext';

export function App() {
  const { 
    paginatedTodos,
    theme,
    startEdit,
    deleteTodo,
    toggleTodo,
    currentPage,
    goToPage,
    totalPages
  } = useTodoContext();

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <h1>待办事项清单</h1>
        <ThemeToggle />
        <TodoForm />
        <FilterControls />
        <div className="todo-list">
          {paginatedTodos.map((todo: Todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={startEdit}
            />
          ))}
        </div>
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
}

export default App
