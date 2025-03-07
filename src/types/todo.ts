export type Todo = {
    id: number;
    text: string;
    completed: boolean;
    category: 'personal' | 'work' | 'shopping';
    type: 'basic' | 'urgent' | 'important'; // 新增事项类型
    createdAt: string;
  };
  
export interface TodoContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  paginatedTodos: Todo[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
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
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  updateTodo: (id: number, newText: string, newCategory: Todo['category'], newType: Todo['type']) => void;
}
