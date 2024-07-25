import React from 'react';

function Pagination({ currentPage, handlePageChange, totalPages }) {
  const handleClick = (number) => {
    handlePageChange(number);
  };

  return (
    <div className='text-center mt-16'>
      {[...Array(totalPages).keys()].map((number) => (
        <button
          key={number + 1}
          onClick={() => handleClick(number + 1)}
          className={`btn btn-primary px-2 py-1 ${currentPage === number + 1 ? 'bg-blue-500' : 'bg-gray-300'} text-white ${number === 0 ? 'rounded-l-md' : ''} ${number === totalPages - 1 ? 'rounded-r-md' : ''}`}
        >
          {number + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
