import React, {useContext, useEffect} from 'react'
import {AuthContext} from '../globalStates';
import {StateContext} from '../cartProvider'
import {withRouter} from 'react-router-dom'
import { logout,isAuthenticated } from '../auth/Index'
import { ShoppingCart,AccountCircle,ExitToApp } from '@material-ui/icons'
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { getTempUserCart, getUserCart } from '../Apis/cartHelpers'


const isActive = (history, path) => {
    if(history.location.pathname === path){
        return "active"
    }
    else {
        return ""
    }
}

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);


const Header = ({history}) => {

    const [authState,setauthState] = useContext(AuthContext);
//there is no other change, instead of creating the cart state we are pulling down the state variable and method using the context API
    const [cartCount, setCartCount] = useContext(StateContext);


    const isAuth = () => {
        isAuthenticated()
        .then(data => {
            if(data?.error){
                console.log("Error",data?.error);
            }
            else {
                if(data?.user){
                    setauthState(
                        {...authState,
                            _id:data.user._id,
                            prefix:data.user.prefix,
                            firstName:data.user.cfirst,
                            lastName:data.user.clast,
                            email:data.user.cemail,
                            role:data.user.role,
                            phone:data.user.cphone,
                            customerid:data.user.customerid
                        }
                    )
                    checkUserCartCount(data.user._id);

                }
                else {
                    checkTempCartCount();
                }             
            }
        })
    }

    const checkUserCartCount = (userId) => {
        var tempCount=0;
        getUserCart({userId}).then(data => {
            if(data.error){
                console.log(data.error);
            }
            else {
                tempCount = data.length;
                setCartCount(tempCount)
            }
        })
        
    }

    const checkTempCartCount = () => {
        var tempCount=0;
        if(localStorage.getItem('_cart')){
            var tempUserId="";
            const cartData = JSON.parse(localStorage.getItem('_cart'));
            tempUserId = cartData.id;
            getTempUserCart({tempUserId}).then(data => {
                if(data.error){
                    console.log(data.error);
                }
                else {
                    tempCount = data.length;
                    setCartCount(tempCount)
                }
            })
        }
    }

    const authcomponent = ()=>{
        if(authState.role === 1){
            return (
                <>
                    <li className={isActive(history,'/admin/dashboard')} title='Admin Dashboard' ><a href='/admin/dashboard'><AccountCircle /></a></li>
                    <li title='Logout'><a href="/login" onClick={() => logout(() => {window.location ='/login'})} style={{cursor:'pointer'}}><ExitToApp/></a></li>
                </>
            )
        }else if(authState.role === 0){
            return (
                <>
                    <li className={isActive(history,'/user/dashboard')}  title='Dashboard'><a href='/user/dashboard'><AccountCircle /></a></li>
                    <li title='Logout'><a href="/login" onClick={() => logout(() => {window.location ='/login'})} style={{cursor:'pointer'}}><ExitToApp/></a></li>
                </>
            )
        }
        else{
            return <li><a href='/login'>LOGIN</a></li>
        }
    }

    useEffect(() => {
        isAuth();
    },[])

    return (

        <>
            <div id="topbar" className="d-none d-lg-flex align-items-center fixed-top">
                <div className="container d-flex">

                    <div className="contact-info mr-auto">
                        <i className="icofont-envelope"></i> <a href="mailto:info@smart-dots.com">info@smart-dots.com</a>
                        <i className="icofont-phone"></i> (469) 629-6922
                    </div>

                    <div className="social-links">
                        <a href="https://www.facebook.com/smartdots22" className="facebook"><i className="icofont-facebook"></i></a>
                        <a href="https://twitter.com/smartdots22" className="twitter"><i className="icofont-twitter"></i></a>
                        <a href="#/" className="instagram"><i className="icofont-instagram"></i></a>
                        <a href="https://www.youtube.com/channel/UCtHmzRzAFSDF4rWDdZY8ntw" className="skype"><i className="icofont-youtube"></i></a>
                        <a href="#/" className="linkedin"><i className="icofont-linkedin"></i></a>
                    </div>
                </div>
            </div>

        
            <header id="header" className="fixed-top">

                <div className="container-fluid d-flex align-items-center">
                    <a href="/"><img src="../../assets/img/logo.png" width="130px" alt="Logo-SmartDots" /></a>
                    <h1 className="logo mr-auto"> </h1>

                    <nav className="nav-menu d-none d-lg-block">
                        <ul>
                            <li className={isActive(history,'/')}><a href="/">HOME</a></li>
                            <li className="drop-down"><a href="#">ROBOTIC MOWER</a>
                                <ul>
                                    <li><a href="/automower">Automower </a></li>
                                    <li><a href="/residential">Residential</a></li>
                                    <li><a href="/commercial">Commercial</a></li>
                                    <li><a href="/services">Our Services</a></li>
                                </ul>
                            </li>
                            <li><a href="/smart-irrigation">SMART IRRIGATION</a></li>
                            {/* <li><a href="#/">SMART HOME</a></li> */}
                            {/* <li class="drop-down"><a href="#">STORE</a>
                                <ul>
                                    <li><a href="/product-listing">PRODUCTS</a></li>
                                    <li><a href="/accessory-listing">ACCESSORIES</a></li>
                                </ul>
                            </li> */}
                            <li className={isActive(history,'/store')}><a href="/store">STORE</a></li>
                            <li><a rel="noreferrer" target="_blank" href="https://blog.smart-dots.com/">BLOG</a></li>      
                            <li><a href="/about-us">ABOUT US</a></li>     
                            <li><a href="/contact-us">CONTACT US</a></li>

                           
                            {/* <li className={isActive(history,'/product-listing')}><a href="/product-listing">STORE</a></li> */}
                            {/* <li><a href="#/">BLOGS</a></li>
                            <li className={isActive(history,'/contact-us')}><a href="/contact-us">CONTACT US</a></li>
                            {/* <li className={isActive(history,'/product-listing')}><a href="/product-listing">PRODUCTS</a></li>
                            <li className={isActive(history,'/accessory-listing')}><a href="/accessory-listing">ACCESSORIES</a></li> */}
                            <li className={isActive(history,'/cart')}>
                                <a href="/review-order">
                                    <StyledBadge badgeContent={Number(cartCount)} color="secondary">
                                        <ShoppingCart />
                                    </StyledBadge>
                                </a>
                            </li>
                            {/* <li className={isActive(history,'/login')}><a href="/login">LOGIN</a></li> */}
                            {authcomponent()}
                        </ul>
                    </nav>
                </div>

            </header>
        </>
    )
}

export default withRouter(Header)
