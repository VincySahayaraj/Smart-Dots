import { API } from "../config";
import { fetchConfig } from "../auth/fetchInterceptor";
import { axiosInstance } from "../auth/axiosInterceptor";
import axios from "axios";
/**
 * to perform crud on category
 * get all category
 * get a single category
 * update single category
 * delete single category
 */

export const createCategory = (category) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return fetch(`${API}/category`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllCategories = () => {
  console.log(fetchConfig);
  return fetch(`${API}/all/categories`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateCategory = (categoryId, category) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "DELETE",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteCategoryStatus = (category) => {
  return fetch(`${API}/remove/category`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//mowers
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




//services
export const getServices = async () => {
  try {
    const response = await fetch(`${API}/services`, {
      method: "GET",
      headers: fetchConfig,
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

//create service
export const createService = (service) => {
  return fetch(`${API}/create/service`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(service),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//update service
export const updateService = (serviceId, service) => {
  return fetch(`${API}/services/update/${serviceId}`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(service),
  })
    .then((response) => {
      console.log("response",response);
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const deleteService = (service,status) => {
  return fetch(`${API}/services/changeStatus`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(service,status),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const getServiceById =  (serviceId) => {
  return  fetch(`${API}/services/serviceId/${serviceId}`, {
    method: "GET",
    headers: fetchConfig,
    
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};



/**
 * to perform crud on supplier
 * get all supplier
 * get a single supplier
 * update single supplier
 * delete single supplier
 */

export const createSupplier = (supplier) => {
  return fetch(`${API}/supplier`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(supplier),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSuppliers = () => {
  return fetch(`${API}/suppliers`, {
    method: "GET",
    fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSupplier = (supplierId) => {
  return fetch(`${API}/supplier/${supplierId}`, {
    method: "GET",
    fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateSupplier = (supplierId, supplier) => {
  return fetch(`${API}/supplier/${supplierId}`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(supplier),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteSupplier = (supplierId) => {
  return fetch(`${API}/supplier/${supplierId}`, {
    method: "DELETE",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/**
 * to perform crud on contact
 * get all contact
 * get a single contact
 * update single contact
 * delete single contact
 */

export const getContacts = () => {
  return fetch(`${API}/contacts`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteContacts = (contactId) => {
  return fetch(`${API}/contact/${contactId}`, {
    method: "DELETE",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getContact = (contactId) => {
  return fetch(`${API}/contact/${contactId}`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/**
 * to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

export const createProduct = (product) => {
  const token = JSON.parse(localStorage.getItem("token"));

  return fetch(`${API}/product`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

/* export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}; */

export const getProducts = () => {
  return fetch(`${API}/products/admin`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateProduct = (productId, product) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return fetch(`${API}/product/${productId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteProduct = (product) => {
  return fetch(`${API}/remove/product`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(product),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getInventoryHist = (invHistory) => {
  return fetch(`${API}/inventory/history`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(invHistory),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateInventory = (invHistory) => {
  return fetch(`${API}/create/inventory/history`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(invHistory),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getItemProducts = () => {
  // Data shows from old SmartDots
  return fetch(`${API}/products/old/smartdots`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const addToSmartDots = (product) => {
  return fetch(`${API}/add/item/smart-dots`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(product),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/**
 * to perform crud on users
 * get all users
 * get a single users
 * update single users
 * delete single users
 */

export const createUser = (user) => {
  return fetch(`${API}/create/user`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUsers = () => {
  return fetch(`${API}/users`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getUser = (userId) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteUser = (user,status) => {
  return fetch(`${API}/user/status`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(user,status),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateUser = (user) => {
  return fetch(`${API}/user/update`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * to perform crud on Orders
 * get all Orders
 * get a single Orders
 * update single Orders
 * delete single Orders
 */

export const createManual = (order) => {
  return fetch(`${API}/order/manual/shipping`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(order),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getOrders = () => {
  console.log("this is fetchconffig", fetchConfig);
  return fetch(`${API}/orders`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getOrderDetails = (orderId) => {
  return fetch(`${API}/order/${orderId}`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getStatusValues = () => {
  return fetch(`${API}/order/status/values`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getOrderLogs = (order) => {
  return fetch(`${API}/order/logs`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(order),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getOrderByUserId = (order) => {
  return fetch(`${API}/admin/get/all/user/orders`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(order),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateOrderStatus = (order) => {
  return fetch(`${API}/admin/order/update/status`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(order),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSubOrdersByOrderid = (order) => {
  return fetch(`${API}/order/suborders`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(order),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getShipment = (order) => {
  return fetch(`${API}/get/shipment-details/orderid`, {
    method: "POST",
    headers: fetchConfig,
    body: JSON.stringify(order),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateShipmentDetails = (shipment) => {
  return fetch(`${API}/update/shipment/details`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(shipment),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateShipmentDetails1 = (shipment) => {
  return fetch(`${API}/update/shipment/details1`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(shipment),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateShipmentPickup = (shipment) => {
  return fetch(`${API}/shipment/update/pickup`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(shipment),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCouponByOrderId = (coupon) => {
  return fetch(`${API}/get/coupon/list/order`, {
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

/**
 * to perform crud on Cards
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

export const getCards = () => {
  return fetch(`${API}/list/cards`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/**
 * to perform crud on coupons
 * create coupon
 * get all coupons
 * get single coupon
 * update coupon
 */

export const createCoupon = (coupon) => {
  return fetch(`${API}/coupon/create`, {
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

export const getCoupons = () => {
  return fetch(`${API}/coupon/lists`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getCoupon = (id) => {
  return fetch(`${API}/coupon/${id}`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const updateCoupon = (couponId, coupon) => {
  return fetch(`${API}/coupon/update/${couponId}`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(coupon),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCouponlogsByCouponId = (coupon) => {
  return fetch(`${API}/get/coupon-logs/list`, {
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

export const getCouponLogs = () => {
  return fetch(`${API}/coupon/logs/lists`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/**
 * to perform crud on returnReq
 * create returnReq
 * get all returnReq
 * get single returnReq
 * update returnReq
 */

export const getReturnRequests = () => {
  return fetch(`${API}/lists/return/requests`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateReturnReq = (returnId, returnReq) => {
  return fetch(`${API}/return/requests/update/${returnId}`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(returnReq),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateOrdReturnStatus = (order) => {
  return fetch(`${API}/return/request/order/status`, {
    method: "PUT",
    headers: fetchConfig,
    body: JSON.stringify(order),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getReturnProd = (orderId) => {
  return fetch(`${API}/get/return/request/order/${orderId}`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// to perform crud on master products

export const getMasterProducts = () => {
  return fetch(`${API}/master-products`, {
    method: "GET",
    headers: fetchConfig,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// product create route

export const uploadImageToServer = async (image) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let formData = new FormData();
  formData.append("file", image);

  const settings = {
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
    onUploadProgress: (progressEvent) => {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
    },
  };

  try {
    let { data } = await axios.post(
      `${API}/admin/upload/image`,
      formData,
      settings
    );

    return data;
    console.log("axios", data);
  } catch (err) {
    let data = err.response.data;
    return data;
  }
};

//multiple image gallery upload route !

export const uploadMultipleImageToServer = async (image) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let formData = new FormData();
  console.log("these are images", image);

  image.forEach((file) => {
    formData.append("gallery", file);
  });

  const settings = {
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
    onUploadProgress: (progressEvent) => {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
    },
  };

  try {
    let { data } = await axios.post(
      `${API}/admin/upload/gallery`,
      formData,
      settings
    );

    return data;
  } catch (err) {
    let data = err.response.data;
    return data;
  }
};

export const updateCouponStatus = async (id, status) => {
  let { data } = await axiosInstance.post(`${API}/coupon/update/status`, {
    id,
    status,
  });

  return data;
};
