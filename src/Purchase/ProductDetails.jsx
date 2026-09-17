import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaStar, FaTruck, FaShieldAlt, FaArrowLeft } from 'react-icons/fa'
import ProductsDisplay from './ProductsDisplay'

const MENS_SIZES = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15]
const OUT_OF_STOCK_SIZES = [12, 15]

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        if (!res.ok) {
          throw new Error('Product not found')
        }
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
    window.scrollTo(0, 0)
  }, [id])

  const colors = [
    { name: 'Natural Black (Classic Edition)', bg: 'bg-[#2b2b2b]', border: 'border-black' },
    { name: 'Charcoal Gray (Limited Edition)', bg: 'bg-[#525252]', border: 'border-gray-500' },
    { name: 'Blizzard White', bg: 'bg-[#f5f5f5]', border: 'border-gray-300' },
  ]

  const handleAddToCart = () => {
    if (!selectedSize) return
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 4000)
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-[#ECE9E2] font-jakarta py-10 px-4 sm:px-8'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse'>
          <div className='lg:col-span-7 space-y-4'>
            <div className='w-full h-[450px] bg-gray-300 rounded-3xl' />
            <div className='flex gap-3'>
              <div className='w-20 h-20 bg-gray-300 rounded-2xl' />
              <div className='w-20 h-20 bg-gray-300 rounded-2xl' />
              <div className='w-20 h-20 bg-gray-300 rounded-2xl' />
            </div>
          </div>
          <div className='lg:col-span-5 bg-white p-8 rounded-3xl space-y-6'>
            <div className='h-8 bg-gray-300 rounded w-3/4' />
            <div className='h-4 bg-gray-200 rounded w-1/2' />
            <div className='h-8 bg-gray-300 rounded w-1/3' />
            <div className='h-32 bg-gray-200 rounded-2xl' />
            <div className='h-14 bg-gray-300 rounded-full' />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className='min-h-[70vh] bg-[#ECE9E2] font-jakarta flex flex-col items-center justify-center px-4'>
        <div className='bg-white rounded-3xl p-8 max-w-md text-center space-y-4 shadow-sm'>
          <h2 className='text-2xl font-bold text-gray-900'>Product Not Found</h2>
          <p className='text-gray-600 text-sm'>The product you are looking for does not exist or has been removed.</p>
          <Link to='/' className='inline-block bg-black text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-80 transition-opacity'>
            Back to Homepage
          </Link>
        </div>
      </div>
    )
  }

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.thumbnail]

  return (
    <div className='min-h-screen bg-[#ECE9E2] font-jakarta py-8 px-4 sm:px-8'>
      <div className='max-w-6xl mx-auto space-y-8'>
        
        {/* BACK BUTTON*/}
        <div>

          <Link to='' className='inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-black transition-colors'>
            <FaArrowLeft className='text-xs' /> Back to Homepage
          </Link>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
          
          {/* PRODUCT GALLERY */}
          <div className='lg:col-span-7 space-y-4'>

            {/* PRODUCT IMAGE */}
            <div className='relative bg-[#F4F1EA] rounded-3xl p-6 sm:p-10 flex items-center justify-center min-h-[380px] sm:min-h-[480px] border border-gray-200/80 shadow-xs overflow-hidden'>
              <span className='absolute top-6 left-6 bg-white text-gray-900 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs uppercase'>
                Trending
              </span>
              <img 
                src={imagesList[selectedImage] || product.thumbnail} 
                alt={product.title} 
                className='max-h-[380px] sm:max-h-[500px] w-auto object-contain transition-all duration-400 hover:scale-105'
              />
            </div>

            {/* THUMBNAIL NAV*/}
            {imagesList.length > 1 && (
              <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-none'>
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-30 h-20 rounded-2xl bg-[#F4F1EA] p-2 border-gray-500 border-1 shadow-2xs transition-all cursor-pointer flex-shrink-0 flex items-center justify-center ${
                      selectedImage === idx ? 'border-black shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.title} thumbnail ${idx + 1}`} className='max-h-full object-contain' />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRODUCT INFO*/}
          <div className='lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm border border-gray-200/70'>
            
            <div className='space-y-3'>
              <h1 className='text-2xl sm:text-2xl font-bold text-gray-900 tracking-wide'>
                {product.title}
              </h1>
              <p className='text-xs sm:text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
                Available discount : <span className='text-green-600'>%{product.discountPercentage}</span>
                
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <span className='text-xl font-extrabold text-gray-950'>
                ${product.price}
              </span>
              <span className='bg-[#F4F1EA] text-gray-900 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full'>
                + FREE SHIPPING
              </span>
            </div>

            {/* COLOUR SELECTOR */}
            <div className='space-y-3 pt-2 border-t border-gray-100'>
              <p className='text-xs font-semibold text-gray-700 tracking-wider uppercase'>
                COLOR: <span className='text-gray-950 font-bold'>{colors[selectedColor].name}</span>
              </p>
              <div className='flex gap-3 pt-1'>
                {colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-7 h-7 rounded-full ${color.bg} transition-transform cursor-pointer ${
                      selectedColor === idx ? 'ring-2 ring-offset-2 ring-black scale-110' : 'hover:scale-105'
                    }`}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* GRIDS*/}
            <div className='space-y-3 pt-2 border-t border-gray-100'>
              <div className='flex justify-between items-center text-xs font-semibold tracking-wider text-gray-900 uppercase'>                
              </div>

              <div className='grid grid-cols-4 sm:grid-cols-5 gap-2'>
                {MENS_SIZES.map((size) => {
                  const isOutOfStock = OUT_OF_STOCK_SIZES.includes(size)
                  const isSelected = selectedSize === size

                  return (
                    <button
                      key={size}
                      onClick={() => !isOutOfStock && setSelectedSize(size)}
                      disabled={isOutOfStock}
                      className={`relative h-11 border rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                        isOutOfStock
                          ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                          : isSelected
                          ? 'bg-[#212121] text-white border-[#212121] shadow-xs'
                          : 'border-gray-300 text-gray-900 hover:border-black bg-white'
                      }`}
                    >
                      {size}
                      {/* OUT OF STOCK INDICATOR*/}
                      {isOutOfStock && (
                        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                          <div className='w-full border-t border-gray-300 transform -rotate-45' />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              <div className='text-xs tracking-wide text-gray-500 space-y-2 pt-1'>
                <p>The {product.title} fits true-to-size for most customers.</p>
                <button className='underline font-semibold text-gray-800 hover:text-black cursor-pointer'>
                  Fit Guide
                </button>
              </div>
            </div>

            {/* ADD CART */}
            <div className='pt-2'>
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-sm ${
                  !selectedSize
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#212121] text-white hover:bg-black hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                }`}
              >
                {selectedSize ? `ADD TO CART - $${product.price}` : 'SELECT A SIZE'}
              </button>

              {addedToCart && (
                <div className='mt-2 p-2.5 bg-green-50 text-green-800 text-xs tracking-wide text-center rounded-xl font-bold'>
                  ✓  {product.title} addded to your cart!
                </div>
              )}

              <p className='text-center text-xs text-gray-500 mt-3'>
                Free Shipping on Orders over $100
              </p>
            </div>

            {/* PRODUCT SPECS*/}
            <div className='pt-4 border-t border-gray-100 space-y-3 text-xs text-gray-700'>
              <h4 className='font-bold text-gray-950 uppercase tracking-wider'>Product Details</h4>
              <p className='leading-relaxed text-justify'>{product.description}</p>
              
              <div className='grid grid-cols-2 gap-2 pt-3 text-gray-600'>
                <div><span className='font-semibold text-gray-900'>Brand:</span> {product.brand || 'AllShoes'}</div>
                <div><span className='font-semibold text-gray-900'>Category:</span> {product.category}</div>
                <div><span className='font-semibold text-gray-900'>Rating:</span> ★ {product.rating}</div>
                <div><span className='font-semibold text-gray-900'>Stock:</span> {product.stock} left</div>
                <div><span className='font-semibold text-gray-900'>Warranty:</span> {product.warrantyInformation || '1 year'}</div>
                <div><span className='font-semibold text-gray-900'>Shipping:</span> {product.shippingInformation || '3-5 days'}</div>
              </div>
            </div>

          </div>

        </div>

        {/* CUSTOMER REVIEWS*/}
        {product.reviews && product.reviews.length > 0 && (
          <div className='bg-white rounded-3xl p-6 sm:p-8 space-y-6 mb-5 sm:mb-10 shadow-sm border border-gray-200/70'>
            <h3 className='text-lg font-bold text-gray-950 uppercase tracking-wider'>
              Customer Reviews ({product.reviews.length})
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {product.reviews.map((rev, idx) => (
                <div key={idx} className='p-4 bg-[#F4F1EA]/60 rounded-2xl space-y-2 border border-gray-200/60'>
                  <div className='flex items-center justify-between'>
                    <span className='font-bold text-xs text-gray-900'>{rev.reviewerName}</span>
                    <span className='text-xs text-amber-500 font-bold'>★ {rev.rating}</span>
                  </div>
                  <p className='text-xs text-gray-700 italic'>"{rev.comment}"</p>
                  <p className='text-[10px] text-gray-400'>{new Date(rev.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <ProductsDisplay/>    

    </div>
  )
}

export default ProductDetails