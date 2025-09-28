import React from 'react';
import { Button } from '@/components/ui/button';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center mt-4 space-x-2">
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
                className="text-white"

      >
        Previous
      </Button>
      <span className="px-2">{`Page ${currentPage} of ${totalPages}`}</span>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="text-white"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
