import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/home.css";
import { Container } from "react-bootstrap";
import { useSelector , useDispatch } from "react-redux";
import {addToCard} from "../reduxToolkit/slice/CardSlice"


const Home = () => {
  const [mydata, setMydata] = useState([]);
  const dispatch =  useDispatch()
 
  const laodPro = async () => {
    let api = "https://fakestoreapi.com/products";
    let response = await axios.get(api);
    console.log(response.data);
    setMydata(response.data);
    console.log(mydata);
  };

  const result = mydata.map((key) => {
    return (
      <>
        <Card
          style={{
            width: "18rem",
            backgroundColor: "pink",
            borderRadius: "20px",
            margin:"30px"
          }}
        >
          <Card.Img variant="top" src={key.image} id="img" />
          <Card.Body>
            <Card.Title>{key.title}</Card.Title>
            <Card.Text>{key.category}</Card.Text>
            <Card.Text>
              {/* {key.description} */}
              {key.description.length > 80
                ? key.description.substring(0, 80) + "..."
                : key.description}
            </Card.Text>
            <Card.Text>
              <h3> ${key.price}</h3>
            </Card.Text>
            <Button variant="primary" onClick={()=>{dispatch(addToCard({id:key.id,category:  key.category, description : key.description ,image:key.image,price:key.price,title:key.title , qnty:1} ))}} >Add to Card</Button>
          </Card.Body>
        </Card>
      </>
    );
  });

  useEffect(() => {
    laodPro();
  }, []);
  return (
    <>
      <Container fluid className="cardMain">
        <div className="cardHeading">
          <h3>Trending Products</h3>
        </div>
        <div className="cardWrapper">{result}</div>
      </Container>
    </>
  );
};

export default Home;
