import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
        {/* Desktop Header */}
        <header className=' hidden md:flex sticky top-0 h-15 w-[100%] px-10 bg-[#212121] z-20 text-white justify-between uppercase items-center gap-15 font-jakarta'>
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

            <div className=' flex gap-6 lg:gap-10'>
                <Link to="/all" className=' text-lg lg:text-xl font-bold'><CiSearch /></Link>
                <Link to="/all" className=' text-lg lg:text-xl font-bold'><CiShoppingCart /></Link>
            </div>
        </header>

        {/* Mobile Header */}
        <header className=' md:hidden  h-15 w-full bg-[#212121] text-white flex justify-between px-4 items-center font-jakarta uppercase'>
            <button onClick={() => setIsMenuOpen(true)} className=' text-2xl'>
              <CiMenuBurger />
            </button>

            <span className='text-base font-bold font-jakarta'>AllShoes</span>

            <div className=' flex gap-4'>
                <Link to="/all" className=' text-lg font-bold'><CiSearch /></Link>
                <Link to="/all" className=' text-lg font-bold'><CiShoppingCart /></Link>
            </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className=' fixed inset-0 bg-black/50 z-40 md:hidden'
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Slide-in Menu */}
        <div className={`
          fixed top-0 left-0 h-full w-72 bg-[#212121] z-50 md:hidden
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
