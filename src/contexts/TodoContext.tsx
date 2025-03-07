import { createContext, useState, useMemo, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Todo } from '../types/todo';

export const TodoContext = createContext<TodoContextType>({} as TodoContextType);

interface TodoProviderProps {
  children: ReactNode;
}

export interface TodoContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  paginatedTodos: Todo[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  goToPage: (page: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (text: string, category?: Todo['category'], type?: Todo['type']) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  filter: 'all' | 'completed' | 'active';
  setFilter: React.Dispatch<React.SetStateAction<'all' | 'completed' | 'active'>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  startEdit: (id: number | null) => void;
  editingId: number | null;
  updateTodo: (id: number, newText: string, newCategory: Todo['category'], newType: Todo['type']) => void;
}

const itemsPerPage = 8;

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 1);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [theme, setTheme] = useLocalStorage<'light'|'dark'>('theme', 'light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const startEdit = (id: number | null) => {
    setEditingId(id);
  };

  const updateTodo = (id: number, newText: string, newCategory: Todo['category'], newType: Todo['type']) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {
        ...todo, 
        text: newText,
        category: newCategory,
        type: newType, // 允许修改类型
        updatedAt: new Date().toISOString()
      } : todo
    ));
    setEditingId(null);
    // 保持当前分页不变
  };

  // 分页计算
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesFilter = filter === 'all' || 
        (filter === 'completed' && todo.completed) || 
        (filter === 'active' && !todo.completed);
      const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [todos, filter, searchTerm]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredTodos.length / itemsPerPage)), [filteredTodos]);
  
  const paginatedTodos = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTodos.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTodos, currentPage, itemsPerPage]);

  const addTodo = (text: string, category?: Todo['category'], type: Todo['type'] = 'basic') => {
    setTodos([{
      id: Date.now(),
      text,
      completed: false,
      category: category || 'personal',
      type,
      createdAt: new Date().toISOString()
    }, ...todos]);
  };

  const value: TodoContextType = {
    todos,
    filteredTodos,
    paginatedTodos,
    currentPage,
    totalPages,
    setCurrentPage,
    goToPage,
    setTodos,
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
    toggleTheme,
    startEdit,
    editingId,
    updateTodo
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
