import React,{useState, createContext} from 'react';

//initializing the context API which enables the child components to access the application state
export const StateContext = createContext();


//creating a state provider to distribute the application cart state to all components
export const StateProvider = props=>{
    //just moved the cart state to stateprovider from the header
    const [cartCount,setCartCount] = useState(0);

    return(
        //passing down the cart state variable along with the state method to access and update the cart state
        <StateContext.Provider value={[cartCount,setCartCount]}>
            {props.children}
        </StateContext.Provider>
    )
};
