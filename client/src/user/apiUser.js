import { fetchConfig } from "../auth/fetchInterceptor";
import { API } from "../config";
import AddMower from "./AddMower";

// Orders
export const getAlluserOrders = async () => {
  return await fetch(`${API}/get/user/orders`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getRestrictUserOrders = async () => {
  return await fetch(`${API}/get/your/orders`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getCancelledOrders = async () => {
  return await fetch(`${API}/get/cancelled/orders`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const updateCancelStatus = (orderData) => {
  return fetch(`${API}/order/update/cancel/status`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
// Payment Card
export const updateCardStatus = async (card) => {
  return await fetch(`${API}/update/card/status`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(card),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getCardDetailsById = async (card) => {
  return await fetch(`${API}/list/card/details`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(card),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//create mower
export const createMower = (mower) => {
  return fetch(`${API}/create/mower`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(mower),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//update mower
export const updateMower = (mowerId, mower) => {
  return fetch(`${API}/mower/update/${mowerId}`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(mower),
  })
    .then((response) => {
      console.log("response",response);
      return response.json();
    })
    .catch((err) => console.log(err));
};




//Mower
export const getMowers = async () => {
  try {
    const response = await fetch(`${API}/mowers`, {
      method: "GET",
      headers: fetchConfig,
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getMowerDetailsById =  (mowerId) => {
  return  fetch(`${API}/mowers/mowerId/${mowerId}`, {
    method: "GET",
    headers: fetchConfig,
    
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getMowersByUserId =  (userId) => {
  return  fetch(`${API}/mowers/userId/${userId}`, {
    method: "GET",
    headers: fetchConfig,
    
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};







//coupon
export const checkCoupon = (coupons) => {
  return fetch(`${API}/check/coupon`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(coupons),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const checknewUserCoupon = (coupon) => {
  return fetch(`${API}/check/new-user/coupon`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(coupon),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Shipping Address

export const getAllShipping = () => {
  return fetch(`${API}/order/shipping/alladress`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getAddress = (shippingId) => {
  return fetch(`${API}/shipping/${shippingId}`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateAddress = (shippingId, shipping) => {
  return fetch(`${API}/shipping/${shippingId}`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(shipping),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateShippingStatus = (shippingId, status) => {
  return fetch(`${API}/shipping/status/${shippingId}`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(status),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getShippingAdress = () => {
  return fetch(`${API}/order/shipping/adresses`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const updateUser = (user) => {
  return fetch(`${API}/user/updateuser`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// User

export const UpdatePassword = (data) => {
  try{
    return fetch(`${API}/user/updatepassword`, {
      method: "PUT",
      headers: fetchConfig,
      body: JSON.stringify(data),
    })
      .then((response) =>{
        console.log("response is")
        return response.json()
      })
      .catch((err) => console.log("This is err",err));
  }
  catch(err)
  {
    console.log("its an err",err)
  }
 
};

// return
export const createReturnProduct = (returnprod) => {
  return fetch(`${API}/return/product/create`, {
    method: "POST",
    headers: {
      token: JSON.parse(localStorage.getItem("token")),
    },
    body: returnprod,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//forgot password
export const resetPassword = (email) => {
  return fetch(`${API}/reset-password`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(email),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const resetUserPasswordwithToken = (data, token) => {
  return fetch(`${API}/reset/${token}`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//view more order details

export const getUserOrderDetails = (id) => {
  return fetch(`${API}/order/${id}`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const createUserNote = (orderId, data) => {
  return fetch(`${API}/order/addnote`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify({ orderId: orderId, note: data }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getUserNotes = (orderId) => {
  return fetch(`${API}/order/notes/${orderId}`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
