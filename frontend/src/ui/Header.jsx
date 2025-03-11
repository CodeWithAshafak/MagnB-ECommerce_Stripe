import React from 'react'
import Button from 'react-bootstrap/Button';
import "../css/header.css"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

import { FaCartArrowDown } from "react-icons/fa";
import {  useSelector } from 'react-redux';


const Header = () => {

  const navigate = useNavigate();
  const cart= useSelector((state)=>state.mycard.cart)
  console.log(cart);
  const Mylen =  cart.length
  console.log(Mylen);
  return (
    <>
    
    <Navbar expand="lg" className="bg-body-tertiary" id='header'>
      <Container fluid>
        <Navbar.Brand href="#">Digito</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>
          <Nav.Link as={Link} to='home'>Home</Nav.Link>

          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>


          <Nav>

            <Nav.Link>

           

            <FaCartArrowDown id='carticons' onClick={()=>{navigate('/cart')}}/>
              <span 
              style={{fontSize:"20px"}}
              >

                {Mylen>0?Mylen:""} 
                
                
                </span>


            </Nav.Link>

          </Nav>
          


        </Navbar.Collapse>

        
        
       
      </Container>
    </Navbar>
    
    </>
  )
}

export default Header