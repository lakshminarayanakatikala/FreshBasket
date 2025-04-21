import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {
    const {products} = useAppContext()
    const {category} = useParams()
  //one product type like name  fruits,veg
    const searchCategory = categories.find((item)=> item.path.toLowerCase() === category)
  //one product type like  fruits,veg (cards)

    const filteredProducts = products.filter((product)=> product.category.toLowerCase() === category && product.inStock)
    console.log(filteredProducts)
  return (
    <div className='mt-16'>
        {searchCategory && (
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>
        )}
        { filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6 lg:gap-8 justify-items-center">
                    {filteredProducts.map((product)=> (
                        <ProductCard  key={product._id} product={product}/>
                    ))}
                </div>
            ) :(
                <div className='flex items-center justify-center h-[60vh]'>
                    <p className='text-2xl font-medium text-primary'>No products found in this category.</p>

                </div>
            )
        }
      
    </div>
  )
}

export default ProductCategory


