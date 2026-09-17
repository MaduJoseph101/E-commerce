import MenButton from '../Props/MenButton'

const SECTIONS = [
  {
    id: 1,
    bgImage: '/DisplayImages/women-shoe.jpg',
    alt: "Women's Footwear Collection",
    title: 'Style & Comfort',
    tag: "Women's Edition",
  },
  {
    id: 2,
    bgImage: '/DisplayImages/men-shoe.jpg',
    alt: "Men's Footwear Collection",
    title: 'Casual & Everyday',
    tag: "Men's Edition",
  },
  {
    id: 3,
    bgImage: '/DisplayImages/athlete.jpg',
    alt: 'Athletic Shoes Feature',
    title: 'Athletic & Performance',
    tag: 'Performance Series',
  },
  
]

function Display() {
  return (
    <section 
      aria-label="Featured Collections" 
      className='min-h-[70dvh] sm:min-h-[130vh] lg:min-h-[95vh] py-6 px-3 mb-7 grid grid-cols-1 lg:grid-cols-3 gap-5 w-full font-jakarta'
    >
      {SECTIONS.map((box) => (
        <div 
          key={box.id} 
          className='group rounded-3xl relative overflow-hidden min-h-[360px] sm:min-h-0 border border-black/10 shadow-sm hover:shadow-2xl hover:border-black/0 transition-all duration-500 ease-out'
        >
          <img 
            src={box.bgImage} 
            alt={box.alt} 
            // loading='eager'
            decoding='async'
            className='absolute inset-0 h-full w-full object-center object-cover brightness-95 group-hover:brightness-100 group-hover:scale-110 transition-transform delay-100 duration-700 ease-out' 
          />         

          <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/0 z-0 pointer-events-none transition-opacity duration-300' />

          <div className='flex flex-col justify-between h-full w-full z-10 relative p-6'>
            <div className='h-8' />

            <div className='text-center my-auto px-2'>
              <h2 className='font-jakarta text-2xl lg:text-3xl uppercase text-white font-extrabold tracking-tight text-center drop-shadow-md group-hover:scale-[1.02] transition-transform duration-300'>
                {box.title}
              </h2>
            </div>

            <div className='w-full flex justify-between items-center gap-3 sm:gap-4 pt-4'>
              <MenButton 
                className='!bg-white !text-black !border-white hover:!bg-black hover:!text-white hover:!border-black shadow-md font-jakarta text-xs sm:text-sm font-bold py-2 px-4 rounded-full transition-all duration-300 w-full flex justify-center' 
                MenButton='Shop Men' 
                to='/men'
              />
              <MenButton 
                className='!bg-white !text-black !border-white hover:!bg-black hover:!text-white hover:!border-black shadow-md font-jakarta text-xs sm:text-sm font-bold py-2 px-4 rounded-full transition-all duration-300 w-full flex justify-center' 
                MenButton='Shop Women' 
                to='/women'
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Display