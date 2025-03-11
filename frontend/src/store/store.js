import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice'
import adminProductSlice from './admin/products-slice'
import shopppingProductsSlice from './shop/products-slice'
import shopCartSlice from './shop/cart-slice'
import shopAddressSlice from './shop/address-slice'


const store = configureStore({
    reducer:{
        auth : authReducer,
        adminProducts : adminProductSlice,
        shopProducts : shopppingProductsSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice
        
    }
})

export default store