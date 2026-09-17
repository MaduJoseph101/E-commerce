import MenButton from '../Props/MenButton'
import WomenButton from '../Props/WomenButton'

const SECTIONS = [
  {
    id: 1,
    bgImage: '/DisplayImages/jordanD.jpg',
    alt: "Women's Footwear Collection",
    title: 'New design',
    tag: "Limited Edition",
    className: 'col-span-1 md:col-span-2 min-h-[350px] sm:min-h-[380px] md:min-h-[450px]',
    titleSize: 'text-2xl sm:text-5xl'
  },
  {
    id: 2,
    bgImage: '/DisplayImages/menshoeD.jpg',
    alt: "Men's Footwear Collection",
    title: 'Summer collection',
    tag: "Summer Edition",
    className: 'col-span-1 md:col-span-1 min-h-[350px] sm:min-h-[400px] md:min-h-[450px]',
  },
  {
    id: 3,
    bgImage: '/DisplayImages/womenshoeD.jpg',
    alt: 'Athletic Shoes Feature',
    title: 'New arrivals',
    tag: 'Deluxe edition',
    className: 'col-span-1 md:col-span-1 min-h-[350px] sm:min-h-[400px] md:min-h-[450px]',
  },
]

function Display() {
  return (
    <section 
      aria-label="Featured Collections" 
      className='max-w-7xl mx-auto py-6 sm:px-6 mb-0 sm:mb-7 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full font-jakarta'
    >
      {SECTIONS.map((box) => (
        <div 
          key={box.id} 
          className={`group rounded-3xl relative overflow-hidden border border-black/10 shadow-sm hover:shadow-2xl hover:border-black/0 transition-all duration-500 ease-out flex flex-col justify-between p-6 sm:p-8 ${box.className}`}
        >
          <img 
            src={box.bgImage} 
            alt={box.alt} 
            decoding='async'
            className='absolute inset-0 h-full w-full object-center object-cover brightness-95 group-hover:brightness-100 group-hover:scale-105 transition-transform delay-100 duration-700 ease-out' 
          />         

          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/0 z-0 pointer-events-none transition-opacity duration-300' />

          {/* TEXT ALIGNMENT*/}
          <div className='flex flex-col justify-between h-full w-full z-10 relative'>
            
            <div className='flex items-center justify-start'>
              <span className='bg-white/90 text-black text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs backdrop-blur-xs'>
                {box.tag}
              </span>
            </div>

            <div className='my-auto py-6 px-2 text-center'>
              <h2 className={`font-jakarta uppercase text-white font-extrabold tracking-tight text-center drop-shadow-md group-hover:scale-[1.02] text-2xl sm:text-3xl transition-transform duration-300 ${box.titleSize}`}>
                    {box.title} 
              </h2>
            </div>

            <div className='w-full flex justify-between items-center gap-3 sm:gap-4 pt-2'>
              <MenButton 
                className='!bg-white !text-black !border-white hover:!bg-black hover:!text-white hover:!border-black shadow-md h-8 w-20 sm:h-12 sm:w-35 font-jakarta text-[12px] sm:text-sm font-bold py-2.5 px-4 rounded-full transition-all duration-300  flex justify-center' 
                MenButton='Shop Men' 
                to='/men'
              />
              <WomenButton 
                className='!bg-white !text-black !border-white hover:!bg-black hover:!text-white hover:!border-black shadow-md h-8 w-20 sm:h-12 sm:w-35 font-jakarta text-[12px] sm:text-sm font-bold py-2.5 px-4 rounded-full transition-all duration-300 flex justify-center' 
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