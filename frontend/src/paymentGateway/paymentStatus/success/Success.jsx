import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {

 const navigate = useNavigate()
 

 useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/thankyou');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]); 

  return (
    <>

    <div style={{height:"300px"}} >
        
            <h1 style={{textAlign:"center"}}> Your Payment is Successfully  Done </h1>
    </div>
    

    </>
  )
}

export default Success