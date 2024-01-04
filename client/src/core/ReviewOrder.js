import React, { useState, useEffect, useContext } from "react";
import Layout from "./Layout";
import { AuthContext } from "../globalStates";
import { StateContext } from "../cartProvider";
import { isAuthenticated } from "../auth/Index";
import {
  getTempUserCart,
  removeCart,
  getUserCart,
  updateCart,
} from "../Apis/cartHelpers";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const ReviewOrder = () => {
  const [authState, setauthState] = useContext(AuthContext);
  const [cartCount, setCartCount] = useContext(StateContext);

  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [loadingSpin, setLoadingSpin] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);

  const [cart, setCart] = useState([]);

  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const checkAuth = () => {
    isAuthenticated().then((data) => {
      if (data.user) {
        setauthState({
          ...authState,
          _id: data.user._id,
          prefix: data.user.prefix,
          firstName: data.user.cfirst,
          lastName: data.user.clast,
          email: data.user.cemail,
          role: data.user.role,
          phone: data.user.cphone,
          customerid: data.user.customerid,
        });
        localStorage.removeItem("_cart");
        loadUserCart(data.user._id);
      } else {
        if (localStorage.getItem("_cart")) {
          setIsEmpty(false);
          const cartData = JSON.parse(localStorage.getItem("_cart"));
          loadCart(cartData.id);
        } else {
          setIsEmpty(true);
          setLoading(false);
          setLoadingSpin(false);
        }
      }
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const loadCart = (id) => {
    getTempUserCart({ tempUserId: id }).then((data) => {
      if (data.error) {
        setLoading(false);
        setLoadingSpin(false);
      } else {
        setLoading(false);
        setLoadingSpin(false);
        setCart(data);
        if (data.length === 0) {
          setIsEmpty(true);
        }
      }
    });
  };

  const loadUserCart = (id) => {
    getUserCart({ userId: id }).then((data) => {
      if (data.error) {
        setLoading(false);
        setLoadingSpin(false);
      } else {
        setLoading(false);
        setLoadingSpin(false);
        setCart(data);
        if (data.length === 0) {
          setIsEmpty(true);
        }
      }
    });
  };

  const destroy = (id) => {
    if (window.confirm("Do you want to remove this product?")) {
      setLoadingSpin(true);
      removeCart({ id }).then((data) => {
        if (data.error) {
          console.log("error", data.error);
        } else {
          checkAuth();
          setCartCount(cartCount - 1);
        }
      });
    }
  };

  const getTotal = () => {
    console.log("inttt", "11.89" + "14.99");
    console.log(cart);

    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.quantity * nextValue.price;
    }, 0);
  };

  const handleChangeQuantity = (id) => (event) => {
    let cartlen = cart.length;
    for (let i = 0; i < cartlen; i++) {
      if (cart[i]._id === id) {
        cart[i].quantity = Number(event.target.value);
        setCart([...cart]);
      }
    }
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    //update the cart
    updateCart(cart).then((data) => {
      if (data.error) {
        setIsLoading(false);
        setError({ ...error, status: true, message: "Something went wrong" });
      } else {
        window.location.href = "/shipping-details";
      }
    });
  };

  const prodDetails = () => {
    return cart.map((prod, i) => (
      <tr key={i}>
        <td>
          <input
            type="number"
            width="100%"
            style={{ width: "100%" }}
            onChange={handleChangeQuantity(prod._id)}
            min={1}
            max={100}
            defaultValue={prod.quantity}
            className="form-control"
          />
        </td>
        <td>{prod.productID.Device_Name}</td>
        <td>
          <span style={{ cursor: "pointer" }} onClick={() => destroy(prod._id)}>
            <DeleteIcon />
          </span>
        </td>
      </tr>
    ));
  };

  const showSummary = () => {
    return (
      <div className="col-md-12 plr-0px">
        <div className="container plr-0px">
          <div className="col-md-10 mx-auto mb-5 plr-0px">
            <table className="table table-bordered table-responsive table-review">
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>Quantity</th>
                  <th>Product</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>{prodDetails()}</tbody>
            </table>
          </div>
          {showTotal()}
        </div>
      </div>
    );
  };

  const showTotal = () => {
    return (
      <div className="col-md-12 plr-0px">
        <div className="row pt-5"></div>

        <div className="row py-3 mb-5 shipping-bor">
          <div className="col-md-6 blue-dis wid-40-per"></div>
          <div className="col-md-6 blue-dis text-right wid-40-per">
            Total : ${getTotal().toFixed(2)}
          </div>
        </div>

        <div className="row py-3 mb-5">
          <div className="col-md-12">
            {/* {(valMsg)?
                            <div className='alert alert-danger'>{error}</div> :  showError()}
                                                    {showSuccess()} */}

            {error.status && (
              <div className="alert alert-danger">{error.message} </div>
            )}

            <button
              disabled={isLoading}
              style={{ float: "right" }}
              onClick={(e) => clickSubmit(e)}
              className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn"
            >
              {isLoading ? "Loading..." : "Proceed to checkout"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const showEmptyCart = () => {
    if (isEmpty) {
      return (
        <div className="col-md-12 px-0">
          <br />
          <div
            className="col-md-12"
            style={{
              backgroundColor: "#f5f5f5",
              border: "solid 1px #e7e7e7",
              borderTop: "0px",
            }}
          >
            <br />
            <h4 style={{ textAlign: "center", color: "red" }}>
              Uh-Oh! Your cart is empty, Please buy new{" "}
              <a href="/store">Products</a> / <a href="store">Accessories</a>.
            </h4>
          </div>
        </div>
      );
    }
  };

  return (
    <Layout>
      <div
        style={{ paddingTop: "80px" }}
        className="section pp-scrollable slide-dark slide-dark-footer"
      >
        <div className="container">
          <div className="col-md-12 top-det-sp-in">
            <div className="col-md-12">
              <div
                className="jumbotron"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(213,149,37,1) 0%, rgba(240,164,0,1) 22%, rgba(255,199,32,1) 100%)",
                  color: "white",
                }}
              >
                <h3 style={{ textAlign: "center" }}>Review Your Order</h3>
              </div>
            </div>

            {showEmptyCart()}
            {!loading && cart.length >= 1 && showSummary()}
            {loading && <div className="pushCart"></div>}
          </div>
        </div>

        <div className="push"></div>

        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Backdrop className={classes.backdrop} open={loadingSpin}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </Layout>
  );
};

export default ReviewOrder;
