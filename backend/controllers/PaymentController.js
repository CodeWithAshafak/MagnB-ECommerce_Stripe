
const stripe = require("stripe")(process.env.SECRET_KEY)


const OrderModel = require("../model/orderDetailsModel")
const payment = async(req,res)=>{
  console.log(req.body);
  const {products,CustomerData} = req.body
  const origin = req.headers.origin;
  console.log("origin is",origin);
  

  try {


    const lineItems = products.map((key)=>({
      price_data:{
        currency :"USD",
        product_data:{
          name:key.title
        },
        unit_amount: Math.round(key.price * 100) || 0,
      },
      quantity : key.qnty
     
    }))


    const session = await stripe.checkout.sessions.create({   
      payment_method_types:["card"],
      line_items:lineItems,

      mode:"payment",
      success_url:`${origin}/success`,
      cancel_url:`${origin}/cancel`,
    });

    

     const orders = await OrderModel.create({


      transaction_id: session.id,
      email:CustomerData.email,
      name:CustomerData.name,
      address:CustomerData.address,

      purchased_items:products.map((key)=>({
       id:key.id,
      category:key.category,
      price:key.price,
      title:key.title,
      qnty:key.qnty,
      image:key.image,
      }
        )
        
      )
  
     })

     res.json({id:session.id})
    

  } catch (error) {

   console.log(error);
   res.send({msg:"error aa gyi"}) 
  }
}
module.exports= {
  payment
}


