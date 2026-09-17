import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineShopping } from "react-icons/ai";
import { CiMenuBurger } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiCircleRemove } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
        {/* DESKTOP HEADER */}
        <header className=' hidden md:flex sticky top-0 h-16 w-[100%] px-10 bg-[#212121] z-20 text-white justify-between uppercase items-center gap-15 font-jakarta'>
            <div className=' flex gap-1 justify-center items-center'>
              <CiMenuBurger className='text-xl hidden' /> 
              <span className='text-lg font-jakarta'>AllShoes</span>
            </div>

            <div className=' flex gap-10 text-sm sm:text-[0.8rem]'>
                <Link to="/" className=' hover:text-[#cbcbcb] duration-75'>HOME</Link>
                <Link to="/all" className=' hover:text-[#cbcbcb] duration-75'>Shop All</Link>
                <Link to="/men" className=' hover:text-[#cbcbcb] duration-75'>Men</Link>
                <Link to="/women" className=' hover:text-[#cbcbcb] duration-75'>Women</Link>
            </div>

            <div className=' flex gap-3 lg:gap-5'>
                <Link to="/all" className=' text-lg lg:text-[1.2rem] font-bold'><RiSearchLine/></Link>
                <Link to="/cart" className=' text-lg lg:text-[1.2rem] font-bold'><AiOutlineShopping /></Link>
                <Link to="/signup" className=' text-lg lg:text-[1.2rem] font-bold'><CgProfile /></Link>
            </div>
        </header>

        {/* MOBILE HEADER*/}
        <header className=' md:hidden sticky top-0  h-[8dvh] z-30 w-full bg-[#212121] text-white flex justify-between px-4 items-center font-jakarta uppercase'>

           <div className=' flex justify-center items-center gap-4'>
             <button onClick={() => setIsMenuOpen(true)} className=' text-xl'>
              <RxHamburgerMenu />
            </button>

             <Link to="/signup" className=' text-xl font-bold'><CgProfile /></Link>

           </div>

            <span className='text-base font-bold font-jakarta'>AllShoes</span>

            <div className=' flex gap-4'>
                <Link to="/all" className=' text-lg font-bold'><RiSearchLine /></Link>
                <Link to="/cart" className=' text-lg font-bold'><AiOutlineShopping /></Link>
            </div>
        </header>

        {/* MOBILE MENU OVERLAY*/}
        {isMenuOpen && (
          <div 
            className=' fixed inset-0 bg-black/50 z-40 md:hidden'
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* MOBILE MENU */}
        <div className={`
          fixed top-0 left-0 h-full w-65 bg-[#212121] z-50 md:hidden
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className=' flex justify-end items-center p-4 border-b border-gray-600'>

            <button 
              onClick={() => setIsMenuOpen(false)}
              className=' text-2xl text-white hover:text-gray-300'
            >
              <CiCircleRemove className='text-2xl' />
            </button>

            
          </div>

          <nav className=' flex flex-col p-6 gap-6 uppercase text-white font-jakarta'>
            <Link 
              to="/" 
              className=' text-lg hover:text-gray-300 transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/all" 
              className=' text-lg hover:text-gray-300 transition-colors'
              onClick={() => setIsMenuOpen(false)}>
              Shop All
            </Link>

            <Link 
              to="/men" 
              className=' text-lg hover:text-gray-300 transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              Men
            </Link>
            <Link 
              to="/women" 
              className=' text-lg hover:text-gray-300 transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              Women
            </Link>
          </nav>
        </div>
    </>
  )
}

export default Header
