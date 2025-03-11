import React from 'react'
import Header from '../src/ui/Header'
import Footer from '../src/ui/Footer'
import {Outlet} from 'react-router-dom'  

const Layout = () => {
  return (
    <>
    
    <Header/>
   <Outlet/>
   <Footer/>
    
    </>
  )
}

export default Layout




