import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Produit from './Produit';
import Pagination from './Pagination';

function ListProduits() {
  const [annonces, setAnnonces] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAnnonces = (page) => {
    axios.get(`http://localhost:3001/api/annonces?limit=6&offset=${(page - 1) * 6}`)
      .then(res => {
        setAnnonces(res.data.results);
        setCount(res.data.count);
        setTotalPages(Math.ceil(res.data.count / 6));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchAnnonces(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='mt-10'>
      <p className='mb-4'>{count} résultats trouvés</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {annonces.map(annonce => (
          <Produit key={annonce.id} annonce={annonce} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
}

export default ListProduits;
