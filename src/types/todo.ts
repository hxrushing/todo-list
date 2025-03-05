export type Todo = {
    id: number;
    text: string;
    completed: boolean;
    category: 'personal' | 'work' | 'shopping';
    createdAt: string;
  };
  
  export type TodoContextType = {
    todos: Todo[];
    filteredTodos: Todo[];
    addTodo: (text: string, category?: Todo['category']) => void;
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
  updateTodoText: (id: number, newText: string) => void;
  };
