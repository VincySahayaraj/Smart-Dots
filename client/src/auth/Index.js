import { API } from "../config";
import axios from "axios";
import { axiosInstance } from "./axiosInterceptor";
import { fetchConfig } from "./fetchInterceptor";
// send to backend for register

export const register = (user) => {
  return fetch(`${API}/register`, {
    method: "POST",
    headers:fetchConfig,
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = async (user) => {
  let option = {
    headers: fetchConfig
  };

  try {
    let { data } = await axios.post(`${API}/login`, user, option);
    console.log("this is data", data);

    let token = data?.token;
    localStorage.setItem("token", JSON.stringify(token));

    return data;
  } catch (err) {
    let error = err.response.data;
    return error;
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const logout = (next) => {
  let token = JSON.parse(localStorage.getItem("token"));

  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    next();
    return fetch(`${API}/logout`, {
      Authorization: token,
      method: "GET",
    })
      .then((response) => {
        console.log("logout", response);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }
};

/* export const isAuthenticated1 = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
}; */

export const isAuthenticated = async () => {
  console.log("data",API)
  try{
    let auth = await axiosInstance.get(`${API}/isAuth`);
   
    return auth.data;

  }
  catch(err)
  {
    console.log(err)
    return err.response.data
  }

};

export const isAuthenticated2 = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  fetch(`${API}/isAuth`, {
    method: "GET",
    headers: {
      Accept: 'application/json',
      Authorization: token,
      "Content-Type": 'application/json'
  },
  })
    .then((response) => response.json())
    .then((data) => () => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const isLoggedin = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  fetch(`${API}/isAuth`, {
    method: "GET",
    headers: {
      Accept: 'application/json',
      Authorization: token,
      "Content-Type": 'application/json'
  }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        return false;
      } else if (data.user) {
        return true;
      }
    })
    .catch((err) => console.log(err));
};
