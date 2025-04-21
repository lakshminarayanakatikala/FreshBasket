import React from 'react'
import NavBar from './components/NavBar.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer.jsx'
import { useAppContext } from './context/AppContext.jsx'
import Login from './components/Login.jsx'
import AllProducts from './pages/AllProducts.jsx'
import ProductCategory from './pages/ProductCategory.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import AddAddress from './pages/AddAddress.jsx'
import MyOrders from './pages/MyOrders.jsx'
import SellerLogin from './components/seller/SellerLogin.jsx'
import SellerLayout from './pages/seller/SellerLayout.jsx'
import NotFound from './components/NotFound.jsx'
import AddProduct from './pages/seller/AddProduct.jsx'
import ProductList from './pages/seller/ProductList.jsx'
import Orders from './pages/seller/Orders.jsx'
import Loding from './components/Loding.jsx'
import ContactUs from './components/ContactUs.jsx'
const App = () => {
  {/* it tells the path of the url if it seller then it will return true other wise false*/}
  const isSellerPath = useLocation().pathname.includes('seller')

    // All valid paths or patterns
  //   const validRoutes = [
  //     '/',
  //     '/products',
  //     '/contact-us',
  //     '/cart',
  //     '/add-address',
  //     '/my-orders',
  //     '/loader',
  //   ];

  //     // Allow dynamic paths (like /products/:category or /products/:category/:id)
  //     const dynamicPatterns = [
  //       '/products/:category',
  //       '/products/:category/:id',
  //     ]; 

  //     const isValidRoute =validRoutes.includes(useLocation().pathname)
  // console.log("routes",isValidRoute)
  //   const isNotFound = !isValidRoute;



  const {showUserLogin , isSeller} = useAppContext()
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      <Toaster /> {/* if the toaster is used to add tosty notifications */}

      {/* in the seller path dont need the navbar and padding so we can use ternary operator */}
        {isSellerPath ? null :  <NavBar />}
        {showUserLogin ? <Login /> : null}
        <div className={`${isSellerPath ? '' : "px-6 md:px-16 lg:px-24 xl:px-32 "}`}>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/products' element={<AllProducts />}/>
            <Route path='/contact-us' element={<ContactUs />}/>
            <Route path='/products/:category' element={<ProductCategory />}/>
            <Route path='/products/:category/:id' element={<ProductDetails />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/add-address' element={<AddAddress />}/>
            <Route path='/my-orders' element={<MyOrders />}/>
            <Route path='/loader' element={<Loding />}/>
            <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
                <Route index element={isSeller ? <AddProduct /> : null}/>
                <Route path='product-list' element={<ProductList /> }/>
                <Route path='orders' element={<Orders /> }/>
            </Route>
             {/* This is the magic catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {(!isSellerPath) && <Footer />}
        {/* {isSellerPath ? null : isValidRoute ?  <Footer /> : null} */}

    </div>
  )
}

export default App
