import { Link } from 'react-router-dom'
import Carousel from './Homepages/Carousel'
import BestSellers from './Homepages/BestSellers'
import FadeIn from './FadeIn'

function Homepage() {
  return (
    <div className='flex flex-col '>
      <FadeIn>
        <section className='h-[100dvh] sm:h-[100vh] w-[100%] mb-5 font-jakarta bg-[url(maksim.jpg)] bg-blend-darken bg-[#0000002a] bg-cover bg-center flex items-center justify-center'>
          <div className='text-center flex flex-col gap-4 sm:gap-4 text-white px-4'>
            <h1 className='text-4xl capitalize sm:text-4xl md:text-5xl lg:text-6xl font-bold'>All new collection</h1>
            <p className='text-sm sm:text-2xl'>The world's most comfortable shoes</p>

            <div className='flex sm:flex-row gap-3 sm:gap-5 justify-center items-center text-black'>
              <Link to="/women" className='bg-white text-[0.9rem] sm:text-[14px] font-bold w-30 sm:w-40 hover:bg-black hover:text-white hover:scale-[1.05] transition-all focus:transition-all sm:hover:transition-all duration-200 ease-in-out rounded-[2rem] py-3 sm:p-4 flex justify-center items-center'>Shop Women</Link>
              <Link to="/men" className='bg-white text-[0.9rem] sm:text-[14px] font-bold w-30 sm:w-40 hover:bg-black hover:text-white hover:scale-[1.05] transition-all focus:transition-all sm:hover:transition-all duration-300 ease-in-out rounded-[2rem] py-3 sm:p-4 flex justify-center items-center'>Shop Men</Link>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <Carousel/>
      </FadeIn>

      <FadeIn>
        <BestSellers/>
      </FadeIn>
    </div>
  )
}

export default Homepage
