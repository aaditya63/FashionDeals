import { Route, Routes } from "react-router-dom"
import React, { useEffect } from "react"
import AuthLayout from "./components/auth/layout"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import AdminLayout from "./components/admin-view/layout"
import AdminDashboard from "./pages/admin-view/dashboard"
import AdminFeatures from "./pages/admin-view/features"
import AdminOrders from "./pages/admin-view/orders"
import AdminProducts from "./pages/admin-view/products"
import ShoppingLayout from "./components/shopping-view/layout"
import ShoppingAccount from "./pages/shopping-view/account"
import ShoppingCheckout from "./pages/shopping-view/checkout"
import ShoppingHome from "./pages/shopping-view/home"
import ShoppingListing from "./pages/shopping-view/listing"
import CheckAuth from "./components/common/checkAuth"
import UnauthPage from "./pages/unauth-page"
import NotFoundPage from "./pages/notfound-page"
import { useDispatch, useSelector } from "react-redux"
import { checkAuthMiddleware } from "./store/auth-slice"
import { Skeleton } from "@/components/ui/skeleton"


function App() {

  const {isAuthenticated,user, isLoading} = useSelector(state=>state.auth);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuthMiddleware())
  },[dispatch])

  if(isLoading){
    return <Skeleton className="w-[100px] h-[20px] bg-black rounded-full" />
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* {Commmon Components} */}
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>


        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>


        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
        </Route>

        <Route path="/unauth" element={<UnauthPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>

      </Routes>
    </div>
  )
}

export default App
