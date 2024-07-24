import { useState } from 'react'

function Pagination() {
  const [activeButton, setActiveButton] = useState(1); // Initialise avec le bouton 1 actif

  // Fonction pour gérer le clic sur un bouton
  const handleClick = (number) => {
    setActiveButton(number);
  };

  return (
    <div className='text-center mt-16'>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
        <button
          key={number}
          onClick={() => handleClick(number)}
          className={`btn btn-primary px-2 py-1 ${activeButton === number ? 'bg-blue-500' : 'bg-gray-300'} text-white ${number === 1 ? 'rounded-l-md' : ''} ${number === 10 ? 'rounded-r-md' : ''}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
