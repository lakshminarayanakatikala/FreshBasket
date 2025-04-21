import React from 'react'
import ProductCard from './ProductCard'
import { AppContext, useAppContext } from '../context/AppContext'


{/* reference of prebuiltui */}
const BestSeller = () => {
        
        const {products} = useAppContext()
  return (
    //responsive is not good check after complete the project
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6 lg:gap-8 justify-items-center">
            {products.filter((product) => product.inStock).slice(0,8).map((product , index)=>(
            <ProductCard key={index} product={product}/>
            ))}
        </div>    
    </div>
  )
}

export default BestSeller
