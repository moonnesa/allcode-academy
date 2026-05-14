import {useState, useEffect} from 'react';
import { getProducts } from '../lib/queries/getProducts';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
export default function Home() { 

  const { data: products, isPending, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
  
  if (isLoading || isPending) return <p className='py-16 px-4'>Loading...</p>;

  return (
    <div className='py-12 px-4'>
      <h1 className='py-4 text-3xl font-bold'>Products</h1>
      <div className='flex flex-col gap-4'>
        {isError ? <p className='text-red-500'>Error fetching products</p> : (
          <>
          {products.products.map((product, index) => (
            <div key={index} className=' flex justify-between border p-4 rounded'>
              <h3 className='text-xl'>{product.title}</h3>
              <Link to={`/products/${product.id}`} className='text-blue-500 hover:underline'>
                View Details
              </Link>
            </div>
          ))}
          </>
          )}
      </div>
    </div>
  )
}