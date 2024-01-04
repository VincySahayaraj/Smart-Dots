import { fetchConfig } from '../auth/fetchInterceptor';
import {API} from '../config';


/**
 * to perform crud on product
 * get all product
 * get a single product
 * update single product
 * delete single product
 */

 export const getProductsByCategory = (category) => {
    return fetch(`${API}/get/product/category`,{
        method: "POST",
        headers: fetchConfig,
        body:JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}


export const getProducts = ()=>{
    return fetch(`${API}/products`,{
        method:"GET",
        fetchConfig
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}


export const getDetails = (id)=>{
    return fetch(`${API}/product/${id}`,{
        method:'GET',
        fetchConfig
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

export const getCategories = () => {
    return fetch(`${API}/store/categories`, {
        method: 'GET',
        fetchConfig
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * to perform crud on contact
 * get all contact
 * get a single contact
 * update single contact
 * delete single contact
 */

export const createContact = (contact) => {
    return fetch(`${API}/contact`,{
        method: "POST",
        headers: fetchConfig,
        body:JSON.stringify(contact)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

/**
 * to perform crud on order
 * get all order
 * get a single order
 * update single order
 * delete single order
 */

export const addOrder = async (order) => {
    
    return await fetch(`${API}/create/order`,{
        method: "POST",
        headers:fetchConfig,
        body:JSON.stringify(order)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};

export const addUserOrder = async (order) => {
    
    return await fetch(`${API}/user/create/order`,{
        method: "POST",
        headers: fetchConfig,
        body:JSON.stringify(order)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};

export const getOrderDetails = async (order) => {
    
    return await fetch(`${API}/order/details`,{
        method: "POST",
        headers:fetchConfig,
        body:JSON.stringify(order)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};

export const getOrderDate=async(id)=>{

    return await fetch(`${API}/order/userid`,{
        method: "POST",
        headers:fetchConfig,
        body:JSON.stringify(id)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const updateOrderSts = (orderId, status, paymentId) => {
    return fetch(`${API}/update/order/status`, {
        method: "POST",
        headers: fetchConfig,
        body: JSON.stringify({ 
                'orderId' : String(orderId),
                'status' : String(status),
                'paymentId' : String(paymentId),
                })
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}; 

export const checkMiles = (zip) => {
    return fetch(`${API}/check/miles`,{
        method: "POST",
        headers: fetchConfig,
        body:JSON.stringify(zip)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

/* export const getMiles = async ()=>{
    return await fetch(`https://www.zipcodeapi.com/rest/cWRtb9wPzdXwNMNgsd685zciUK2zrX4wXf3mAvBocJBstuFGrcC6kq0SRkPyzU5y/distance.json/75036/75033/miles`,{     
        method:"GET",
        
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
} */

/**
 * to perform crud on User
 * get all User
 * get a single User
 * update single User
 * delete single User
 */

export const updateCustomerId = async (user) => {
    return await fetch(`${API}/user/update/customerid`, {
        method: 'PUT',
        headers: fetchConfig,
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

/**
 * to perform crud on Payment Card
 * get all Payment Card
 * get a single Payment Card
 * update single Payment Card
 * delete single Payment Card
 */

export const createCardDetail = (card) => {
    return fetch(`${API}/create/card-detail`, {
        method: 'POST',
        headers:fetchConfig,
        body: JSON.stringify(card)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getActiveCardsById = (card) => {
    return fetch(`${API}/list/active/cards`, {
        method: 'POST',
        headers: fetchConfig,
        body: JSON.stringify(card)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

/**
 * to perform crud on Shipping Address
 * get all Shipping Address
 * get a single Shipping Address
 * update single Shipping Address
 * delete single Shipping Address
 */

 export const getShippingByUser = (card) => {
    return fetch(`${API}/user/shipping/address`, {
        method: 'POST',
        headers: fetchConfig,
        body: JSON.stringify(card)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};




export const loadMainImage = (id) => {
    return fetch(`${API}/image/mainImage`, {
        method: 'POST',
        headers: fetchConfig,
        body: id
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};