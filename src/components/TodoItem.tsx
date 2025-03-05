import { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { CSSTransition } from 'react-transition-group';
import { CheckIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, startEdit, editingId, updateTodoText } = useContext(TodoContext);
  const [editText, setEditText] = useState(todo.text);
  
  return (
    <CSSTransition timeout={300} classNames="todo-item-animation">
      <div className={`todo-item ${todo.completed ? 'completed' : ''}`} data-testid="todo-item">
        <div className="todo-content">
          <button 
            onClick={() => toggleTodo(todo.id)} 
            className={`check-btn ${todo.completed ? 'checked' : ''}`}
            aria-label={todo.completed ? "标记未完成" : "标记完成"}
          >
            <CheckIcon className="icon" />
          </button>
          {editingId === todo.id ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="edit-input"
              onBlur={() => {
                updateTodoText(todo.id, editText);
                startEdit(null);
              }}
              autoFocus
            />
          ) : (
            <span className="todo-text">{todo.text}</span>
          )}
          <span className={`category ${todo.category}`}>{todo.category}</span>
        </div>
        <div className="todo-actions">
          <button 
            className="edit-btn"
            onClick={() => startEdit(todo.id)}
            aria-label="编辑事项"
          >
            {editingId === todo.id ? (
              <PencilIcon className="icon active" />
            ) : (
              <PencilIcon className="icon" />
            )}
          </button>
          <button 
            onClick={() => window.confirm('确定删除吗？') && deleteTodo(todo.id)}
            className="delete-btn"
            aria-label="删除事项"
          >
            <TrashIcon className="icon" />
          </button>
        </div>
      </div>
    </CSSTransition>
  );
}
