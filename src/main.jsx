import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Commerce.css'
import Header from './Header'
import Homepage from './Homepage'
import MenProducts from './MenProducts'
import WomenProduct from './WomenProduct'
import  AllProduct  from './AllProduct'

import { BrowserRouter, Routes, Route} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/all' element={<AllProduct/>}/>
        <Route path='/men' element={<MenProducts/>}/>
        <Route path='/women' element={<WomenProduct/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

