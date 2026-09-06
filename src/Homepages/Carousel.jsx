import React, { useState, useRef, useLayoutEffect } from 'react'
import MenButton from '../Props/MenButton'
import WomenButton from '../Props/WomenButton'
import NewArrivals from '../Props/NewArrivals'

function getRouteFromLabel(label) {
  const normalised = label.trim()
  if (normalised === 'Shop Men') return '/men'
  if (normalised === 'Shop Women') return '/women'
  return '/all'
}

function ExpandOnHover({ show, delay = 0, children }) {
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)
  const [clip, setClip] = useState(true)

  useLayoutEffect(() => {
    const node = contentRef.current
    if (!node) return

    if (show) {
      setClip(true)
      setHeight(node.scrollHeight)
      const timer = setTimeout(() => setClip(false), 300 + delay)
      return () => clearTimeout(timer)
    } else {
      const currentHeight = node.scrollHeight
      setClip(true)
      setHeight(currentHeight)

      let innerRaf
      const outerRaf = requestAnimationFrame(() => {
        innerRaf = requestAnimationFrame(() => {
          setHeight(0)
        })
      })

      return () => {
        cancelAnimationFrame(outerRaf)
        if (innerRaf) cancelAnimationFrame(innerRaf)
      }
    }
  }, [show, delay])

  return (
    <div
      style={{
        maxHeight: clip ? height : 'none',
        transitionDelay: show ? `${delay}ms` : '0ms',
      }}
      className={`${clip ? 'overflow-hidden' : 'overflow-visible'} transition-[max-height] duration-300 ease-in-out w-full flex justify-center ${show ? '' : 'pointer-events-none'}`}
    >
      <div ref={contentRef} className='pt-3'>
        {children}
      </div>
    </div>
  )
}

function CarouselCard({ bgImage, mainLabel, secondaryLabel, tertiaryLabel }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='relative flex justify-center  items-center flex-col bg-blend-darken transition-all ease-in-out duration-300 text-white bg-[#00000029] bg-bl rounded-3xl bg-cover bg-center overflow-hidden py-8 px-4'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div>
        <MenButton MenButton={mainLabel} to={getRouteFromLabel(mainLabel)} />
      </div>

      <ExpandOnHover show={isHovered}>
        <WomenButton WomenButton={secondaryLabel} to={getRouteFromLabel(secondaryLabel)} />
      </ExpandOnHover>

      <ExpandOnHover show={isHovered} delay={50}>
        <NewArrivals NewArrivals={tertiaryLabel} to={getRouteFromLabel(tertiaryLabel)} />
      </ExpandOnHover>
    </div>
  )
}

const CARDS = [
  {
    id: 'blue-card',
    bgImage: 'Blue.jpg',
    mainLabel: 'New Arrivals',
    secondaryLabel: 'Shop Women',
    tertiaryLabel: 'Shop Men',
  },
  {
    id: 'brown-card',
    bgImage: 'Brown.jpg',
    mainLabel: 'Shop Men',
    secondaryLabel: 'Shop Women',
    tertiaryLabel: 'New Arrivals',
  },
  {
    id: 'green-card',
    bgImage: 'Green.jpg',
    mainLabel: 'Best Sellers',
    secondaryLabel: 'Shop Men',
    tertiaryLabel: 'New Arrivals',
  },
  {
    id: 'pink-card',
    bgImage: 'Pink.jpg',
    mainLabel: 'Shop Women',
    secondaryLabel: 'Best Sellers',
    tertiaryLabel: 'New Arrivals',
  },
]

function Carousel() {
  return (
     <section className={`w-[100%] mb-6  h-[90vh] md:h-[100vh] lg:h-[60vh] bg-[#ECE9E2] grid-cols-1 grid md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-3 px-5 sm:px-2 `}>
      {CARDS.map((card) => (
        <CarouselCard
          key={card.id}
          bgImage={card.bgImage}
          mainLabel={card.mainLabel}
          secondaryLabel={card.secondaryLabel}
          tertiaryLabel={card.tertiaryLabel}
        />
      ))}
    </section>
  )
}

export default Carousel