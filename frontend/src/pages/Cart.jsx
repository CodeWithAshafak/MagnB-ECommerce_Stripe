import { Container } from "react-bootstrap";
import "../css/cart.css";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { qntyInc } from "../reduxToolkit/slice/CardSlice";
import { qntyDec } from "../reduxToolkit/slice/CardSlice";
import { Idelete } from "../reduxToolkit/slice/CardSlice";

import { TfiMoney } from "react-icons/tfi";
import Button from "react-bootstrap/Button";
import BASE_URL from "../config";
import { loadStripe } from "@stripe/stripe-js";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";


const Cart = () => {
  const [input , setInput] = useState({})
  const handleInput = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setInput((Values)=>({...Values,[name]:value}))
    console.log(input);
  }

  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.mycard.cart);
  console.log("cartData:-", cartData);

  // payemnt integration
  const handleCheckout = async () => {
    if (!input.name || !input.email || !input.address) {
      alert("Please fill in all required fields before checkout.");
      return;
    }

  try {

  const stripe = await loadStripe(
    "pk_test_51R0pye2fqXyIfHEUpVrrWmOhHzuzA5yQ5fQtf4h9aJiq9oQCXcg1HL8c8xGCawUecsu05vkf7Mai8zLN1Ao3tLBn00q32Drgrc"
  );

  const response = await axios.post(
    `${BASE_URL}/api/create-checkout-session/makepayment`,
    {
      CustomerData: input,
      products: cartData
    }
  );
  console.log('sesstion id is ',response.data);
  
  const session = await response.data;
  console.log("session", session);
  const result = stripe.redirectToCheckout({
    sessionId: session.id,
  });
  if (result.error) {
    console.log(result.error);
    
  }
  
 } catch (error) {
  console.error(error);
  alert(" Got Error in processing payment:", error);

 }


  };

  if (cartData.length === 0) {
    return <h3 className="text-center mt-5 text-muted">Your cart is empty</h3>;
  }

  let sno = 0;
  let totalAmount = 0;
  const result = cartData.map((key) => {
    totalAmount += key.price * key.qnty;
    sno++;
    return (
      <>
        <tr>
          <td>{sno}</td>
          <td>
            <img src={key.image} height="50" width="50" />
          </td>

          <td>{key.title}</td>

          {/* <td>{key.description}</td> */}
          <td> ${key.price}</td>
          <td>
            <FaMinusCircle
              onClick={() => {
                dispatch(qntyDec({ id: key.id }));
              }}
            />

            {key.qnty}

            <FaPlusCircle
              onClick={() => {
                dispatch(qntyInc({ id: key.id }));
              }}
            />
          </td>
          <td>{key.price * key.qnty} </td>
          <td><MdDeleteForever onClick={()=>{dispatch(Idelete({id:key.id}))}} /></td>
        </tr>
      </>
    );
  });
  return (
    <>
      <Container className="cardContainer" fluid>
        <div className="heading">
          <h1>Your Cart</h1>
        </div>

        <div className="subCart">
          <div className="tablewrapper">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>sno</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Totol Amount</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>{result}</tbody>
            </Table>
          </div>

          <div className="cartSummery">
            <h3> Cart Summery </h3>
            <h4>
              Your Total Bill is :<TfiMoney /> {totalAmount.toFixed(2)}
            </h4>

            <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">

          <Form.Label>Enter Name</Form.Label>
          <Form.Control type="text" name="name" value={input.name} onChange={handleInput} />


          <Form.Label> Enter Email </Form.Label>
          <Form.Control type="email"  name="email" value={input.email} onChange={handleInput} />

          <Form.Label> Enter Delivery address</Form.Label>
          <Form.Control type="text"  name="address" value={input.address} onChange={handleInput} />

         
              </Form.Group>
            </Form>

            <Button variant="primary" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};
export default Cart;
