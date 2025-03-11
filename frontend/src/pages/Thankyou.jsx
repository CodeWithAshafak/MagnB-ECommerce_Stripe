import React from 'react'

import "../css/thankyou.css"
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
const Thankyou = () => {
  const navigate = useNavigate()
  return (
   <>
      <Container className='ThankyouWrapper'>


       `<h1>Thank You For Your Order </h1>

       <Button variant="secondary" onClick={()=>{navigate('/home')}}>Home</Button>

      </Container>
   
   </>
  )
}

export default Thankyou