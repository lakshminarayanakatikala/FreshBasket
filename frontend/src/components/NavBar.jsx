import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
{/* reference of prebuiltui */}
const NavBar = () => {
    const [open, setOpen] = React.useState(false)
    const {user , setUser , showUserLogin , setShowUserLogin , navigate ,searchQuery ,setSearchQuery , getCartCount , axios} = useAppContext()

    const logout = async ()=>{
        try {
            const {data} = await axios.get('/api/user/logout')
            // console.log(data)
            if(data.success){
                toast.success(data.message)
                setUser(null)  //click the logout user is null and  navigate home page
                navigate('/')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }

    }

    //seach in navbar
    useEffect(()=>{

        if (searchQuery.length > 0) {
            navigate('/products')
        }

    },[searchQuery])

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

        <NavLink to='/' onClick={()=> setOpen(false)}> {/* if click the log if the mobile menu is closed */}
            <img className="h-9 " src={assets.logo_2} alt="Logo" />
            {/* <img className="h-12 md:h-16 lg:h-20" src={assets.fresh_basket} alt="Logo" /> */}

        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
           <NavLink to='/'>Home</NavLink>
           <NavLink to='/products' >All Product</NavLink>
           <NavLink to='/contact-us'>Contact</NavLink>

            <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                <input onChange={(e)=>setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
               <img  src={assets.search_icon} alt='search' className='w-4 h-4'/>
            </div>

            <div onClick={()=> navigate('/cart')} className="relative cursor-pointer">
               <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80'/>
                <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
            </div>
            {/* if the user is login show profile other wise show logon button */}
            {!user ? (<button onClick={()=>setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                Login
            </button>) :
            (
               <div className='relative group'>  { /* this className is used to style the profile */}
                <img src={assets.profile_icon} alt="profile" className='w-10' />
                <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-b-md text-sm z-40'>
                    <li onClick={()=>{navigate('my-orders')}} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                    <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                </ul>
               </div> 
            )}
        </div>

        <div className='flex items-center gap-6 sm:hidden '>
            {/* cart button in mobile screen */}
            <div onClick={()=> navigate('/cart')} className="relative cursor-pointer">
               <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80'/>
                <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="">
                {/* Menu Icon SVG */}
            <img src={assets.menu_icon} alt="menu"  />
            </button>
        </div>


        {/* Mobile Menu  only shows mobile view */}
        {open && (
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
            <NavLink to='/' onClick={()=>setOpen(false)}>Home</NavLink>   {/* setOpen is use to click any option in mobile view close the menu*/}
            <NavLink to='/products' onClick={()=>setOpen(false)}>All Products</NavLink>
            {user && <NavLink to='/' onClick={()=>setOpen(false)}>My Orders</NavLink>} {/* my only show login the user so we  use context  */}
            <NavLink to='/' onClick={()=>setOpen(false)}>Contact</NavLink>
           
         {/*  if the user is login shows logout button other wise shows login button*/}
           {!user ?  (
                <button onClick={
                    ()=> {setOpen(false);
                    setShowUserLogin(true);
                }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                Login
                </button>
           ) 
           : (
            <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
            Logout
            </button>
           )
           }
           
        </div>
        )}

    </nav>
  )
}

export default NavBar
