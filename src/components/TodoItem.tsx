import { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { CSSTransition } from 'react-transition-group';
import { CheckIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number | null) => void;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, startEdit, editingId, updateTodo, todos, setTodos } = useContext(TodoContext);
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editType, setEditType] = useState(todo.type);

  const handleEdit = () => {
    setEditText(todo.text);
    setEditCategory(todo.category);
    setEditType(todo.type);
    startEdit(todo.id);
  };

  // 分页状态
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(todos.length / itemsPerPage);

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
              <div className="edit-form">
                <h3>
                  <span>编辑事项详情</span>
                </h3>
                <div className="edit-form-fields">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="编辑事项内容..."
                  />
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as Todo['category'])}
                  >
                    <option value="personal">个人事项</option>
                    <option value="work">工作事项</option>
                    <option value="shopping">购物事项</option>
                  </select>
                  <select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value as Todo['type'])}
                  >
                    <option value="basic">普通</option>
                    <option value="urgent">紧急</option>
                    <option value="important">重要</option>
                  </select>
                  <button
                    onClick={() => {
                      updateTodo(todo.id, editText, editCategory, editType);
                      startEdit(null);
                    }}
                    className="save-btn"
                  >
                    保存
                  </button>
                </div>
              </div>
          ) : (
            <>
              <span className={`todo-text todo-type-${todo.type}`}>{todo.text}</span>
              <span className={`category ${todo.category}`}>
                {todo.category === 'personal' ? '个人事项' :
                 todo.category === 'work' ? '工作事项' :
                 todo.category === 'shopping' ? '购物事项' : todo.category}
              </span>
              <span className={`type type-${todo.type}`}>
                {todo.type === 'basic' ? '普通' :
                 todo.type === 'urgent' ? '紧急' :
                 todo.type === 'important' ? '重要' : todo.type}
              </span>
            </>
          )}
        </div>
        <div className="todo-actions">
          <button 
            className="edit-btn"
            onClick={() => startEdit(todo.id)}
            aria-label="编辑事项"
          >
            <PencilIcon className="icon" />
          </button>
          <button 
            onClick={() => window.confirm('确定要删除这个待办事项吗？') && deleteTodo(todo.id)}
            className="delete-btn"
            aria-label="删除"
          >
            <TrashIcon className="icon" />
          </button>
        </div>
      </div>
    </CSSTransition>
  );
}
