import { useState, useContext, useEffect } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Todo } from '../types/todo';

interface TodoFormProps {
  editTodo?: Todo;
  onClose?: () => void;
}

export function TodoForm({ editTodo, onClose }: TodoFormProps) {
  const { addTodo, updateTodo } = useContext(TodoContext)!;
  const [text, setText] = useState(editTodo?.text || '');
  const [category, setCategory] = useState<Todo['category']>(editTodo?.category || 'personal');
  const [type, setType] = useState<Todo['type']>(editTodo?.type || 'basic');

  useEffect(() => {
    if (editTodo) {
      setText(editTodo.text);
      setCategory(editTodo.category);
      setType(editTodo.type);
    }
  }, [editTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editTodo) {
      updateTodo(editTodo.id, text.trim(), category, type);
      onClose?.();
    } else {
      addTodo(text.trim(), category, type);
      setText('');
      setCategory('personal');
      setType('basic');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="添加新任务..."
      />
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value as Todo['category'])}
        className="form-select"
      >
        <option value="personal">个人事项</option>
        <option value="work">工作事项</option>
        <option value="shopping">购物事项</option>
      </select>
      <select
        value={type}
        onChange={(e) => setType(e.target.value as Todo['type'])}
        className="form-select"
      >
        <option value="basic">普通</option>
        <option value="urgent">紧急</option>
        <option value="important">重要</option>
      </select>
      <button type="submit" className="submit-btn">
        <PlusCircleIcon className="icon" />
        添加
      </button>
    </form>
  );
}
