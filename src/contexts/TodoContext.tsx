import { createContext, useState, useMemo, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo, TodoContextType } from '../types/todo';

export const TodoContext = createContext<TodoContextType>({} as TodoContextType);

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [editingId, setEditingId] = useState<number | null>(null);

  const startEdit = (id: number | null) => {
    setEditingId(id);
  };

  const updateTodoText = (id: number, newText: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, text: newText} : todo
    ));
    setEditingId(null);
  };

  const addTodo = (text: string, category?: Todo['category']) => {
    setTodos([...todos, {
      id: Date.now(),
      text,
      completed: false,
      category: category || 'personal',
      createdAt: new Date().toISOString()
    }]);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesFilter = filter === 'all' || 
        (filter === 'completed' && todo.completed) || 
        (filter === 'active' && !todo.completed);
      const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [todos, filter, searchTerm]);

  const value: TodoContextType = {
    todos,
    filteredTodos,
    addTodo,
    toggleTodo: (id: number) => setTodos(todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    )),
    deleteTodo: (id: number) => setTodos(todos.filter(todo => todo.id !== id)),
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    theme,
    toggleTheme: () => setTheme(prev => prev === 'light' ? 'dark' : 'light'),
    startEdit,
    editingId,
    updateTodoText
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
