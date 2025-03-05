import { useState, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Todo } from '../types/todo';

export function TodoForm() {
  const { addTodo } = useContext(TodoContext)!;
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Todo['category']>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim(), category);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new task..."
      />
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value as Todo['category'])}
      >
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="shopping">Shopping</option>
      </select>
      <button type="submit">
        <PlusCircleIcon className="icon" />
      </button>
    </form>
  );
}