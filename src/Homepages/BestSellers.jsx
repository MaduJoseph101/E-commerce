import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function getVisibleCount() {
  if (typeof window === 'undefined') return 4
  const w = window.innerWidth
  if (w < 640) return 1
  if (w < 768 ) return 2
  if (w < 1024) return  3
  return 4
}

function BestSellers() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [visibleCount, setVisibleCount] = useState(getVisibleCount)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [withTransition, setWithTransition] = useState(true)
  const isJumping = useRef(false)
  const prevVisibleCount = useRef(visibleCount)
  const hasPositioned = useRef(false) 

  // MOBILE DRAG FUNCTIONALITY
  const [dragPx, setDragPx] = useState(0)
  const dragPxRef = useRef(0)
  const dragState = useRef({ active: false, startX: 0, moved: false })
  const viewportRef = useRef(null)
  const isMobile = visibleCount === 1

  useEffect(() => {
    let resizeTimeout
    const onResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => setVisibleCount(getVisibleCount()), 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  useEffect(() => {
    let ignore = false

    const fetchShoes = async () => {
      try {
        const [mensRes, womensRes] = await Promise.all([
          fetch("https://dummyjson.com/products/category/mens-shoes"),
          fetch("https://dummyjson.com/products/category/womens-shoes"),
        ])
        if (!mensRes.ok || !womensRes.ok) throw new Error("Request failed")

        const mensData = await mensRes.json()
        const womensData = await womensRes.json()

        const mixed = []
        const max = Math.max(mensData.products.length, womensData.products.length)
        for (let i = 0; i < max; i++) {
          if (mensData.products[i]) mixed.push(mensData.products[i])
          if (womensData.products[i]) mixed.push(womensData.products[i])
        }

        if (!ignore) setData(mixed)
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    fetchShoes()
    return () => { ignore = true }
  }, [])

  useEffect(() => {
    if (!withTransition) {
      requestAnimationFrame(() => {
        setWithTransition(true)
        isJumping.current = false
      })
    }
  }, [withTransition])

  useEffect(() => {
    if (!loading && data.length > 0) {
      const safeCount = Math.min(visibleCount, data.length)
      if (!hasPositioned.current || prevVisibleCount.current !== visibleCount) {
        setWithTransition(false)
        hasPositioned.current = true
      }
      setCurrentIndex(safeCount)
      prevVisibleCount.current = visibleCount
    }
  }, [visibleCount, loading, data.length])

    //  LOADER
  if (loading) return (
    <section className='min-h-[70vh] w-full pt-5 flex flex-col px-6'>
      <div className='flex justify-between items-center'>
        <h2 id='best-sellers' className='uppercase tracking-wider text-[0.9rem] sm:text-[1.1rem] font-jakarta border-b-2 w-fit'>Best Sellers</h2>
      </div>

      {/* SKELETON CARDS */}
      <div className='overflow-hidden pt-6 pb-6 mt-6 w-full'>
        <div className='flex items-stretch'>
          {Array.from({ length: visibleCount }).map((_, i) => (
            <div key={i} className='px-3' style={{ width: `${100 / visibleCount}%` }}>
              <div className='bg-[#F7F5F0] border border-[#E6E1D7] rounded-3xl overflow-hidden flex flex-col h-full animate-pulse'>

                <div className='h-48 w-full bg-[#EFECE6]/80'></div>

                <div className='p-5 flex-1 flex flex-col gap-3'>
                  <div className='h-3 bg-gray-300 rounded w-1/3'></div>
                  <div className='h-4 bg-gray-300 rounded w-3/4'></div>
                  <div className='h-4 bg-gray-300 rounded w-1/2 mt-2'></div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  // ERROR CARD
  if (error) return (
    <section className='min-h-[30vh] w-full pt-5 px-7 sm:px-6 flex flex-col'>
      <h2 id='best-sellers' className='uppercase tracking-wider text-[0.9rem] sm:text-[1.1rem] font-jakarta border-b-2 w-fit'>Best Sellers</h2>

      <div className='flex-1 flex items-center justify-center py-10'>
        <div className='w-full max-w-md bg-white rounded-xl shadow-sm p-6 sm:p-10 text-center'>
          <div className='w-12 h-12 text-red-600 sm:w-14 sm:h-14 mx-auto rounded-full bg-[#E9E3D6] flex items-center justify-center font-jakarta font-bold text-lg sm:text-xl'>
            !
          </div>
          <p className='font-jakarta font-bold text-base sm:text-lg mt-4'>
            Couldn't load best sellers
          </p>
          <p className='font-jakarta text-sm sm:text-base text-gray-500 mt-2'>
            Something went wrong while fetching the products. Check your connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className='mt-6 font-jakarta text-sm font-bold bg-black text-white px-6 py-2.5 rounded-full hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 hover:cursor-pointer'>
            Try again
          </button>
        </div>
      </div>
    </section>
  )

  if (data.length === 0) return null

  const safeVisibleCount = Math.min(visibleCount, data.length)
  const clonesBefore = data.slice(-safeVisibleCount)
  const clonesAfter = data.slice(0, safeVisibleCount)
  const extendedData = [...clonesBefore, ...data, ...clonesAfter]

  const slideOffset = (currentIndex * 100) / extendedData.length

  const realSlideNumber =
    (((currentIndex - safeVisibleCount) % data.length) + data.length) % data.length + 1

  const handleNext = () => {
    if (isJumping.current) return
    setWithTransition(true)
    setCurrentIndex((prev) => prev + 1)
  }

  const handlePrev = () => {
    if (isJumping.current) return
    setWithTransition(true)
    setCurrentIndex((prev) => prev - 1)
  }

  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return

    if (currentIndex >= data.length + safeVisibleCount || currentIndex < safeVisibleCount) {
      const relative = currentIndex - safeVisibleCount
      const normalized = ((relative % data.length) + data.length) % data.length
      isJumping.current = true
      setWithTransition(false)
      setCurrentIndex(normalized + safeVisibleCount)
    }
  }

  const handleDragStart = (e) => {
    if (!isMobile || isJumping.current) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    dragState.current = { active: true, startX: e.clientX, moved: false }
    dragPxRef.current = 0
    setDragPx(0)
    setWithTransition(false)
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* noop */ }
  }

  const handleDragMove = (e) => {
    const st = dragState.current
    if (!st.active) return
    const dx = e.clientX - st.startX
    if (Math.abs(dx) > 5) st.moved = true
    dragPxRef.current = dx
    setDragPx(dx)
  }

  const handleDragEnd = () => {
    const st = dragState.current
    if (!st.active) return
    st.active = false
    const dx = dragPxRef.current
    dragPxRef.current = 0
    setDragPx(0)
    setWithTransition(true)

    const width = viewportRef.current?.clientWidth ?? window.innerWidth
    const threshold = width * 0.2
    if (st.moved && dx <= -threshold) {
      setCurrentIndex((prev) => prev + 1)
    } else if (st.moved && dx >= threshold) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleDragCancel = () => {
    if (!dragState.current.active) return
    dragState.current.active = false
    dragPxRef.current = 0
    setDragPx(0)
    setWithTransition(true)
  }

  const handleCaptureClick = (e) => {
    if (dragState.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      dragState.current.moved = false
    }
  }

  return (
    <section className=' min-h-[50vh] w-full justify-center  flex flex-col'>

      <div className='flex justify-between px-4 items-center'>
        <h2 id='best-sellers' className='uppercase tracking-wider text-[0.9rem] sm:text-[1.1rem] font-jakarta border-b-2 w-fit'>Trending Now</h2>

        <span className='flex gap-4 font-jakarta items-center justify-center text-black'>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous product"
            className='cursor-pointer border-black border-[1px] p-2 rounded-[50%] transition-all duration-300 ease-in-out font-bold hover:bg-black hover:text-white hover:scale-[1.1] active:bg-black active:text-white'

          >

            <IoIosArrowBack/>
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next product"
            className='cursor-pointer border-black border-[1px] p-2 rounded-[50%] transition-all duration-300 ease-in-out font-bold hover:bg-black hover:text-white hover:scale-[1.1] active:bg-black active:text-white'
          >
            <IoIosArrowForward/>
          </button>
        </span>
      </div>

      <p className='sr-only' aria-live="polite">
        Showing product {realSlideNumber} of {data.length}
      </p>

      {/* CARDS */}
      <div ref={viewportRef} className='overflow-hidden pt-6 pb-6 mt-4 w-full min-h-[30vh]'>
        <div
          onTransitionEnd={handleTransitionEnd}
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragCancel}
          onClickCapture={handleCaptureClick}
          className={`flex items-stretch select-none ${isMobile ? 'touch-pan-y cursor-grab active:cursor-grabbing' : ''} ${withTransition ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{
            transform: `translateX(calc(-${slideOffset}% + ${dragPx}px))`,
            width: `${(extendedData.length * 100) / visibleCount}%`,
          }}
        >
          {extendedData.map((shoe, i) => (
            <div
              key={`${shoe.id}-${i}`}
              className='px-6 sm:px-3'
              style={{ width: `${100 / extendedData.length}%` }}
            >
              <Link to="/all" className='block h-full group'>
                <div className='relative bg-[#F7F5F0] border border-[#E6E1D7] rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-black/30'>

                  <span className='absolute top-4 left-4 bg-black text-white text-[10px] uppercase tracking-widest font-jakarta font-bold px-3 py-1 rounded-full z-10 shadow-sm'>
                    New
                  </span>

                  <div className='relative flex items-center justify-center p-6 bg-[#EFECE6]/70 overflow-hidden min-h-[200px]'>
                    <img
                      src={shoe.thumbnail}
                      alt={shoe.title}
                      className='h-44 sm:h-40 lg:h-48 max-w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out'
                    />
                  </div>

                  <div className='flex flex-col justify-between p-5 flex-1 gap-3 bg-[#F7F5F0]'>
                    <div className='flex flex-col gap-1'>
                      <span className='font-jakarta text-[11px] uppercase tracking-widest text-gray-500 font-semibold'>
                        {shoe.brand || shoe.tags?.[0] || 'Classic'}
                      </span>
                      <h3 className='font-jakarta font-bold text-sm uppercase tracking-wide text-gray-950 line-clamp-1 group-hover:text-black transition-colors'>
                        {shoe.title}
                      </h3>
                    </div>

                    <div className='flex items-center justify-between pt-2 border-t border-[#E6E1D7]/70'>
                      <span className='font-jakarta text-base font-extrabold text-gray-950'>
                        {currencyFormatter.format(shoe.price)}
                      </span>
                      <span className='text-xs font-jakarta font-bold uppercase tracking-wider text-black group-hover:underline flex items-center gap-1'>
                        Explore &rarr;
                      </span>
                    </div>
                  </div>

                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default BestSellers