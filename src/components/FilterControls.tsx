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
          进行中
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          已完成
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
          style={{display: 'none'}} /* 隐藏默认激活的按钮 */
        >
          进行中
        </button>
      </div>
      <input
        type="text"
        placeholder="搜索任务..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
          setSearchTerm(e.target.value)
        }
      />
    </div>
  );
}
