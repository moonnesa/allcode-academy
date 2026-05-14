import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { postProduct } from "../lib/mutations/postProduct"

export default function AddProduct() {

  const [formData, setFormData] = useState({
    title: '',
    price: ''
  }) 

  const newProduct = useMutation({
    mutationFn: () => postProduct({title: formData.title, price: formData.price}),
    onSuccess: () => {
      setTimeout(() => {
      window.location.reload();
    }, 3000); // 3 sekunder
  }
});

  return (
    <div className='py-12 px-4'>
      <h1 className='py-4 text-3xl font-bold'>Add Products</h1>
      {newProduct.isLoading || newProduct.isPending ? <p>Adding product...</p>: null}
      {newProduct.isSuccess ? <p className='bg-green-500 text-white p-2 rounded'>Product {newProduct.data.title} added successfully!</p> : null}

      <div className='w-full max-w-md bg-white rounded-lg shadow-md p-6'>
        <form>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>
              Title
            </label>
            <input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='title'
              type='text'
              placeholder='Enter product title'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
              Price
            </label>
            <input
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})} 
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='price'
              type='number'
              placeholder='Enter product price'
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              onClick={() =>newProduct.mutate()}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
            >
              Add Product
            </button>
          </div>
          </form>
        </div>
      
    </div>
  )
}