import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, goToPage }: PaginationProps) => {

  return (
    <div className="pagination">
      <button 
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        上一页
      </button>
      
      <span>第 {currentPage} 页 / 共 {totalPages} 页</span>
      
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        下一页
      </button>
    </div>
  );
};
