import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}