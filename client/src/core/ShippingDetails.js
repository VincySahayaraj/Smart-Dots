import React, { useState, useEffect, useContext } from "react";
import Layout from "./Layout";
import {
  getTempUserCart,
  getUserCart,
  updateCartUser,
  removeUserCart,
  removeTempCart,
} from "../Apis/cartHelpers";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  addOrder,
  getShippingByUser,
  addUserOrder,
  checkMiles,
} from "../Apis/apis";
import { AuthContext } from "../globalStates";
import { login, isAuthenticated } from "../auth/Index";
import {
  checkCoupon,
  checknewUserCoupon,
  updateAddress,
  updateShippingStatus,
} from "../user/apiUser";
import { Modal } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStylesErr = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const ShippingDetails = () => {
  const classesErr = useStylesErr();

  const [showCoupon, setShowCoupon] = useState(true);

  const [authState, setauthState] = useContext(AuthContext);

  const [auth, setAuth] = useState(false);

  const [btnloading1, setbtnloading1] = useState(false);

  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  const [loadingAdd, setLoadingAdd] = useState(false);

  const [loadingLogin, setLoadingLogin] = useState(false);

  const [loadingMiles, setLoadingMiles] = useState(false);

  const [miles, setMiles] = useState(-1);

  const [isMilesSucc, setIsMilesSucc] = useState(false);

  const [isMilesMsgSucc, setIsMilesMsgSucc] = useState(false);

  const [isMilesErr, setIsMilesErr] = useState(false);

  const [isMilesMsgErr, setIsMilesMsgErr] = useState("");

  const [cart, setCart] = useState([]);

  const [shipping, setShipping] = useState([]);

  const [tempCartId, setTempCartId] = useState("");

  let [coupon_amnt, setCouponAmnt] = useState(0);
  let [coupon_percentage, setCouponPercentage] = useState(0);
  let [coupon_id, setCouponId] = useState("");
  let [coupon_type, setCouponType] = useState(0);
  let [customerType, setCustomerType] = useState(0);

  const [coupon, setCoupon] = useState("");
  const [error_coupon, setErrorCoupon] = useState("");
  const [success_coupon, setSuccesCoupon] = useState(false);

  const [shippingVal, setShippingVal] = useState({
    prefix: "",
    first_name: "",
    last_name: "",
    email: "",
    confirm_email: "",
    phone: "",
    address1: "",
    address2: "",
    pin_code: "",
    password: "",
    city: "",
    state: "",
    country: "",
    recentAdd: "0",
    success: false,
    error: "",
    btnloading: false,
  });

  const {
    prefix,
    first_name,
    last_name,
    email,
    confirm_email,
    phone,
    address1,
    address2,
    pin_code,
    password,
    city,
    state,
    recentAdd = "0",
    error,
    btnloading,
  } = shippingVal;

  const [hide, setHide] = useState(false);

  // For Updating Shipping Address

  const [showAddr, setShowAddr] = useState(false);

  const [addrId, setaddrId] = useState("");

  const [shipAddr, setShipAddr] = useState({
    prefix1: "",
    first_name1: "",
    last_name1: "",
    phone1: "",
    address_1: "",
    address_2: "",
    pin_code1: "",
    city1: "",
    state1: "",
    country1: "",
    success1: false,
    error1: "",
    btnloading_1: false,
  });

  var {
    prefix1,
    first_name1,
    last_name1,
    phone1,
    address_1,
    address_2,
    pin_code1,
    city1,
    state1,
    country1,
    success1,
    error1,
    btnloading_1,
  } = shipAddr;

  useEffect(() => {
    checkAuth();
  }, []);

  const [values, setValues] = useState({
    emaillog: "",
    passwordlog: "",
    errorlog: "",
    loadinglog: false,
    redirectToReferrer: false,
  });

  const { emaillog, passwordlog, loadinglog, errorlog, redirectToReferrer } =
    values;

  const [showLogin, setShowLogin] = useState(false);

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
        setAuth(true);
        localStorage.removeItem("_cart");
        loadUserCart(data.user._id);
      } else {
        if (localStorage.getItem("_cart")) {
          setAuth(false);
          const cartData = JSON.parse(localStorage.getItem("_cart"));
          setTempCartId(cartData.id);
          loadCart(cartData.id);
        } else {
          window.location.href = "/review-order";
          setLoading(false);
        }
      }
    });
  };

  const loadUserCart = (id) => {
    getUserCart({ userId: id }).then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        //setLoading(false)
        setCart(data);
        loadShipping(id);
        if (data.length === 0) {
          window.location.href = "/review-order";
        }
      }
    });
  };

  const loadCart = (id) => {
    getTempUserCart({ tempUserId: id }).then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        setCart(data);
        if (data.length === 0) {
          window.location.href = "/review-order";
        }
      }
    });
  };

  const loadShipping = (id) => {
    getShippingByUser({ id }).then((data) => {
      if (data.error) {
        setLoading(false);
      } else {
        setShipping(data);
        setLoading(false);
        setShowAddr(false);
        setLoadingAdd(false);
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsMilesMsgErr(false);
  };

  // Login Part start

  const handleChangelogin = (name) => (event) => {
    setValues({ ...values, errorlog: false, [name]: event.target.value });
  };

  const clickSubmitLogin = (event) => {
    event.preventDefault();
    setValues({ ...values, errorlog: false, loadinglog: true });
    setLoadingLogin(true);
    login({ cemail: emaillog, password: passwordlog }).then((data) => {
      if (data.error) {
        setLoadingLogin(false);
        setValues({ ...values, errorlog: data.error, loadinglog: false });
      } else if (data.message === "login success") {
        isAuthenticated().then((data) => {
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
          setValues({
            ...values,
            redirectToReferrer: true,
          });
          redirectToShipping(data.user._id);
        });
      }
    });
  };

  const redirectToShipping = (id) => {
    removeUserCart({ userId: id }).then((data) => {
      if (data.error) {
        setLoadingLogin(false);
      } else {
        updateCartUser({ tempId: tempCartId, userID: id }).then((data) => {
          if (data.error) {
            setLoadingLogin(false);
          } else {
            return window.location.reload();
          }
        });
      }
    });
  };

  const showLoginForm = () => (
    <Modal
      show={showLogin}
      onHide={() => setShowLogin(false)}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={clickSubmitLogin}>
          <div className="form-group">
            <label className="text-muted">
              Email<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChangelogin("emaillog")}
              type="email"
              className="form-control"
              value={emaillog}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">
              Password<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChangelogin("passwordlog")}
              type="password"
              className="form-control"
              value={passwordlog}
              required
            />
          </div>
          <center>
            <br />
            <button className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn">
              Login
            </button>
          </center>
          <br />
          {showErrorLogin()}
        </form>
      </Modal.Body>
    </Modal>
  );

  const showErrorLogin = () => (
    <div
      className="alert alert-danger"
      style={{ display: errorlog ? "" : "none" }}
    >
      {errorlog}
    </div>
  );

  // Login Part End

  // Update/Delete Shipping Address Part Start

  const handleChangeUpdateAddress = (name) => (event) => {


    if (
      event.target.value === "Custom" &&
      name == "prefix1" &&
      event.target.id == "selectBx"
    ) {
      setHide(true);
    } else if (
      event.target.value !== "Custom" &&
      name == "prefix1" &&
      event.target.id == "selectBx"
    ) {
      setHide(false);
    }
    setShipAddr({ ...shipAddr, error1: false, [name]: event.target.value });
  };

  const [titleList] = useState([
    { label: "Mr", value: "Mr" },
    { label: "Mrs", value: "Mrs" },
    { label: "Ms", value: "Ms" },
    { label: "Miss", value: "Miss" },
    { label: "Dr", value: "Dr" },
    { label: "Sir", value: "Sir" },
    { label: "Custom", value: "Custom" },
  ]);

  const [stateList] = useState([
    { label: "Alabama-AL", value: "AL" },
    { label: "Alaska-AK", value: "AK" },
    { label: "Arizona-AZ", value: "AZ" },
    { label: "Arkansas-AR", value: "AR" },
    { label: "California-CA", value: "CA" },
    { label: "Colorado-CO", value: "CO" },
    { label: "Connecticut-CT", value: "CT" },
    { label: "Delaware-DE", value: "DE" },
    { label: "District of Columbia-DC", value: "DC" },
    { label: "Florida-FL", value: "FL" },
    { label: "Georgia-GA", value: "GA" },
    { label: "Hawaii-HI", value: "HI" },
    { label: "Idaho-ID", value: "ID" },
    { label: "Illinois-IL", value: "IL" },
    { label: "Indiana-IN", value: "IN" },
    { label: "Iowa-IA", value: "IA" },
    { label: "Kansas-KS", value: "KS" },
    { label: "Kentucky-KY", value: "KY" },
    { label: "Louisiana-LA", value: "LA" },
    { label: "Maine-ME", value: "ME" },
    { label: "Maryland-MD", value: "MD" },
    { label: "Massachusetts-MA", value: "MA" },
    { label: "Michigan-MI", value: "MI" },
    { label: "Minnesota-MN", value: "MN" },
    { label: "Mississippi-MS", value: "MS" },
    { label: "Missouri-MO", value: "MO" },
    { label: "Montana-MT", value: "MT" },
    { label: "Nebraska-NE", value: "NE" },
    { label: "Nevada-NV", value: "NV" },
    { label: "New Hampshire-NH", value: "NH" },
    { label: "New Jersey-NJ", value: "NJ" },
    { label: "New Mexico-NM", value: "NM" },
    { label: "New York-NY", value: "NY" },
    { label: "North Carolina-NC", value: "NC" },
    { label: "North Dakota-ND", value: "ND" },
    { label: "Ohio-OH", value: "OH" },
    { label: "Oklahoma-OK", value: "OK" },
    { label: "Oregon-OR", value: "OR" },
    { label: "Pennsylvania-PA", value: "PA" },
    { label: "Puerto Rico-PR", value: "PR" },
    { label: "Rhode Island-RI", value: "RI" },
    { label: "South Carolina-SC", value: "SC" },
    { label: "South Dakota-SD", value: "SD" },
    { label: "Tennessee-TN", value: "TN" },
    { label: "Texas-TX", value: "TX" },
    { label: "Utah-UT", value: "UT" },
    { label: "Vermont-VT", value: "VT" },
    { label: "Virginia-VA", value: "VA" },
    { label: "Virgin Islands-VI", value: "VI" },
    { label: "Washington-WA", value: "WA" },
    { label: "West Virginia-WV", value: "WV" },
    { label: "Wisconsin-WI", value: "WI" },
    { label: "Wyoming-WY", value: "WY" },
  ]);

  const handleAddressModal = (
    id,
    tempPrefix,
    tempFirst,
    tempLast,
    tempAddr1,
    tempAddr2,
    tempPhone,
    tempCity,
    tempState,
    tempPin,
    tempCountry
  ) => {
    setaddrId(id);
    setShipAddr({
      ...shipAddr,
      prefix1: tempPrefix,
      first_name1: tempFirst,
      last_name1: tempLast,
      address_1: tempAddr1,
      address_2: tempAddr2,
      phone1: tempPhone,
      city1: tempCity,
      state1: tempState,
      pin_code1: tempPin,
      country1: tempCountry,
    });
    setShowAddr(true);
  };

  const clickSubmitUpdateAddress = (event) => {
    event.preventDefault();

    if (shipAddr?.state1=== "TX") {
      setSalesTax(8.25);
    } else {
      setSalesTax(0);
    }

    if (shipAddr.customPrefix1 && hide) {
      prefix1 = shipAddr.customPrefix1;
    }
    setShipAddr({
      ...shipAddr,
      error1: false,
      success1: 1,
      btnloading_1: true,
    });
    updateAddress(addrId, {
      ID: addrId,
      prefix: prefix1,
      first_name: first_name1,
      last_name: last_name1,
      phone: phone1,
      address1: address_1,
      address2: address_2,
      city: city1,
      state: state1,
      country: country1,
      pin_code: pin_code1,
    }).then((data) => {
      if (data.error) {
        setShipAddr({
          ...shipAddr,
          error1: data.error,
          btnloading_1: false,
          success1: false,
        });
      } else {
        setHide(false);
        loadShipping(data.userid);
        setaddrId("");
        setShipAddr({
          prefix1: "",
          first_name1: "",
          last_name1: "",
          phone1: "",
          address_1: "",
          address_2: "",
          pin_code1: "",
          city1: "",
          state1: "",
          country1: "",
          success1: true,
          error1: "",
          btnloading_1: false,
        });
      }
    });
  };

  const showUpdateAddress = () => (
    <Modal show={showAddr} onHide={() => setShowAddr(false)} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Address</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={clickSubmitUpdateAddress}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="text-muted">
                  Title<span style={{ color: "red" }}> *</span>
                </label>
                <select
                  required
                  onChange={handleChangeUpdateAddress("prefix1")}
                  className="form-control"
                  id="selectBx"
                >
                  <option>Select Title</option>{" "}
                  {titleList.map((room) =>
                    prefix1 === room.value ? (
                      <option selected key={room.value} value={room.value}>
                        {room.value}
                      </option>
                    ) : (
                      <option key={room.value} value={room.value}>
                        {room.value}
                      </option>
                    )
                  )}
                </select>
                <input
                  type="text"
                  style={{ display: hide ? "block" : "none" }}
                  onChange={handleChangeUpdateAddress("customPrefix1")}
                  required={hide}
                  className="form-control border-rad-0-px"
                  id="usr"
                  value={shipAddr?.customPrefix}
                  placeholder="Enter the Custom Prefix"
                />
              </div>

              <div className="form-group">
                <label className="text-muted">
                  First Name <span style={{ color: "red" }}> *</span>
                </label>
                <input
                  onChange={handleChangeUpdateAddress("first_name1")}
                  type="text"
                  className="form-control"
                  value={first_name1}
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-muted">
                  Last Name <span style={{ color: "red" }}> *</span>
                </label>
                <input
                  onChange={handleChangeUpdateAddress("last_name1")}
                  type="text"
                  className="form-control"
                  value={last_name1}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">
                  Phone Number <span style={{ color: "red" }}> *</span>
                </label>
                <input
                  onChange={handleChangeUpdateAddress("phone1")}
                  type="text"
                  className="form-control border-rad-0-px"
                  value={phone1}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">
                  Address Line 1 <span style={{ color: "red" }}> *</span>
                </label>
                <input
                  onChange={handleChangeUpdateAddress("address_1")}
                  type="text"
                  className="form-control border-rad-0-px"
                  value={address_1}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Address Line 2 </label>
                <input
                  onChange={handleChangeUpdateAddress("address_2")}
                  type="text"
                  className="form-control border-rad-0-px"
                  value={address_2}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="text-muted">
                  Town/City <span style={{ color: "red" }}> *</span>
                </label>
                <input
                  onChange={handleChangeUpdateAddress("city1")}
                  type="text"
                  className="form-control border-rad-0-px"
                  value={city1}
                />
              </div>
              {/* <div className="form-group">
                                <label className="text-muted">County</label>
                                <input onChange={handleChangeUpdateAddress('state1')} type="text" className="form-control border-rad-0-px" value={state1} />
                            </div> */}
              <div className="form-group">
                <label className="text-muted">
                  State<span style={{ color: "red" }}> *</span>
                </label>
                <select
                  required
                  onChange={handleChangeUpdateAddress("state1")}
                  className="form-control"
                >
                  <option>Select State</option>{" "}
                  {stateList.map((room) =>
                    state1 === room.value ? (
                      <option selected key={room.value} value={room.value}>
                        {room.label}
                      </option>
                    ) : (
                      <option key={room.value} value={room.value}>
                        {room.label}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="form-group">
                <label className="text-muted">
                  Postcode <span style={{ color: "red" }}> *</span>
                </label>
                <input
                  onChange={handleChangeUpdateAddress("pin_code1")}
                  type="text"
                  className="form-control border-rad-0-px"
                  value={pin_code1}
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Country </label>
                <input
                  onChange={handleChangeUpdateAddress("country1")}
                  type="text"
                  className="form-control border-rad-0-px"
                  readOnly
                  value={country1}
                />
              </div>

              <button disabled={btnloading_1} className="btn btn-success">
                {btnloading_1 ? "Loading..." : "Update"}
              </button>
              <br />
            </div>
            {showErrorAddr()}
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );

  const showErrorAddr = () => (
    <div
      className="alert alert-danger"
      style={{ display: error1 ? "" : "none" }}
    >
      {error1}
    </div>
  );

  const destroyAddr = (shippingId) => {
    if (window.confirm("Do you want to delete this address?")) {
      setLoadingAdd(true);
      updateShippingStatus(shippingId, { status: 2, Id: shippingId }).then(
        (data) => {
          if (data.error) {
            setLoadingAdd(false);
          } else {
            setShippingVal({
              ...shippingVal,
              error: "",
              success: false,
              btnloading: false,
              recentAdd: "0",
            });
            loadShipping(data.userid);
          }
        }
      );
    }
  };
  const [salesTax, setSalesTax] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [salesTotalAmount, setSalesTotalAmount] = useState(0);

  const calculateOrderTotal = async () => {
    let prodTotal = await getTotal();
    let shipTotal = await getShipping();
    let totalValue = prodTotal + shipTotal;
    setOrderTotal(totalValue);
    return totalValue;
  };

  useEffect(() => {
    if (cart) calculateAmtWithSalesAndDisc();
  }, [salesTax]);

  useEffect(() => {
    if (cart) calculateAmtWithSalesAndDisc();
  }, [coupon_percentage, coupon_amnt]);

  // calculates the amount with discount and sales
  const calculateAmtWithSalesAndDisc = async () => {
    let final_price = orderTotal;
    let shipping_price = 0;
    // new logic to calculate shipping
    if (coupon_percentage !== 0 || coupon_amnt !== 0) {
      if (customerType >= 1 && customerType <= 5) {
        if (coupon_amnt !== 0) {
          final_price = orderTotal - Number(coupon_amnt);
        } else {
          final_price = orderTotal - (getTotal() * coupon_percentage) / 100;
        }
      } else if (customerType === 6) {
        shipping_price = getShipping() - Number(coupon_amnt);
        if (shipping_price < 0) {
          shipping_price = 0;
        }
      }
    }
    console.log("final priceeee", final_price);

    let totalWithoutShipping = final_price - getShipping();
    let salesPercent = (salesTax / 100) * totalWithoutShipping;
    console.log("sales percentage", salesPercent);
    let totalPercent = parseFloat(salesPercent.toFixed(2));
    setSalesTotalAmount(totalPercent);
  };

  // Update/Delete Shippig Address Part End

  const handleChange = (name) => (event) => {
    if (event.target.value === "Custom") {
      setHide(true);
    }

    if (name === "state") {
      if (event.target.value === "TX") {
        setSalesTax(8.25);
      } else {
        setSalesTax(0);
      }
    }
    setShippingVal({
      ...shippingVal,
      success: false,
      error: "",
      btnloading: false,
      [name]: event.target.value,
      recentAdd: "0",
    });
  };

  const handleChangeForMiles = async (event) => {
    setLoadingMiles(true);
    setIsMilesMsgErr("");
    setMiles(-1);
    if (event.target.value) {
      checkMiles({ miles: event.target.value }).then((data) => {
        if (data.error) {
          setIsMilesMsgErr(data.error);
          setMiles(-1);
          setLoadingMiles(false);
        } else {
          setMiles(data.distance);
          if (Number(data.distance) <= 50) {
            setIsMilesSucc(true);
            setIsMilesMsgSucc(true);
            setIsMilesErr(false);
          } else {
            setIsMilesErr(true);
            setIsMilesSucc(false);
            setIsMilesMsgSucc(false);
          }
          setIsMilesMsgErr("");
          setLoadingMiles(false);
        }
      });
    } else {
      setLoadingMiles(false);
    }
  };

  const makeCheckoutNewUser = async (orderId, email, password) => {
    login({ cemail: email, password }).then((data) => {
      if (data.error) {
        console.log("Login failed!");
      } else {
        isAuthenticated().then((data) => {
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
        });
        localStorage.setItem("_ord", JSON.stringify({ id: orderId }));
        return (window.location.href = "/checkout");
      }
    });
  };

  const makeCheckoutExistingUser = (id) => {
    localStorage.setItem("_ord", JSON.stringify({ id }));
    return (window.location.href = "/checkout");
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    console.log("vcalue", shippingVal);
    if (hide) {
      if (shippingVal.prefix == "Custom") {
        alert("Enter the custom pronoun");
        return;
      }
    }

    setShippingVal({
      ...shippingVal,
      error: "",
      success: false,
      btnloading: true,
    });
    let final_price = getTotal();
    let shipping_price = getShipping() || 0;
    // final_price = final_price
    if (coupon_percentage !== 0 || coupon_amnt !== 0) {
      if (customerType >= 1 && customerType <= 5) {
        if (coupon_amnt !== 0) {
          final_price = getTotal() - Number(coupon_amnt);
        } else {
          final_price = getTotal() - (getTotal() * coupon_percentage) / 100;
        }
      } else if (customerType === 6) {
        shipping_price = getShipping() - Number(coupon_amnt);
        if (shipping_price < 0) {
          shipping_price = 0;
        }
      }
    }

    let ProdDescription;
    let ProdTitle;
    let Prodid;
    let Prodprice;
    let Prodquan;
    let Prodname;
    //let systemType="";
    let order_id = "";

    Prodquan = cart.map((p, i) => p.quantity) + ",";
    ProdTitle = cart.map(
      (p, i) => p.quantity + " x " + p.productID.Device_Name.split(",")
    );
    ProdDescription = cart.map(
      (p, i) => p.quantity + " x " + p.productID.Device_Name + "<br/>"
    );
    Prodid = cart.map((p, i) => p.productID._id.split(",")) + ",";
    Prodprice = cart.map((p, i) => p.price) + ",";
    Prodname = cart.map((p, i) => p.productID.Device_Name) + ",";
    var installation = false;
    if (Number(miles) >= 0 && Number(miles) <= 50) {
      installation = true;
    }

    if (auth) {
      addUserOrder({
        recentAdd,
        userid: authState._id,
        prefix,
        couponid: coupon_id,
        couponType: coupon_type,
        first_name,
        last_name,
        phone,
        address1,
        address2,
        pin_code,
        state,
        city,
        country: "USA",
        Prodid,
        Prodquan,
        Prodname,
        Prodprice,
        order_description: `${ProdDescription}`,
        title: `${ProdTitle}`,
        price: final_price,
        shipping_charge: shipping_price,
        salesTax: salesTotalAmount,
        quantity: 1,
        miles,
        installation,
      }).then((data) => {
        if (data.error) {
          setShippingVal({
            ...shippingVal,
            success: false,
            error: data.error,
            btnloading: false,
          });
        } else {
          setShippingVal({
            ...shippingVal,
            prefix: "",
            first_name: "",
            last_name: "",
            confirm_email: "",
            phone: "",
            address1: "",
            address2: "",
            state: "",
            country: "",
            pin_code: "",
            error: "",
            success: "",
            recentAdd: "0",
            btnloading: true,
          });
          let json = JSON.parse(JSON.stringify(data));
          order_id = json[0].orderid;
          // Remove cart
          removeUserCart({ userId: authState._id }).then((data) => {
            if (data.error) {
              console.log("Error", data.error);
            } else {
              makeCheckoutExistingUser(order_id, email, password);
            }
          });
        }
      });
    } else {
      addOrder({
        prefix,
        first_name,
        last_name,
        couponid: coupon_id,
        couponType: coupon_type,
        email,
        confirm_email,
        phone,
        password,
        address1,
        address2,
        pin_code,
        state,
        city,
        country: "USA",
        Prodid,
        Prodquan,
        Prodname,
        Prodprice,
        order_description: `${ProdDescription}`,
        title: `${ProdTitle}`,
        price: final_price,
        shipping_charge: shipping_price,
        salesTax: salesTotalAmount,
        quantity: 1,
        miles,
        installation,
      }).then((data) => {
        if (data.error) {
          setShippingVal({
            ...shippingVal,
            success: false,
            error: data.error,
            btnloading: false,
          });
        } else {
          setShippingVal({
            ...shippingVal,
            prefix: "",
            first_name: "",
            last_name: "",
            confirm_email: "",
            phone: "",
            address1: "",
            address2: "",
            state: "",
            country: "",
            pin_code: "",
            error: "",
            success: "",
            btnloading: true,
          });
          let json = JSON.parse(JSON.stringify(data));
          order_id = json[0].orderid;
          // Remove cart
          removeTempCart({ tempUserId: tempCartId }).then((data) => {
            if (data.error) {
              console.log("Err", data.error);
            } else {
              localStorage.removeItem("_cart");
              makeCheckoutNewUser(order_id, email, password);
            }
          });
        }
      });
    }
  };

  const handleAddressChange = (e, shippingId, shippingState) => {
    if (shippingState == "TX") {
      setSalesTax(8.25);
    } else {
      setSalesTax(0);
    }

    console.log("e.t", e.target, shippingState);
    setShippingVal({
      ...shippingVal,
      error: "",
      success: false,
      btnloading: false,
      recentAdd: shippingId,
    });
  };

  // coupon handlers

  const handleChangeCoupon = (e) => {
    setErrorCoupon("");
    setCoupon(e.target.value);
  };

  const clickSubmitCoupon = (e) => {
    e.preventDefault();
    setbtnloading1(true);
    setErrorCoupon("");
    setSuccesCoupon(false);
    if (authState.role === 0) {
      checkCoupon({ coupon }).then((data) => {
        if (data.error) {
          setErrorCoupon(data.error);
          setbtnloading1(false);
        } else {
          setErrorCoupon("");
          // setSuccesCoupon(true);

          var couponType = data.value_type;
          var customerType = data.customer_type;
          setCustomerType(customerType);
          var amnt = 0;
          var flag = false;
          if (customerType === 4) {
            // By Product

            if (couponType === 1) {
              //  By amount
              for (var i = 0; i < cart.length; i++) {
                if (cart[i].productID._id === data.productId) {
                  console.log("product id matcheds", data.productId);
                  amnt = cart[i].quantity * data.coupon_value;
                  flag = true;
                }
              }
            } else if (couponType === 2) {
              // By Percentage
              for (var j = 0; j < cart.length; j++) {
                if (cart[j].productID._id === data.productId) {
                  /* for(var k=0;k<cart[j].quantity;k++){
                                        amnt = parseInt(amnt) + (cart[j].price)* data.coupon_value/100
                                    } */
                  amnt =
                    (cart[j].quantity * cart[j].price * data.coupon_value) /
                    100;
                  flag = true;
                }
              }
            }
            if (flag) {
              setCouponId(data._id);
              setCouponType(data.value_type);
              setCouponPercentage(0);
              setCouponAmnt(amnt);
              setSuccesCoupon(true);
            } else {
              setbtnloading1(false);
              setSuccesCoupon(false);
              setErrorCoupon("This coupon is not applicable for this product");
              return;
            }
            setShowCoupon(false);
            setbtnloading1(false);
            return;
          } else if (customerType === 5) {
            // By Category

            if (couponType === 1) {
              //  By amount
              for (i = 0; i < cart.length; i++) {
                if (cart[i].productID.category === data.categoryId) {
                  amnt = cart[i].quantity * data.coupon_value;
                  flag = true;
                }
              }
            } else if (couponType === 2) {
              // By Percentage
              for (j = 0; j < cart.length; j++) {
                if (cart[j].productID.category === data.categoryId) {
                  amnt =
                    (cart[j].quantity * cart[j].price * data.coupon_value) /
                    100;
                  flag = true;
                }
              }
            }
            if (flag) {
              setCouponId(data._id);
              setCouponType(data.value_type);
              setCouponPercentage(0);
              setCouponAmnt(amnt);
            } else {
              setbtnloading1(false);
              setErrorCoupon("You are not allowed to use this coupon.");
              return;
            }
            setShowCoupon(false);
            setbtnloading1(false);
            return;
          } else if (customerType === 6) {
            if (couponType === 1) {
              //  By amount
              amnt = data.coupon_value;
              flag = true;
            } else if (couponType === 2) {
              // By Percentage
              for (j = 0; j < cart.length; j++) {
                amnt += cart[j].quantity * cart[j].productID.shipping_charge;
                flag = true;
              }
              amnt = (amnt * data.coupon_value) / 100;
            }
            if (flag) {
              setCouponId(data._id);
              setCouponType(data.value_type);
              setCouponPercentage(0);
              setCouponAmnt(amnt);
            } else {
              setbtnloading1(false);
              setErrorCoupon("You are not allowed to use this coupon.");
              return;
            }
            setShowCoupon(false);
            setbtnloading1(false);
            return;
          }

          if (couponType === 1) {
            //  By amount
            setCouponId(data._id);
            setCouponType(data.value_type);
            setCouponPercentage(0);
            setCouponAmnt(data.coupon_value);
          } else if (couponType === 2) {
            // By Percentage
            setCouponId(data._id);
            setCouponType(data.value_type);
            setCouponPercentage(data.coupon_value);
            setCouponAmnt(0);
          }
          setShowCoupon(false);
          setbtnloading1(false);
        }
      });
    } else {
      checknewUserCoupon({ coupon }).then((data) => {
        if (data.error) {
          setErrorCoupon(data.error);
          setbtnloading1(false);
        } else {
          setErrorCoupon("");
          //  setSuccesCoupon(true);

          var couponType = data.value_type;
          var customerType = data.customer_type;
          setCustomerType(customerType);
          var amnt = 0;
          var flag = false;
          if (customerType === 4) {
            // By Product

            if (couponType === 1) {
              //  By amount
              for (var i = 0; i < cart.length; i++) {
                if (cart[i].productID._id === data.productId) {
                  amnt = cart[i].quantity * data.coupon_value;
                  flag = true;
                }
              }
            } else if (couponType === 2) {
              // By Percentage
              for (var j = 0; j < cart.length; j++) {
                if (cart[j].productID._id === data.productId) {
                  amnt =
                    (cart[j].quantity * cart[j].price * data.coupon_value) /
                    100;
                  flag = true;
                }
              }
            }
            if (flag) {
              setCouponId(data._id);
              setCouponType(data.value_type);
              setCouponPercentage(0);
              setCouponAmnt(amnt);
            } else {
              setbtnloading1(false);
              setErrorCoupon("You are not allowed to use this coupon.");
              return;
            }
            setShowCoupon(false);
            setbtnloading1(false);
            return;
          } else if (customerType === 5) {
            // By Category

            if (couponType === 1) {
              //  By amount
              for (i = 0; i < cart.length; i++) {
                if (cart[i].productID.category === data.categoryId) {
                  amnt = cart[i].quantity * data.coupon_value;
                  flag = true;
                }
              }
            } else if (couponType === 2) {
              // By Percentage
              for (j = 0; j < cart.length; j++) {
                if (cart[j].productID.category === data.categoryId) {
                  amnt =
                    (cart[j].quantity * cart[j].price * data.coupon_value) /
                    100;
                  flag = true;
                }
              }
            }
            if (flag) {
              setCouponId(data._id);
              setCouponType(data.value_type);
              setCouponPercentage(0);
              setCouponAmnt(amnt);
            } else {
              setbtnloading1(false);
              setErrorCoupon("You are not allowed to use this coupon.");
              return;
            }
            setShowCoupon(false);
            setbtnloading1(false);
            return;
          } else if (customerType === 6) {
            if (couponType === 1) {
              //  By amount
              amnt = data.coupon_value;
              flag = true;
            } else if (couponType === 2) {
              // By Percentage
              for (j = 0; j < cart.length; j++) {
                amnt += cart[j].quantity * cart[j].productID.shipping_charge;
                flag = true;
              }
              amnt = (amnt * data.coupon_value) / 100;
            }
            if (flag) {
              setCouponId(data._id);
              setCouponType(data.value_type);
              setCouponPercentage(0);
              setCouponAmnt(amnt);
            } else {
              setbtnloading1(false);
              setErrorCoupon("You are not allowed to use this coupon.");
              return;
            }
            setShowCoupon(false);
            setbtnloading1(false);
            return;
          }

          if (couponType === 1) {
            //  By amount
            setCouponId(data._id);
            setCouponType(data.value_type);
            setCouponPercentage(0);
            setCouponAmnt(data.coupon_value);
          } else if (couponType === 2) {
            // By Percentage
            setCouponId(data._id);
            setCouponType(data.value_type);
            setCouponPercentage(data.coupon_value);
            setCouponAmnt(0);
          }
          setShowCoupon(false);
          setbtnloading1(false);
        }
      });
    }
  };

  const showErrorCoupon = () => {
    if (error_coupon) {
      return (
        <div
          className="alert alert-danger"
          style={{ display: error_coupon ? "" : "none" }}
        >
          {error_coupon}
        </div>
      );
    }
  };

  const showSuccessCoupon = () => {
    if (success_coupon) {
      return (
        <div
          className="alert alert-success"
          style={{ display: success_coupon ? "" : "none" }}
        >
          Your coupon code applied.
        </div>
      );
    }
  };

  const showRecentAddress = () => {
    let lblid = "radio";
    return (
      <div>
        <h4 className="font-gen font-we-600 color-blk-in">
          Most recently used
        </h4>
        {shipping.map((p, i) => (
          <div className="col-md-12 px-0 mb-3">
            <div className="col-md-12 bord-line">
              <div className="row">
                <div className="col-md-1 wid-5-per">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        id={lblid + i}
                        type="radio"
                        checked={p._id === recentAdd}
                        value={recentAdd}
                        onChange={(e) => handleAddressChange(e, p._id, p.state)}
                        className="form-check-input"
                        name="optradio1"
                      />
                    </label>
                  </div>
                </div>

                <label htmlFor={lblid + i} className="col-md-11">
                  <div className="row">
                    <div className="col-md-9 py-3 wid-60-per-in">
                      <h5 className="pb-3 color-blk-in font-one-re">
                        Deliver to this address
                      </h5>
                      <p className="pb-0 mb-0">
                        {p.address1}
                        {p.address2 !== undefined && (
                          <>
                            <br />
                            <span>{p.address2}</span>
                          </>
                        )}
                        <br />
                        {p.city}
                        {p.state && <span>-{p.state}</span>}
                        <br />
                        {p.pin_code}
                        <br />
                        {p.country}
                        <br />
                        Phone no: {p.phone}
                      </p>
                    </div>
                    <div className="col-md-3 pt-3 text-right">
                      <p className="font-one-edit">
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleAddressModal(
                              p._id,
                              p.prefix,
                              p.first_name,
                              p.last_name,
                              p.address1,
                              p.address2,
                              p.phone,
                              p.city,
                              p.state,
                              p.pin_code,
                              p.country
                            )
                          }
                        >
                          Edit
                        </span>{" "}
                        |{" "}
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => destroyAddr(p._id)}
                        >
                          Delete
                        </span>
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const newAddressForm = () => {
    return (
      <div className="col-md-10 px-0 pt-4">
        <h4 className="font-gen font-we-600 color-blk-in">Add New Address</h4>

        <div className="col-md-12 px-0">
          <div className="form-group">
            <label className="text-muted">
              Title<span style={{ color: "red" }}> *</span>
            </label>
            <select
              required
              onChange={handleChange("prefix")}
              className="form-control"
            >
              <option>Select Title</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
              <option value="Miss">Miss</option>
              <option value="Dr">Dr</option>
              <option value="Sir">Sir</option>
              <option value="Custom">Custom</option>
            </select>
            <input
              type="text"
              style={{ display: hide ? "block" : "none" }}
              onChange={handleChange("prefix")}
              className="form-control border-rad-0-px"
              placeholder="Enter the Custom Pronoun "
            />
          </div>

          <div className="form-group">
            <label>
              First Name <span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="text"
              onChange={handleChange("first_name")}
              className="form-control border-rad-0-px"
              value={first_name}
            />
          </div>

          <div className="form-group">
            <label>
              Last Name <span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="text"
              onChange={handleChange("last_name")}
              className="form-control border-rad-0-px"
              value={last_name}
            />
          </div>

          {!auth && (
            <div className="form-group">
              <label>
                Email Address <span style={{ color: "red" }}> *</span>
              </label>
              <input
                onChange={handleChange("email")}
                type="text"
                className="form-control border-rad-0-px"
                value={email}
              />
              <em style={{ fontSize: "12px" }}>
                *The email ID you enter here will be used for future login to
                the site.
              </em>
            </div>
          )}

          {!auth && (
            <div className="form-group">
              <label>
                Confirm Email Address <span style={{ color: "red" }}> *</span>
              </label>
              <input
                onChange={handleChange("confirm_email")}
                type="text"
                className="form-control border-rad-0-px"
                value={confirm_email}
              />
              {/* <em style={{fontSize:'12px'}}>*The email ID you enter here will be used for future login to the site.</em> */}
            </div>
          )}

          <div className="form-group">
            <label>
              Phone Number<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("phone")}
              type="text"
              className="form-control border-rad-0-px"
              value={phone}
              placeholder="e.g 07123456789"
            />
          </div>

          <div className="form-group">
            <label>
              Address Line 1<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("address1")}
              type="text"
              className="form-control border-rad-0-px"
              value={address1}
            />
          </div>

          <div className="form-group">
            <label>Address Line 2(Optional)</label>
            <input
              onChange={handleChange("address2")}
              type="text"
              className="form-control border-rad-0-px"
              value={address2}
            />
          </div>

          <div className="form-group">
            <label>
              Town/City<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("city")}
              type="text"
              className="form-control border-rad-0-px"
              value={city}
            />
          </div>

          {/* <div className="form-group">
                            <label>State<span style={{color:"red"}}> *</span></label>
                            <input onChange={handleChange('state')} type="text" className="form-control border-rad-0-px" placeholder="eg: TX,AK"  value={state} />
                            <em style={{fontSize:'11px'}}>*Enter State Code only, eg: TX,AK</em>
                        </div> */}

          <div className="form-group">
            <label className="text-muted">
              State<span style={{ color: "red" }}> *</span>
            </label>
            <select
              required
              onChange={handleChange("state")}
              className="form-control"
            >
              <option>Select State</option>
              <option value="AL">Alabama-AL</option>
              <option value="AK">Alaska-AK</option>
              <option value="AZ">Arizona-AZ</option>
              <option value="AR">Arkansas-AR</option>
              <option value="CA">California-CA</option>
              <option value="CO">Colorado-CO</option>
              <option value="CT">Connecticut-CT</option>
              <option value="DE">Delaware-DE</option>
              <option value="DC">District of Columbia-DC</option>
              <option value="FL">Florida-FL</option>
              <option value="GA">Georgia-GA</option>
              <option value="HI">Hawaii-HI</option>
              <option value="ID">Idaho-ID</option>
              <option value="IL">Illinois-IL</option>
              <option value="IN">Indiana-IN</option>
              <option value="IA">Iowa-IA</option>
              <option value="KS">Kansas-KS</option>
              <option value="KY">Kentucky-KY</option>
              <option value="LA">Louisiana-LA</option>
              <option value="ME">Maine-ME</option>
              <option value="MD">Maryland-MD</option>
              <option value="MA">Massachusetts-MA</option>
              <option value="MI">Michigan-MI</option>
              <option value="MN">Minnesota-MN</option>
              <option value="MS">Mississippi-MS</option>
              <option value="MO">Missouri-MO</option>
              <option value="MT">Montana-MT</option>
              <option value="NE">Nebraska-NE</option>
              <option value="NV">Nevada-NV</option>
              <option value="NH">New Hampshire-NH</option>
              <option value="NJ">New Jersey-NJ</option>
              <option value="NM">New Mexico-NM</option>
              <option value="NY">New York-NY</option>
              <option value="NC">North Carolina-NC</option>
              <option value="ND">North Dakota-ND</option>
              <option value="OH">Ohio-OH</option>
              <option value="OK">Oklahoma-OK</option>
              <option value="OR">Oregon-OR</option>
              <option value="PA">Pennsylvania-PA</option>
              <option value="PR">Puerto Rico-PR</option>
              <option value="RI">Rhode Island-RI</option>
              <option value="SC">South Carolina-SC</option>
              <option value="SD">South Dakota-SD</option>
              <option value="TN">Tennessee-TN</option>
              <option value="TX">Texas-TX</option>
              <option value="UT">Utah-UT</option>
              <option value="VT">Vermont-VT</option>
              <option value="VA">Virginia-VA</option>
              <option value="VI">Virgin Islands-VI</option>
              <option value="WA">Washington-WA</option>
              <option value="WV">West Virginia-WV</option>
              <option value="WI">Wisconsin-WI</option>
              <option value="WY">Wyoming-WY</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Postal Code<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("pin_code")}
              onBlur={(e) => handleChangeForMiles(e)}
              type="text"
              className="form-control border-rad-0-px"
              value={pin_code}
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input
              onChange={handleChange("country")}
              type="text"
              className="form-control border-rad-0-px"
              value="USA"
              readOnly
            />
          </div>

          {!auth && (
            <div className="form-group">
              <label>
                Password <span style={{ color: "red" }}> *</span>
              </label>
              <input
                onChange={handleChange("password")}
                type="password"
                className="form-control border-rad-0-px"
                value={password}
              />
              <em style={{ fontSize: "11px" }}>
                *Remember the password. This will be your secret code to enter
                into the site
              </em>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.quantity * nextValue.price;
    }, 0);
  };

  const getShipping = () => {
    return cart.reduce((currentValue, nextValue) => {
      return (
        currentValue +
        nextValue.quantity * (nextValue?.productID?.shipping_charge || 0)
      );
    }, 0);
  };

  const getShippingCalc = () => {
    let shipAmnt = getShipping() - Number(coupon_amnt);
    if (shipAmnt < 0) {
      shipAmnt = getTotal();
      return shipAmnt;
    } else {
      shipAmnt = getTotal() + (getShipping() - Number(coupon_amnt));
      return shipAmnt;
    }
  };

  const getShipCalSummary = () => {
    let shipAmnt1 = getShipping() - Number(coupon_amnt);
    if (shipAmnt1 < 0) {
      shipAmnt1 = 0;
      return shipAmnt1;
    }
    return shipAmnt1;
  };

  const getSalesTax = () => {
    return 0;
  };

  const showSummary = (items) => {
    calculateOrderTotal();
    return (
      <div className="col-md-12 bg-summa p-4">
        <h2 className="font-gen font-we-650 color-blk-in pt-0 pb-3 mb-0">
          Order Summary
        </h2>
        <div className="row font-we-650">
          {items.map((product, i) => (
            <div
              key={i}
              className="row font-we-650 col-md-12 py-3 text-dark-gr clearfix"
            >
              <div className="col-md-10 font-one-edit color-blk-in">
                {product.quantity} x {product.productID.Device_Name}
              </div>

              <div className="col-md-2 font-one-edit color-blk-in">
                ${product.price * product.quantity}
              </div>
            </div>
          ))}
        </div>

        <hr />

        {coupon_percentage !== 0 || coupon_amnt !== 0 ? (
          <div className="row py-3 font-we-600">
            <div className="col-md-9 font-one-edit dis-bl-text font-we-600">
              Discount (Applied Coupon - {coupon})
            </div>
            <div className="col-md-3 font-one-edit dis-bl-text font-we-600">
              ${" "}
              {coupon_amnt !== 0
                ? coupon_amnt
                : (getTotal() * coupon_percentage) / 100}
            </div>
          </div>
        ) : (
          <div className="row font-we-650">
            <div className="col-md-9 font-one-edit dis-bl-text font-we-600">
              Product Total
            </div>
            <div className="col-md-3 font-one-edit dis-bl-text font-we-600">
              ${getTotal().toFixed(2)}
            </div>

            <div className="col-md-9 font-one-edit dis-bl-text font-we-600">
              Shipping Charge
            </div>
            <div className="col-md-3 font-one-edit dis-bl-text font-we-600">
              ${parseFloat(getShipping()).toFixed(2)}
            </div>
            <div className="col-md-9 font-one-edit dis-bl-text font-we-600">
              Sales Tax
            </div>
            <div className="col-md-3 font-one-edit dis-bl-text font-we-600">
              ${salesTotalAmount}
            </div>
            <hr />

            <div className="col-md-9 font-one-edit-in color-blk-in">
              Order Total
              <br />
            </div>
            <div className="col-md-3 font-one-edit-in color-blk-in">
              ${parseFloat(orderTotal + salesTotalAmount).toFixed(2)}
            </div>
          </div>
        )}

        {coupon_percentage === 0 && coupon_amnt !== 0 && (
          <div className="row font-we-650">
            <div className="col-md-9 font-one-edit dis-bl-text font-we-600">
              Product Total
            </div>
            <div className="col-md-3 font-one-edit dis-bl-text font-we-600">
              ${getTotal()}
            </div>
            <div className="col-md-9 font-one-edit dis-bl-text font-we-600">
              Sales Tax
            </div>
            <div className="col-md-3 font-one-edit dis-bl-text font-we-600">
              ${salesTotalAmount}
            </div>
            <div className="col-md-9 font-one-edit dis-bl-text font-we-600">
              Shipping Charge
            </div>
            <div className="col-md-3 font-one-edit dis-bl-text font-we-600">
              {customerType === 6 ? (
                <>
                  <span style={{ textDecoration: "line-through" }}>
                    ${getShipping()}
                  </span>
                  <span> {getShipCalSummary()}</span>
                </>
              ) : (
                <span>${getShipping()}</span>
              )}
            </div>
            <div className="col-md-9 font-one-edit-in color-blk-in">
              Order Total
              <br />
            </div>
            <div className="col-md-3 font-one-edit-in color-blk-in">
              {customerType === 6
                ? getShippingCalc()
                : getTotal() -
                Number(coupon_amnt) +
                getShipping() +
                salesTotalAmount}
            </div>
          </div>
        )}

        {coupon_percentage !== 0 && coupon_amnt === 0 && (
          <div className="row font-we-650">
            <div className="col-md-9 font-one-edit-in color-blk-in">
              Order Total
              <br />
            </div>
            <div className="col-md-3 font-one-edit-in color-blk-in">
              {getTotal() -
                (getTotal() * coupon_percentage) / 100 +
                getShipping()}
            </div>
          </div>
        )}
        <hr />
        <div className="row">
          <em style={{ width: "100%" }}>
            Goods will be shipped within 3 working days unless there is a delay
            or product is out of stock. You will receive a notification in case
            there is a delay in shipment and a tracking link will be sent once
            your order has been dispatched.
          </em>
        </div>
      </div>
    );
  };

  const showError = () => (
    <>
      <br />
      <br />
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
        {/* {error === "11000 duplicate key error collection: SafelyTeam.users index: email already exists" ? (
                <span>Sorry! This Email already registered with us, please <a href="/login">click here to login</a> to continue or try with new email id</span>
            ) : 
            error === "11000 duplicate key error collection: SafelyTeam.users index: phone already exists" ? (
                <span>Sorry! Phone Number already exists.</span>
            ) : 
            (
                error
            )} */}
      </div>
    </>
  );

  const showMilesSuccess = () => (
    <div className="alert alert-success" role="alert">
      You got an free installation from SmartDots.
    </div>
  );

  const showMilesError = () => (
    <div className="alert alert-danger" role="alert">
      For installation you must pay the charge separately. Installation is free
      for under 50 miles.
    </div>
  );

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
                <h3 style={{ textAlign: "center" }}>Shipping Details</h3>
              </div>
            </div>

            <div className="col-md-12 plr-0px">
              <div className="container plr-0px">
                <div className="row px-5 pt-5 qty-text pb-2">
                  <div className="col-md-6 plr-0px">
                    {!loading && !auth && (
                      <div className="alert alert-warning">
                        <h4>
                          Already a registered customer, please{" "}
                          <button
                            style={{ paddingTop: "10px", lineHeight: "15px" }}
                            className="btn btn-success"
                            onClick={() => setShowLogin(true)}
                          >
                            click here to login
                          </button>
                        </h4>
                      </div>
                    )}
                    {shipping.length > 0 && showRecentAddress()}
                    {newAddressForm()}
                    {showLoginForm()}
                  </div>
                  {/* coupon form */}

                  <div className="col-md-6 plr-0px">
                    {!loading && cart.length >= 1 && showSummary(cart)}

                    <div>
                      <hr />

                      <div className="col-md-12 p-0">
                        {showCoupon && (
                          <div className="row">
                            <div className="col-md-8">
                              <div className="form-group">
                                {/* <label>Coupon</label> */}
                                <input
                                  onChange={handleChangeCoupon}
                                  type="text"
                                  className="form-control"
                                  value={coupon}
                                  placeholder="Enter Your Coupon Code Here"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-4 p-0">
                              <button
                                onClick={clickSubmitCoupon}
                                disabled={btnloading1}
                                className="btn btn-success"
                              >
                                {btnloading1 ? "Loading..." : "Apply Coupon"}
                              </button>
                              <br />
                              <br />
                            </div>
                          </div>
                        )}
                      </div>

                      {showErrorCoupon()}
                      {showSuccessCoupon()}

                      <hr />
                    </div>
                    {!loading && cart.length >= 1 && (
                      <>
                        <br />
                        <button
                          onClick={clickSubmit}
                          className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn text-center"
                        >
                          Proceed to checkout
                        </button>
                      </>
                    )}

                    {showError()}
                    {/*  {isMilesSucc && showMilesSuccess()}
                                            {isMilesErr && showMilesError()} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="push"></div>
        {showUpdateAddress()}
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Backdrop className={classes.backdrop} open={btnloading}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Backdrop className={classes.backdrop} open={loadingAdd}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Backdrop className={classes.backdrop} open={loadingLogin}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Backdrop className={classes.backdrop} open={loadingMiles}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>

      <div className={classes.root}>
        <Snackbar
          open={isMilesMsgErr}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {isMilesMsgErr}
          </Alert>
        </Snackbar>
      </div>
    </Layout>
  );
};

export default ShippingDetails;
