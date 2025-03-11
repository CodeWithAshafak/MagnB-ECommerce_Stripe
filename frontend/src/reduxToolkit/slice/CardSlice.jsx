import { createSlice } from "@reduxjs/toolkit";
const cardSlice = createSlice({
  name:'mycard',
  initialState:{
    cart:[]
  },
  reducers:{
    addToCard:(state , actions)=>{
      console.log(actions.payload);
    //   state.cart.push(actions.payload)
     const data = state.cart.filter(key=>key.id==actions.payload.id)
     console.log(data);

     if(data.length>=1)
     {
      alert("item already in cart")
     }
     else{
      state.cart.push(actions.payload)
     }
    }
    ,
    qntyInc:(state ,actions)=>{
      console.log(actions.payload);
      for(var i=0; i<state.cart.length; i++)
        {
        if(state.cart[i].id===actions.payload.id)
        {
          state.cart[i].qnty++;
        }
      }
    },
    qntyDec:(state, actions)=>{
      // console.log(actions.payload);
      for(var i=0 ; i <state.cart.length;i++)
      {
        if(state.cart[i].id == actions.payload.id)
        {
          if(state.cart[i].qnty<=1)
          {
            alert("quanity not less than 0")
          }
          else{
            state.cart[i].qnty--
          }
        }
      }
    }
    ,
    Idelete:(state, actions)=>{
      console.log(actions.payload);
      state.cart= state.cart.filter(key=>key.id!=actions.payload.id)
      
    }
  }
})

export const {addToCard , qntyInc ,qntyDec ,Idelete } = cardSlice.actions;
export default cardSlice.reducer 