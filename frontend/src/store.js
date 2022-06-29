import { configureStore} from '@reduxjs/toolkit'
import { cartReducer } from './reducers/cartReducers.js'
import {productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productReviewReducer, productTopRatedReducer, productUpdateReducer} from './reducers/productReducers.js'
import {updateProfileReducer, userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateReducer} from './reducers/userReducers.js'
import {orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderPayReducer, ordersListReducer} from './reducers/orderReducers.js'

const cartItemsFromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")): [] 

const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")): null

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")): {}

const initialState = {
    cart: {cartItems:cartItemsFromLocalStorage,
            shippingAddress: shippingAddressFromLocalStorage
            },
    userLogin: {userInfo: userInfoFromLocalStorage},
}

const store = configureStore( {
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        productDelete: productDeleteReducer,
        productCreate: productCreateReducer,
        productUpdate: productUpdateReducer,
        productReview: productReviewReducer,
        productTopRated: productTopRatedReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userList: userListReducer,
        userDelete: userDeleteReducer,
        userUpdate: userUpdateReducer,
        updateProfile: updateProfileReducer,
        orderCreate: orderCreateReducer,
        orderDetails: orderDetailsReducer,
        orderPay: orderPayReducer,
        orderDeliver: orderDeliverReducer,
        orderList: orderListReducer,
        ordersList: ordersListReducer,
        
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
   })

})


export default store