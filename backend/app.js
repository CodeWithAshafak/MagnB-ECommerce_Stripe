const express=require("express")
const app=express();
require("dotenv").config()
const cors=require("cors")

const port=process.env.PORT 
const dbcon=process.env.DBCON 

const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const PaymentRoute = require("./Routes/PaymentRoute")
mongoose.connect(dbcon).then((res)=>{
    console.log("DB Conneced");
})


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(express.json())
app.use("/api/create-checkout-session" , PaymentRoute)

app.listen(port , ()=>{
    console.log(`server run on ${port}`)
})