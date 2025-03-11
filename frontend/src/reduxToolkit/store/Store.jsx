import { configureStore } from "@reduxjs/toolkit"
import CardSlice from "../slice/CardSlice"
const Store = configureStore({
  reducer:{
    mycard :CardSlice
  }
})



export default Store