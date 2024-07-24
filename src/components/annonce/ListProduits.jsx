import { useState } from 'react'
import Produit from './Produit'
import Pagination from './Pagination'

function ListProduits() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='mt-10'>
        <p className='mb-4'>1 ~ 6 of over 100 results</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            <Produit />
            <Produit />
            <Produit />
            <Produit />
            <Produit />
            <Produit />
        </div>
        <Pagination />
    </div>
    </>
  )
}

export default ListProduits
