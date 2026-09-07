import React from 'react'
import MenButton from '../Props/MenButton'
import WomenButton from '../Props/WomenButton'

function Display() {
  return (
    <>
        <aside className=' h-[90dvh] py-6 px-3 grid-cols-1 grid sm:grid-cols-3 gap-4 w-full '>
            <div className='group bg-gray-400 rounded-3xl relative overflow-hidden'>
                <img src="women-shoe.jpg" alt="women-shoe" className='absolute bg-[#000000a2] bg-blend-darken inset-0 h-full w-full object-cover group-hover:scale-[1.05] transition-all ease-in-out duration-600 delay-100' />

                <div className=' flex justify-center items-center h-full w-full z-10 relative'>
                    <h1 className=' font-jakarta text-2xl uppercase text-white'>New Styles in the summer</h1>

                    <div className=' absolute bottom-5 w-full px-5 flex justify-between items-center gap-10'>
                        <MenButton className=' hover:text-black  h-10 text-white duration-100' MenButton='Shop men'/>
                        <WomenButton className=' hover:text-black h-10 text-white duration-100' WomenButton='Shop Women'/>
                    </div>
                </div>

            </div>


            {/* <div className=' bg-yellow-400 rounded-3xl'></div>
            <div className=' bg-purple-400 rounded-3xl'></div> */}
        </aside>
    </>
  )
}

export default Display