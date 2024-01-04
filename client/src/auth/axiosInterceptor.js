import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(function (config) {
    
  const authHeaders = JSON.parse(localStorage.getItem("token"));

  config.headers.Authorization = authHeaders;

  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//       console.log("err",error)
   

//     return Promise.reject(error);
//   }
// );

export { axiosInstance };