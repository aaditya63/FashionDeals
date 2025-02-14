import { Route, Routes } from "react-router-dom"
import React from "react"
import AuthLayout from "./components/auth/layout"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import AdminLayout from "./components/admin-view/layout"
import AdminDashboard from "./pages/admin-view/dashboard"
import AdminFeatures from "./pages/admin-view/features"
import AdminOrders from "./pages/admin-view/orders"
import AdminProducs from "./pages/admin-view/products"
import ShoppingLayout from "./components/shopping-view/layout"
import ShoppingAccount from "./pages/shopping-view/account"
import ShoppingCheckout from "./pages/shopping-view/checkout"
import ShoppingHome from "./pages/shopping-view/home"
import ShoppingListing from "./pages/shopping-view/listing"

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* {Commmon Components} */}
      <Routes>
        <Route path="/auth" element={<AuthLayout />} >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="dashboard" element={<AdminDashboard/>}/>
          <Route path="features" element={<AdminFeatures/>}/>
          <Route path="orders" element={<AdminOrders/>}/>
          <Route path="products" element={<AdminProducs/>}/>
        </Route>

        <Route path="/shop" element={<ShoppingLayout/>}>
          <Route path="account" element={<ShoppingAccount/>}/>
          <Route path="checkout" element={<ShoppingCheckout/>}/>
          <Route path="home" element={<ShoppingHome/>}/>
          <Route path="listing" element={<ShoppingListing/>}/>
        </Route>

        {/* <Route path="*" element={<notfound/>}/> */}

      </Routes> 
    </div>
  )
}

export default App
