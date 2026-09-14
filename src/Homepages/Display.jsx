import MenButton from '../Props/MenButton'
import WomenButton from '../Props/WomenButton'

const SECTIONS = [
  {
    id: 1,
    bgImage: '/women-shoe.jpg',
    alt: "Women's Footwear Collection",
    title: 'Style & Comfort',
  },
  {
    id: 2,
    bgImage: '/men-shoe.jpg',
    alt: "Men's Footwear Collection",
    title: 'Casual & Everyday',
  },
  {
    id: 3,
    bgImage: '/athlete.jpg',
    alt: 'Athletic Shoes Feature',
    title: 'Athletic & Performance',
  },
]

function Display() {
  return (
    <section 
      aria-label="Featured Collections" 
      className='min-h-[70dvh] sm:h-[130vh] lg:h-[90vh] py-6 px-3 grid grid-cols-1 lg:grid-cols-3 gap-4 w-full'
    >
      {SECTIONS.map((box) => (
        <div 
          key={box.id} 
          className='group rounded-3xl relative overflow-hidden min-h-[320px] sm:min-h-0'
        >
          <img 
            src={box.bgImage} 
            alt={box.alt} 
            loading='lazy'
            decoding='async'
            className='absolute inset-0 h-full w-full object-center object-cover brightness-90 group-hover:brightness-100 group-hover:scale-[1.05] transition-all ease-in-out duration-500 delay-100' 
          />

          <div className='absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-black/0 z-0 pointer-events-none transition-opacity duration-300' />

          <div className='flex justify-center items-center h-full w-full z-10 relative'>
            <h1 className='font-jakarta text-2xl uppercase text-white font-bold drop-shadow-md text-center px-2'>
              {box.title}
            </h1>

            <div className='absolute bottom-5 w-full px-5 flex justify-between items-center gap-3 sm:gap-6 md:gap-10'>
              <MenButton 
                className='hover:text-black h-10 text-white' 
                MenButton='Shop men' 
                to='/men'
              />
              <WomenButton 
                className='hover:text-black h-10 text-white' 
                WomenButton='Shop Women' 
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