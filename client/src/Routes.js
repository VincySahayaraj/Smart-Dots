import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import AdminRoute from './auth/AdminRoute'
import PrivateRoute from './auth/PrivateRoute'
import {AuthProvider} from './globalStates'
import {StateProvider} from './cartProvider'

import Home from './core/Home'
import Login from './core/Login'
import ProdDetails from './core/ProductDetails'

import Automower from './core/Automower'
import Residential from './core/Residential'
import Services from './core/Services'
import Commercial from './core/Commercial'
import SmartIrrigation from './core/SmartIrrigation'
import AboutUs from './core/AboutUs'
import Safely from './core/Safely'

import ReviewOrder from './core/ReviewOrder'
import ShippingDetails from './core/ShippingDetails'
import Checkout from './core/checkout/Checkout'
import ContactUs from './core/ContactUs'
import PaymentSuccess from './core/checkout/PaymentSuccess'
import UserDashboard from './user/UserDashboard'
import ForgotPassword from './user/ForgotPassword'
import ResetPassword from './user/ResetPassword'

import AdminDashboard from './admin/AdminDashboard'
import ManageCategories from './admin/ManageCategories'
import AddCategory from './admin/AddCategory'
import UpdateCategory from './admin/UpdateCategory'

import ManageSuppliers from './admin/ManageSuppliers'
import AddSupplier from './admin/AddSupplier'
import UpdateSupplier from './admin/UpdateSupplier'

import ManageContacts from './admin/ManageContacts'

import ManageProducts from './admin/ManageProducts'
import AddProduct from './admin/AddProduct'
import UpdateProduct from './admin/UpdateProduct'
import ProductDetails from './admin/ProductDetails'
import UpdateInventory from './admin/UpdateInventory'
import AddMasterProduct from './admin/AddMasterProduct'
import AddWebstore from './admin/AddWebstore'

import ManageMaterProducts from './admin/ManageMasterProduct';
import UpdateMasterProduct from './admin/UpdateMasterProduct' 

import ManageUsers from './admin/ManageUsers'
import AddUser from './admin/AddUser'
import UpdateUser from './admin/UpdateUser'
import UserDetails from './admin/UserDetails'

import ManageOrders from './admin/ManageOrders'
import OrderDetails from './admin/OrderDetails'

import ManageCardsAdmin from './admin/ManageCards'

import ManageCoupons from './admin/ManageCoupons';
import AddCoupon from './admin/AddCoupon';
import UpdateCoupon from './admin/UpdateCoupon';
import ManageReturnReq from './admin/ManageReturnReq'

import Managemowers from './admin/Managemowers';
import AddAdminMower from './admin/AddMower';
import UpdateAdminMower from './admin/UpdateMower';

import ManageServices from './admin/ManageServices';
import AddService from './admin/AddService';
import UpdateService from './admin/UpdateService';


import YourOrders from './user/YourOrders';
import AllOrders from './user/AllOrders'
import CancelledOrders from './user/CancelledOrders'
import ManageCards from './user/ManageCards'
import AddCard from './user/AddCard'
import UpdateMower from './user/UpdateMower'
import AllAddress from './user/AllAddress'
import AddMower from './user/AddMower'
import UpdateAddress from './user/UpdateAddress'
import RecentAddress from './user/RecentAddress'
import EditProfile from './user/EditProfile'
import UserOrderDetails from './user/OrderDetails'

import ChangePassword from './user/ChangePassword';
import Store from './core/Store'
import ManageMovers from './user/ManageMovers'


const Routes = () => {
    return (
        <AuthProvider>
            <StateProvider>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/forgotpassword" exact component={ForgotPassword} />
                        <Route path="/reset/:token" exact component={ResetPassword}/>
                      
                        <Route path="/store" exact component={Store} />
                        
                        <Route path="/product-details/:productId" exact component={ProdDetails} />

                        <Route path="/review-order" exact component={ReviewOrder} />
                        <Route path="/shipping-details" exact component={ShippingDetails} />
                        <Route path="/checkout" exact component={Checkout} />

                        <Route path="/success" exact component={PaymentSuccess} />

                        <Route path="/contact-us" exact component={ContactUs} />

                        <Route path="/automower" exact component={Automower} />
                        <Route path="/residential" exact component={Residential} />
                        <Route path="/services" exact component={Services} />
                        <Route path="/commercial" exact component={Commercial} />
                        <Route path="/smart-irrigation" exact component={SmartIrrigation} />
                        <Route path="/about-us" exact component={AboutUs} />
                        <Route path="/safely" exact component={Safely} />

                        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                        <AdminRoute path="/admin/categories" exact component={ManageCategories} />
                        <AdminRoute path="/admin/add/category" exact component={AddCategory} />
                        <AdminRoute path="/admin/update/category/:categoryId" exact component={UpdateCategory} />

                        <AdminRoute path="/admin/suppliers" exact component={ManageSuppliers} />
                        <AdminRoute path="/admin/add/supplier" exact component={AddSupplier} />
                        <AdminRoute path="/admin/update/supplier/:supplierId" exact component={UpdateSupplier} />

                        <AdminRoute path="/admin/contacts" exact component={ManageContacts} />
                        <AdminRoute path="/admin/add/master/product" exact component={AddMasterProduct} />
                      {/*   <AdminRoute path="/admin/add/product" exact component={AddProduct} /> */}
                        <AdminRoute path="/admin/add/webstore" exact component={AddWebstore} />
                        <AdminRoute path="/admin/update/product/:productId" exact component={UpdateProduct} />
                        <AdminRoute path="/admin/products" exact component={ManageProducts} />
                        <AdminRoute path="/admin/product/details/:productId" exact component={ProductDetails} />
                        <AdminRoute path="/admin/update/inventory/:productId" exact component={UpdateInventory} />

                        <AdminRoute path="/admin/master-products" exact component={ManageMaterProducts} />
                        <AdminRoute path="/admin/update-master-product/:productId" exact component={UpdateMasterProduct} />

                        <AdminRoute path="/admin/users" exact component={ManageUsers} />
                        <AdminRoute path="/admin/add/user" exact component={AddUser} />
                        <AdminRoute path="/admin/update/user/:userId" exact component={UpdateUser} />

                        <AdminRoute path="/admin/mowers" exact component={Managemowers} />
                        <AdminRoute path="/admin/add/mower" exact component={AddAdminMower} />
                        <AdminRoute path="/admin/update/mower/:mowerId" exact component={UpdateAdminMower} />

                        <AdminRoute path="/admin/services" exact component={ManageServices} />
                        <AdminRoute path="/admin/add/service" exact component={AddService} />
                        <AdminRoute path="/admin/update/service/:serviceId" exact component={UpdateService} />
                        
                        <AdminRoute path="/admin/orders" exact component={ManageOrders} />
                        <AdminRoute path="/admin/order/details/:orderId/:userId" exact component={OrderDetails} />
                        <AdminRoute path="/admin/cards" exact component={ManageCardsAdmin} />
                        <AdminRoute path="/admin/coupons" exact component={ManageCoupons} />
                        <AdminRoute path="/admin/coupon/update/:couponId" exact component={UpdateCoupon} />
                        <AdminRoute path="/create/coupon" exact component={AddCoupon} />
                        <AdminRoute path="/admin/return/requests" exact component={ManageReturnReq} />
                        <AdminRoute path="/admin/user/details/:userId" exact component={UserDetails} />

                        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                        <PrivateRoute path="/user/yourorders" exact component={YourOrders} />
                        <PrivateRoute path="/user/allorders" exact component={AllOrders} />
                        <PrivateRoute path="/user/cancelled/orders" exact component={CancelledOrders} />
                        <PrivateRoute path="/user/manage/cards" exact component={ManageCards} />
                        <PrivateRoute path="/user/manage/mowers" exact component={ManageMovers} />
                        <PrivateRoute path="/user/add/card" exact component={AddCard} />
                        <PrivateRoute path="/user/add/mower" exact component={AddMower} />
                        <PrivateRoute path="/user/update/mower/:mowerId" exact component={UpdateMower} />
                        <PrivateRoute path="/user/all/address" exact component={AllAddress} />
                        <PrivateRoute path="/user/update/address/:shippingId/:testValue" exact component={UpdateAddress} />
                        <PrivateRoute path="/user/recent/address" exact component={RecentAddress} />
                        <PrivateRoute path="/user/edit/profile" exact component={EditProfile} />
                        <PrivateRoute path="/user/changepassword" exact component={ChangePassword} />
                        <PrivateRoute path="/user/view-more/:orderId" exact component={UserOrderDetails} />
                        
                    </Switch>
                </BrowserRouter>
            </StateProvider>
        </AuthProvider>  
    )
}

export default Routes