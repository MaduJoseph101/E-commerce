import React from 'react'
import NewArrivals from '../Props/NewArrivals'

function Prefooter() {
  const currentYear = new Date().getFullYear()

  return (
    <section className='min-h-[75vh] w-full bg-[#F4F4EC] grid grid-cols-1 sm:grid-cols-2 mb-5 sm:mb-7 overflow-hidden font-jakarta'>
      <div className='relative min-h-[40vh] sm:min-h-full w-full bg-[url(/model.jpg)] bg-cover bg-center'>
        <div className='absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-transparent via-transparent to-[#F4F4EC] pointer-events-none' />
      </div>
      
      <div className='flex flex-col justify-center items-start p-8 sm:p-12 lg:p-16 gap-4 sm:gap-6 bg-[#F4F4EC] text-black font-jakarta z-10'>
        <h2 className='font-jakarta text-2xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.15] tracking-tight text-gray-950'>
          The {currentYear} AllShoes Comfort & Performance Collection
        </h2>
        
        <p className='font-jakarta text-sm sm:text-base lg:text-lg text-gray-800 font-normal max-w-lg'>
          The world's most comfortable footwear, engineered for everyday movement and peak performance.
        </p>
        
        <NewArrivals 
          NewArrivals='Shop now' 
          to='/all' 
          className='!bg-[#111111] !text-white !border-[#111111] hover:!bg-black hover:!scale-[1.02] !rounded-none !w-auto !px-7 !py-3 font-jakarta font-semibold text-sm shadow-sm'
        />
      </div>
    </section>
  )
}

export default Prefooter