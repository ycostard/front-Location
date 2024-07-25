import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Produit from './Produit';
import Pagination from './Pagination';

function ListProduits() {
  const [annonces, setAnnonces] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(''); // État pour la recherche

  const fetchAnnonces = (page, search = '') => {
    const url = `http://localhost:3001/api/annonces?limit=6&offset=${(page - 1) * 6}&search=${encodeURIComponent(search)}`;
    axios.get(url)
      .then(res => {
        setAnnonces(res.data.results);
        setCount(res.data.count);
        setTotalPages(Math.ceil(res.data.count / 6));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchAnnonces(currentPage, search); // Inclure la recherche dans les paramètres de la requête
  }, [currentPage, search]); // Recharger les annonces lorsque la page ou la recherche change

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Réinitialiser la page à 1 lorsqu'on change la recherche
  };

  return (
    <div className='mt-10'>
      <div className='flex flex-col md:flex-row justify-between items-center mb-2'>
        <p className='mb-4'>{count} résultats trouvés</p>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Rechercher..."
          className="p-2 border border-gray-300 rounded"
        />
      </div>
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
