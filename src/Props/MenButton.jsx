import { Link } from 'react-router-dom'

function MenButton({ MenButton, to, className='' }) {
  return (
    <Link
      className={`text-[0.9rem] font-bold font-jakarta backdrop-blur-[2px] w-30 sm:text-[14px] bg-none border-1 border-white sm:w-30 hover:bg-white hover:text-black hover:scale-[1.05] transition-all duration-500 ease-in-out rounded-[2rem] py-2 px-3 sm:p-3 flex justify-center items-center ${className}`}
      to={to}
    >
      {MenButton}
    </Link>
  )
}

export default MenButton