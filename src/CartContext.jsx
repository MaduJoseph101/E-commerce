import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const CartContext = createContext(null)

const CART_STORAGE_KEY = 'allshoes_cart'
const WISHLIST_STORAGE_KEY = 'allshoes_wishlist'

// REQUIRED FEILDS BEFORE EVERY CART ITEM MUST HAVE
const REQUIRED_CART_FIELDS = ['key', 'id', 'title', 'price', 'thumbnail', 'size', 'color', 'quantity']

function isValidCartItem(item) {
  if (!item || typeof item !== 'object') return false
  return REQUIRED_CART_FIELDS.every((field) => field in item)
}

function loadCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isValidCartItem)
  } catch (error) {
    console.error(`Failed to load cart from localStorage, resetting it:`, error)
    localStorage.removeItem(CART_STORAGE_KEY)
    return []
  }
}

const REQUIRED_WISHLIST_FIELDS = ['id', 'title', 'price', 'thumbnail']

function isValidWishlistItem(item) {
  if (!item || typeof item !== 'object') return false
  return REQUIRED_WISHLIST_FIELDS.every((field) => field in item)
}

function loadWishlist() {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isValidWishlistItem)
  } catch (error) {
    console.error(`Failed to load wishlist from localStorage, resetting it:`, error)
    localStorage.removeItem(WISHLIST_STORAGE_KEY)
    return []
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Failed to save cart to localStorage (quota exceeded or unavailable):', error)
  }
}

function saveWishlist(items) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Failed to save wishlist to localStorage (quota exceeded or unavailable):', error)
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart)
  const [wishlistItems, setWishlistItems] = useState(loadWishlist)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  
  //UNDO STATE FOR ITEM REMOVAL
  const [lastRemovedItem, setLastRemovedItem] = useState(null)
  const [undoToastVisible, setUndoToastVisible] = useState(false)

  // SYNC TO LOCALSTORAGE
  useEffect(() => {
    saveCart(cartItems)
  }, [cartItems])

  useEffect(() => {
    saveWishlist(wishlistItems)
  }, [wishlistItems])

  // DRAWER AND CHECKOUT CONTROLS
  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])
  const openCheckout = useCallback(() => {
    setIsDrawerOpen(false)
    setIsCheckoutOpen(true)
  }, [])
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), [])

  // ITEM STOCK LIMIT RESTRICTION
  const addToCart = useCallback((product, size, color, openDrawerAfter = true) => {
    const stockLimit = product.stock ?? 99
    let maxReached = false

    setCartItems((prev) => {
      const key = `${product.id}-${size}-${color.name}`
      const existing = prev.find((i) => i.key === key)
      
      if (existing) {
        if (existing.quantity >= stockLimit) {
          maxReached = true
          return prev
        }
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: Math.min(stockLimit, i.quantity + 1) } : i
        )
      }

      return [
        ...prev,
        {
          key,
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          brand: product.brand || 'AllShoes',
          size,
          color,
          stock: stockLimit,
          quantity: 1,
        },
      ]
    })

    if (openDrawerAfter && !maxReached) {
      setIsDrawerOpen(true)
    }

    return !maxReached
  }, [])

  // Remove item with undo snapshot
  const removeFromCart = useCallback((key) => {
    setCartItems((prev) => {
      const itemToRemove = prev.find((i) => i.key === key)
      if (itemToRemove) {
        setLastRemovedItem(itemToRemove)
        setUndoToastVisible(true)
      }
      return prev.filter((i) => i.key !== key)
    })
  }, [])

  // UNDO REMOVE OPERATION
  const undoRemove = useCallback(() => {
    if (!lastRemovedItem) return
    setCartItems((prev) => {
      const existing = prev.find((i) => i.key === lastRemovedItem.key)
      if (existing) return prev
      return [...prev, lastRemovedItem]
    })
    setLastRemovedItem(null)
    setUndoToastVisible(false)
  }, [lastRemovedItem])

  const dismissUndoToast = useCallback(() => {
    setUndoToastVisible(false)
  }, [])

  // Update quantity with stock limit enforcement
  const updateQuantity = useCallback((key, delta) => {
    setCartItems((prev) =>
      prev
        .map((i) => {
          if (i.key !== key) return i
          const maxStock = i.stock ?? 99
          const newQty = Math.min(maxStock, Math.max(0, i.quantity + delta))
          return { ...i, quantity: newQty }
        })
        .filter((i) => i.quantity > 0)
    )
  }, [])

  // CLEAR CART
  const clearCart = useCallback(() => {
    setCartItems([])
    localStorage.removeItem(CART_STORAGE_KEY)
  }, [])

  //WISHLIST TOAST AND UNDO STATE
  const [lastRemovedWishlistItem, setLastRemovedWishlistItem] = useState(null)
  const [wishlistToast, setWishlistToast] = useState({
    visible: false,
    message: '',
    item: null,
    action: 'added',
  })

  const dismissWishlistToast = useCallback(() => {
    setWishlistToast((prev) => ({ ...prev, visible: false }))
  }, [])

  const undoWishlistRemove = useCallback(() => {
    if (!lastRemovedWishlistItem) return
    setWishlistItems((prev) => {
      const exists = prev.some((i) => i.id === lastRemovedWishlistItem.id)
      if (exists) return prev
      return [...prev, lastRemovedWishlistItem]
    })
    setLastRemovedWishlistItem(null)
    setWishlistToast((prev) => ({ ...prev, visible: false }))
  }, [lastRemovedWishlistItem])

  // WISHLIST TOGGLE AND HELPERS
  const toggleWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((i) => i.id === product.id)
      if (exists) {
        const itemToRemove = prev.find((i) => i.id === product.id) || product
        setLastRemovedWishlistItem(itemToRemove)
        setWishlistToast({
          visible: true,
          message: `Removed "${product.title}" from saved items`,
          item: itemToRemove,
          action: 'removed',
        })
        return prev.filter((i) => i.id !== product.id)
      } else {
        const newItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          brand: product.brand || 'AllShoes',
        }
        setWishlistToast({
          visible: true,
          message: `Saved "${product.title}" for later!`,
          item: newItem,
          action: 'added',
        })
        return [...prev, newItem]
      }
    })
  }, [])

  const isInWishlist = useCallback((id) => {
    return wishlistItems.some((i) => i.id === id)
  }, [wishlistItems])

  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        undoRemove,
        undoToastVisible,
        dismissUndoToast,
        lastRemovedItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        toggleWishlist,
        isInWishlist,
        wishlistToast,
        dismissWishlistToast,
        undoWishlistRemove,
        lastRemovedWishlistItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
