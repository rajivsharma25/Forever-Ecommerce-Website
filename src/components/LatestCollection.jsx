import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'  
import Title from './Title';
import { useState } from 'react';
import ProductItem from './ProductItem';

const LatestCollection = () => {

  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  console.log(latestProducts);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  },[])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600' >
        Discover our latest collections – trendy styles, fresh vibes, and fashion-forward picks you won't want to miss!</p>
      </div>
      {/* renderning products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            latestProducts.map((item, index) => {
              return <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            })
          }
      </div>
    </div>
  )
}

export default LatestCollection