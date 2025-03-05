import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

export function FilterControls() {
  const { filter, setFilter, searchTerm, setSearchTerm } = useContext(TodoContext)!;

  return (
    <div className="filter-controls">
      <div className="filter-buttons">
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
          style={{display: 'none'}} /* 隐藏默认激活的按钮 */
        >
          Active
        </button>
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
          setSearchTerm(e.target.value)
        }
      />
    </div>
  );
}
