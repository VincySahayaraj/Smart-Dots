import React,{useEffect,useContext} from 'react';
import { Route, Redirect } from 'react-router-dom'
import {AuthContext} from '../globalStates';
import {API} from '../config'
import { trackPromise } from "react-promise-tracker";

const PrivateRoute = ({ component:Component, ...rest })=> {
      
    const [authState,setauthState] = useContext(AuthContext);

    const callback= async ()=>{
      let token= JSON.parse(localStorage.getItem("token"));

        return await fetch(`${API}/isAuth`,{
            method:"GET",
            headers: {
              Accept: 'application/json',
              Authorization: token,
              "Content-Type": 'application/json'
          }
        })
        .then(response=>response.json() )
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                try{
                  setauthState({...authState,
                      _id:data.user._id,
                      prefix:data.user.prefix,
                      firstName:data.user.cfirst,
                      lastName:data.user.clast,
                      email:data.user.cemail,
                      role:data.user.role,
                      phone: data.user.cphone,
                      customerid:data.user.customerid
                    });
                }
                catch{
                  window.location.replace("/login")
                }    
            }
            
            
         })
        .catch(err=>console.log(err))
    };

    useEffect(()=>{
      trackPromise(callback());
        return () => {};
    },[]);

const checkUser = ()=>{
  if(authState.firstName===''){
      if (authState.role===0){
        return(
        <Route {...rest} render={(props) => (
          <Component {...props} />
          )} />
        )
      }else{
        return null
      }
   
  }else if(authState.role===0){
    return(
      <Route {...rest} render={(props) => (
        <Component {...props} />
        )} />
      )
  }
  else{
    return(
      <Redirect to ={{pathname:'/login'}} />
      
    )
  }
}

    return (
        <>
            {checkUser()}
        </>
    )
}

export default PrivateRoute;