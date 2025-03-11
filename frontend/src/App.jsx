import React from 'react'
import {BrowserRouter, Route,Routes} from 'react-router-dom'

import Layout from '../layout/layout'
import Home from './pages/Home'
import Cart from './pages/Cart'

import Failure from './paymentGateway/paymentStatus/failure/Failure'
import Success from './paymentGateway/paymentStatus/success/success'
import Thankyou from './pages/Thankyou'

const App = () => {
  return (
    <>
 <BrowserRouter>
 <Routes>

  <Route path="/" element={<Layout/>} >
  <Route  path='home' element={<Home/>}/>
  <Route  index element={<Home/>}/>
  <Route path='cart' element={<Cart/>}/>
  <Route path='success' element={<Success/>}/>
  <Route path='cart' element={<Failure/>}/>
  <Route path='thankyou' element={<Thankyou/>}/>

         

  </Route>
 </Routes>
 </BrowserRouter>  
    
    </>
  )
}

export default App