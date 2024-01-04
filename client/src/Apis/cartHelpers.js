import { axiosInstance } from '../auth/axiosInterceptor';
import { fetchConfig } from '../auth/fetchInterceptor';
import {API} from '../config';

export const createCart = (cart) => {
    return fetch(`${API}/cart`,{
        method: "POST",
        headers: fetchConfig,
        body:JSON.stringify(cart)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const getTempUserCart = (cart) => {
    return fetch(`${API}/cart/temp/users`, {
        method: "POST",
        headers: fetchConfig,
        body:JSON.stringify(cart)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const getUserCart = (cart) => {
 
    let token= JSON.parse(localStorage.getItem("token"));
    return fetch(`${API}/cart/users`, {
        method: "POST",
        headers: fetchConfig,
        body:JSON.stringify(cart)
    })
    .then(response => {
        return response.json();
    })
    
    .catch(err => {
        console.log(err);
    })
}

export const removeTempCart = (cart) => {
    return fetch(`${API}/cart/temp/remove`,{
        method: "POST",
        headers: fetchConfig,
        body:JSON.stringify(cart)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const removeUserCart = (cart) => {
    return fetch(`${API}/cart/user/remove`,{
        method: "POST",
        headers: fetchConfig,
        body:JSON.stringify(cart)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const removeCart = (cart) => {
    return fetch(`${API}/cart/remove`,{
        method: "POST",
        headers: fetchConfig,
        body:JSON.stringify(cart)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const updateCart = (cart)=>{
    return fetch(`${API}/cart/update`,{
        method:"PUT",
        headers: fetchConfig,
        body:JSON.stringify(cart)
    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
}

export const updateCartUser = (cart)=>{
    return fetch(`${API}/cart/user/update`,{
        method:"PUT",
        headers: fetchConfig,
        body:JSON.stringify(cart)
    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
}