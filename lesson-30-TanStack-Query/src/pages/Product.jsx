import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../lib/queries/getProduct';
import { useState, useEffect } from 'react';

export default function Product() {
    const { id } = useParams();
    const [showSuccess, setShowSuccess] = useState(false);
    
    const { data, isLoading, isError, isPending, isSuccess } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(id)
    });

    useEffect(() => {
        if (isSuccess) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess]);    

    if (isLoading || isPending) return <p className='py-16 px-4'>Loading product details...</p>;
    if (isError) return <p className='py-16 px-4'>Error fetching product details.</p>;

    return (
    <div className='py-12 px-4'>
      <h1 className='py-4 text-3xl font-bold'>Product Details</h1>
      {showSuccess && (
        <p className='bg-green-500 text-white p-2 rounded'>
            Produkt hentet !
        </p>
        )}
        {isSuccess ? (
            <div className='border p-4 rounded'>    

                <h2 className='text-2xl font-semibold'>{data.title}</h2>
                <h2 className='text-xl text-gray-600'> {data.description}</h2>
                <p className='text-lg'>Price: ${data.price.toFixed(2)}</p>
            </div>
        ) : null}
    </div>
    )
  }