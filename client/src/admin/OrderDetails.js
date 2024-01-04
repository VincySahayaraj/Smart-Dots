import React, { useState, useEffect } from "react";
//import {AuthContext} from '../globalStates';
import AdminLayout from "./Layout/AdminLayout";
import {
  getOrderDetails,
  getSubOrdersByOrderid,
  getStatusValues,
  getOrderLogs,
  updateOrderStatus,
  getShipment,
  updateShipmentDetails,
  updateShipmentDetails1,
  updateShipmentPickup,
  updateOrdReturnStatus,
  getReturnProd,
  getCouponByOrderId,
  createManual,
} from "./apiAdmin";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Moment from "react-moment";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { API, SHIPMENT_KEY } from "../config";
import { Modal, Table } from "react-bootstrap";
import Base64Downloader from "react-base64-downloader";
import ShowReturnImg from "../components/ShowReturnImg";
import { getUserNotes } from "../user/apiUser";
import { updateAddress } from "../user/apiUser";
import { fetchConfig } from "../auth/fetchInterceptor";

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

const OrderDetails = ({ match }) => {
  /* const [tempstate,setTempstate]  = useState();

    const [authState] = useContext(AuthContext); */

  const classes = useStyles();

  const [showCancelled, setShowCancelled] = useState(false);

  const [showShip, setShowShip] = useState(false);

  const [showManual, setShowManual] = useState(false);

  const [totalWeight, setTotalWeight] = useState(0);

  const [NoteData, setNoteData] = useState([]);

  const [rateDetails, setRateDetails] = useState([]);

  const [checkRate, setCheckRate] = useState(false);

  const [checkShipment, setCheckShipment] = useState(false);

  const [shipmentID, setShipmentID] = useState("");

  const [pickupDate, setPickupDate] = useState("");

  const [label, setLabel] = useState("");

  const [suborders, setSuborders] = useState([]);

  const [showdelayed, setShowDelayed] = useState(false);

  const [trackDetails, setTrackDetails] = useState([]);

  const [checkTrack, setCheckTrack] = useState(false);

  const [btnloading, setBtnloading] = useState(true);

  const [trackLoading, setTrackLoading] = useState(false);

  const [btnloadingShip, setBtnloadingShip] = useState(false);

  const [btnloadingLabel, setBtnloadingLabel] = useState(false);

  const Errorclasses = useStylesErr();

  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);

  const [order, setOrder] = useState([]);

  const [statusValues, setStatusValues] = useState([]);

  const [openCancel, setOpenCancel] = useState(false);

  const [orderLogs, setOrderLogs] = useState([]);

  const [shipError, setShipError] = useState("");

  const [pickupModal, setPickupModal] = useState(false); // For WWEX Shipment Pickup model

  const [easyShipPickupModal, setEasyshipPickupModal] = useState(false); // For EasyShip Shipment

  const [itemList, setItemList] = useState([]);
  const [manualList, setManualList] = useState([
    { trackingNo: "", carriers: "" },
  ]);

  const [checkError, setCheckError] = useState("");

  const [btnloadingPick, setBtnloadingPick] = useState(false);

  const [refundVal, setRefundVal] = useState({
    refund_status: "",
    refund_date: "",
    refund_amount: "",
    refund_id: "",
  });

  const { refund_status, refund_amount, refund_date, refund_id } = refundVal;

  const [cancelVal, setCancelVal] = useState({
    cancelled_reason: "",
  });

  const { cancelled_reason } = cancelVal;

  const [numPackages, setNumPackages] = useState(1);

  const [shipVal, setShipVal] = useState({
    message: "",
    weight: "",
    length: "",
    height: "",
    width: "",
    no_of_packages: 1,
    packageType: "",
    isSameValue: true,
  });

  const {
    message,
    weight,
    length,
    width,
    height,
    no_of_packages,
    isSameValue,
    packageType,
  } = shipVal;

  const [showWWEXShipment, setShowWWEXShipment] = useState(false);

  const [shipmentType, setShipmentType] = useState("");

  const [pickupVal, setPickupVal] = useState({
    preferred_date: "",
    preferred_max_time: "",
    preferred_min_time: "",
  });

  const { preferred_date, preferred_max_time, preferred_min_time } = pickupVal;

  const [pickupError, setPickupError] = useState("");

  const [pickupSuccess, setPickupSuccess] = useState("");

  const [showRejected, setShowRejected] = useState(false);

  const [reject_reason, setRejectReason] = useState("");

  const [retType, setRetType] = useState(0);

  const [statusLoading, setStatusLoading] = useState(false);

  const [returnData, setReturnData] = useState([]);

  const [delayedVal, setDelayedVal] = useState({
    reason: "",
    resolution_time: "",
  });

  const { reason, resolution_time } = delayedVal;

  const [couponValues, setCouponValues] = useState({
    coupon_name: "",
    discount_value: "",
  });

  const { coupon_name, discount_value } = couponValues;

  const [openEditShip, setOpenEditShip] = useState(false);

  const [shipAddressVal, setShipAddressVal] = useState({
    shippingId: "",
    prefix: "",
    first_name: "",
    last_name: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pin_code: "",
    country: "",
    shiploading: "",
    successShip: false,
    errorShip: "",
  });

  const {
    shippingId,
    prefix,
    first_name,
    last_name,
    phone,
    address1,
    address2,
    city,
    state,
    pin_code,
    country,
    shiploading,
    errorShip,
  } = shipAddressVal;

  const [titleList] = useState([
    { label: "Mr", value: "Mr" },
    { label: "Mrs", value: "Mrs" },
    { label: "Ms", value: "Ms" },
    { label: "Miss", value: "Miss" },
    { label: "Dr", value: "Dr" },
    { label: "Sir", value: "Sir" },
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

  const [shipmentDetails, setShipmentDetails] = useState([]);

  const loadOrder = (id) => {
    getOrderDetails(id).then(async (data) => {
      if (data.error) {
        setBtnloading(false);
        setError(data.error);
        setOpen(true);
        setOpenCancel(false);
        setStatusLoading(false);
      } else {
        setItemList([
          {
            description: data.title,
            length: "",
            width: "",
            height: "",
            actual_weight: "",
            quantity: 1,
            category: "home_appliances",
            declared_currency: "USD",
            declared_customs_value: data.price + data.shipping_charge,
          },
        ]);
        loadNotes(match.params.orderId);
        if (
          (data.status === "Order Cancelled" ||
            data.status === "Return Completed") &&
          data.paymentId !== undefined &&
          data.paymentId !== "undefined" &&
          data.paymentId !== ""
        ) {
          paymentDetails(data.paymentId, data.userid);
        }

        if (Number(data.discount) !== 0) {
          loadCoupons(match.params.orderId);
        }

        if (data.status === "Shipped") {
          let shipmentData1 = await getShipment({
            orderId: match.params.orderId,
          });
          if (
            shipmentData1.shipmentid !== undefined &&
            shipmentData1.shipmentid !== "" &&
            shipmentData1.shipmentid !== null
          ) {
            setCheckShipment(true);
            setShipmentID(shipmentData1.shipmentid);
            setLabel(shipmentData1.label);
            if (shipmentData1.preferred_date) {
              setPickupDate(shipmentData1.preferred_date);
            }
          } else {
            setShipmentDetails(shipmentData1);
            console.log("Shipment", shipmentData1);
          }
        }

        if (
          data.status === "Return Accepted" ||
          data.status === "Return Rejecred" ||
          data.status === "Return Completed"
        ) {
          loadReturnRequests(match.params.orderId);
        }
        setOrder(data);
        loadSubOrders(match.params.orderId);
        setOpenEditShip(false);
        setOpen(false);
      }
    });
  };

  useEffect(() => {
    loadOrder(match.params.orderId);
  }, []);

  const loadNotes = (orderId) => {
    getUserNotes(orderId).then((data) => {
      if (data.error) {
        setError(data.error);
        setBtnloading(false);
      }
      setNoteData(data);
    });
  };

  const loadSubOrders = (id) => {
    getSubOrdersByOrderid({ id }).then((data) => {
      if (data.error) {
        setBtnloading(false);
        setError(data.error);
        setOpen(true);
        setOpenCancel(false);
        setStatusLoading(false);
      } else {
        setSuborders(data);
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
          sum += data[i].productid.weight;
        }
        setTotalWeight(sum);
        /*  setShipVal({...shipVal,weight:sum}); */
        loadStatusValues();
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues().then((data) => {
      if (data.error) {
        setBtnloading(false);
        setError(data.error);
        setOpen(true);
        setOpenCancel(false);
        setStatusLoading(false);
      } else {
        loadOrderLogs(match.params.orderId);
        setStatusValues(data);
      }
    });
  };

  const loadOrderLogs = (id) => {
    getOrderLogs({ id }).then((data) => {
      if (data.error) {
        setBtnloading(false);
        setError(data.error);
        setOpen(true);
        setOpenCancel(false);
      } else {
        setOrderLogs(data);
        setBtnloading(false);
        setOpen(false);
        setOpenCancel(false);
        setStatusLoading(false);
      }
    });
  };

  const loadReturnRequests = (orderId) => {
    getReturnProd(orderId).then((data) => {
      if (data.error) {
        setStatusLoading(false);
      } else {
        setReturnData(data);
        if (data.length >= 1) {
          setRetType(data[0].return_type);
        }
      }
    });
  };

  const loadCoupons = (orderId) => {
    getCouponByOrderId({ orderId }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCouponValues({
          ...couponValues,
          coupon_name: data.couponid.coupon_code,
          discount_value: data.orderid.discount,
        });
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Update Address Start

  const handleChangeUpdateAddress = (name) => (event) => {
    setShipAddressVal({
      ...shipAddressVal,
      errorShip: "",
      successShip: false,
      [name]: event.target.value,
    });
  };

  const handleAddressModal = () => {
    setShipAddressVal({
      ...shipAddressVal,
      shippingId: order.shipping._id,
      prefix: order.shipping.prefix,
      first_name: order.shipping.first_name,
      last_name: order.shipping.last_name,
      address1: order.shipping.address1,
      address2: order.shipping.address2 || "",
      phone: order.shipping.phone,
      city: order.shipping.city,
      state: order.shipping.state,
      pin_code: order.shipping.pin_code,
      country: order.shipping.country,
    });
    setOpenEditShip(true);
    return;
  };

  const clickSubmitUpdateAddress = (event) => {
    event.preventDefault();
    setShipAddressVal({
      ...shipAddressVal,
      errorShip: "",
      successShip: false,
      shiploading: true,
    });
    updateAddress(shippingId, {
      ID: shippingId,
      prefix,
      first_name,
      last_name,
      phone,
      address1,
      address2,
      city,
      state,
      country,
      pin_code,
    }).then((data) => {
      if (data.error) {
        setShipAddressVal({
          ...shipAddressVal,
          errorShip: data.error,
          successShip: false,
          shiploading: false,
        });
      } else {
        window.location.reload();
        //loadOrder(match.params.orderId);
      }
    });
  };

  const showUpdateAddress = () => (
    <Modal
      show={openEditShip}
      onHide={() => setOpenEditShip(false)}
      size="lg"
      centered
    >
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
                  onChange={handleChangeUpdateAddress("prefix")}
                  className="form-control"
                >
                  <option>Select Title</option>{" "}
                  {titleList.map((room) =>
                    prefix === room.value ? (
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
              </div>

              <div className="form-group">
                <label className="text-muted">
                  First Name<span style={{ color: "red" }}> *</span>
                </label>
                <input
                  onChange={handleChangeUpdateAddress("first_name")}
                  type="text"
                  className="form-control"
                  value={first_name}
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-muted">
                  Last Name<span style={{ color: "red" }}> *</span>
                </label>
                <input
                  onChange={handleChangeUpdateAddress("last_name")}
                  type="text"
                  className="form-control"
                  value={last_name}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">
                  Phone Number<span style={{ color: "red" }}> *</span>
                </label>
                <input
                  onChange={handleChangeUpdateAddress("phone")}
                  type="text"
                  className="form-control border-rad-0-px"
                  value={phone}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">
                  Address Line 1<span style={{ color: "red" }}> *</span>
                </label>
                <input
                  onChange={handleChangeUpdateAddress("address1")}
                  type="text"
                  className="form-control border-rad-0-px"
                  value={address1}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Address Line 2</label>
                <input
                  onChange={handleChangeUpdateAddress("address2")}
                  type="text"
                  className="form-control border-rad-0-px"
                  value={address2}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="text-muted">Town/City</label>
                <input
                  onChange={handleChangeUpdateAddress("city")}
                  type="text"
                  className="form-control border-rad-0-px"
                  value={city}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">
                  State<span style={{ color: "red" }}> *</span>
                </label>
                <select
                  required
                  onChange={handleChangeUpdateAddress("state")}
                  className="form-control"
                >
                  <option>Select State</option>{" "}
                  {stateList.map((room) =>
                    state === room.value ? (
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
                  Postcode<span style={{ color: "red" }}> *</span>
                </label>
                <input
                  onChange={handleChangeUpdateAddress("pin_code")}
                  type="text"
                  className="form-control border-rad-0-px"
                  value={pin_code}
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Country</label>
                <input
                  onChange={handleChangeUpdateAddress("country")}
                  type="text"
                  className="form-control border-rad-0-px"
                  readOnly
                  value={country}
                />
              </div>

              <button disabled={shiploading} className="btn btn-success">
                {shiploading ? "Loading..." : "Update"}
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
      style={{ display: errorShip ? "" : "none" }}
    >
      {errorShip}
    </div>
  );

  // Update Address End

  // Status Change Start

  const handleStatusChange = async (e, orderId) => {
    setShipError("");
    if (e.target.value !== "Update Status") {
      if (window.confirm("Do you want to change this status?")) {
        if (e.target.value === "Shipped") {
          //setShowShip(true);
          setShowManual(true);
        } else if (e.target.value === "Order Cancelled") {
        /* else if(e.target.value === "Delayed") {
                } */
          setShowCancelled(() => setShowCancelled(true));
        } else {
          setOpenCancel(true);
          updateOrderStatus({ orderId, status: e.target.value }).then(
            (data) => {
              if (data.error) {
                setError("Status Update Failed!");
                setOpen(true);
                setOpenCancel(false);
              } else {
                loadOrder(match.params.orderId);
              }
            }
          );
        }
      }
    }
  };

  const handleStatusChange1 = async (e, orderId, paymentId) => {
    setShipError("");
    if (window.confirm("Do you want to change this status?")) {
      if (e.target.value === "Return Completed") {
        if (retType === 2) {
          if (
            paymentId !== "" &&
            paymentId !== undefined &&
            paymentId !== "null" &&
            paymentId !== "undefined"
          ) {
            setStatusLoading(true);
            if (refund_id === "") {
              const refund = await fetch(`${API}/refund`, {
                method: "POST",
                headers: fetchConfig,
                body: JSON.stringify({
                  paymentintentid: String(order.paymentId),
                  userid: String(order.userid._id),
                }),
              });
              const refunddetails = await refund.json();

              updateOrderStatus({
                retType,
                orderId: match.params.orderId,
                status: "Return Completed",
              }).then((data) => {
                if (data.error) {
                  setStatusLoading(false);
                } else {
                  loadOrder(match.params.orderId);
                }
              });
            }
          }
        } else if (retType === 1) {
          setStatusLoading(true);
          updateOrderStatus({
            retType,
            orderId: orderId,
            status: "Return Completed",
          }).then((data) => {
            if (data.error) {
              console.log("Status update failed");
              setStatusLoading(false);
            } else {
              loadOrder(match.params.orderId);
            }
          });
        }
      } else if (e.target.value === "Return Accepted") {
        setStatusLoading(true);
        updateOrdReturnStatus({
          orderId: orderId,
          status: "Return Accepted",
          retType,
        }).then((data) => {
          if (data.error) {
            setStatusLoading(false);
            console.log("Status update failed");
          } else {
            loadOrder(match.params.orderId);
          }
        });
      } else if (e.target.value === "Return Rejected") {
        setShowRejected(true);
        return 0;
      }
    }
  };

  // return rejected

  const handleChangeReason = (e) => {
    setRejectReason(e.target.value);
  };

  const clickSubmitReason = (e) => {
    setStatusLoading(true);
    updateOrdReturnStatus({
      retType,
      orderId: match.params.orderId,
      cancelled_reason: reject_reason,
      status: "Return Rejected",
    }).then((data) => {
      if (data.error) {
        setStatusLoading(false);
        console.log("Status update failed");
      } else {
        loadOrder(match.params.orderId);
        setShowRejected(false);
      }
    });
  };

  const showRejectReasonModal = () => {
    return (
      <Modal
        show={showRejected}
        onHide={() => setShowRejected(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={clickSubmitReason}>
            <div className="form-group">
              <label className="text-muted">
                Reason<span style={{ color: "red" }}> *</span>
              </label>
              <input
                onChange={handleChangeReason}
                type="text"
                className="form-control"
                value={reject_reason}
                required
              />
            </div>
            <center>
              <br />
              <button className="btn btn-outline-primary">Continue</button>
            </center>
          </form>
        </Modal.Body>
      </Modal>
    );
  };

  // Return Rejected End

  const [statusList1] = useState([
    { label: "Return Requested", value: "Return Requested" },
    { label: "Return Accepted", value: "Return Accepted" },
    { label: "Return Rejected", value: "Return Rejected" },
    { label: "Return Completed", value: "Return Completed" },
  ]);

  const showStatus = (o, status1, paymentId1) => (
    <div className="form-group">
      {status1 === "Awaiting Payment" && (
        <select
          className="form-control"
          onChange={(e) => handleStatusChange(e, o)}
        >
          {" "}
          <option>Update Status</option>
          {statusValues.map((status, index) =>
            status1 === status
              ? ""
              : status === "Order Cancelled" && (
                  <option key={index} value={status}>
                    {status}
                  </option>
                )
          )}
        </select>
      )}

      {status1 === "Awaiting Customer Pre-configuration" && (
        <select
          className="form-control"
          onChange={(e) => handleStatusChange(e, o)}
        >
          {" "}
          <option>Update Status</option>
          {statusValues.map((status, index) =>
            status1 === status
              ? ""
              : status !== "Awaiting Payment" &&
                status !== "Customer Pre-configuration Complete" && (
                  <option key={index} value={status}>
                    {status}
                  </option>
                )
          )}
        </select>
      )}

      {status1 === "SmartDots Pre-configuration Complete" && (
        <select
          className="form-control"
          onChange={(e) => handleStatusChange(e, o)}
        >
          {" "}
          <option>Update Status</option>
          {statusValues.map((status, index) =>
            status1 === status
              ? ""
              : status !== "Awaiting Payment" &&
                status !== "Awaiting Customer Pre-configuration" &&
                status !== "Customer Pre-configuration Complete" && (
                  <option key={index} value={status}>
                    {status}
                  </option>
                )
          )}
        </select>
      )}

      {status1 === "Processing" && (
        <select
          className="form-control"
          onChange={(e) => handleStatusChange(e, o)}
        >
          {" "}
          <option>Update Status</option>
          {statusValues.map((status, index) =>
            status1 === status
              ? ""
              : status !== "Awaiting Payment" && (
                  <option key={index} value={status}>
                    {status}
                  </option>
                )
          )}
        </select>
      )}

      {status1 === "Customer Pre-configuration Complete" && (
        <select
          className="form-control"
          onChange={(e) => handleStatusChange(e, o)}
        >
          {" "}
          <option>Update Status</option>
          {statusValues.map((status, index) =>
            status1 === status
              ? ""
              : status !== "Awaiting Payment" &&
                status !== "Awaiting Customer Pre-configuration" && (
                  <option key={index} value={status}>
                    {status}
                  </option>
                )
          )}
        </select>
      )}

      {status1 === "Shipped" && (
        <select
          className="form-control"
          onChange={(e) => handleStatusChange(e, o)}
        >
          {" "}
          <option>Update Status</option>
          {statusValues.map((status, index) =>
            status1 === status
              ? ""
              : status !== "Awaiting Payment" &&
                status !== "Processing" && (
                  <option key={index} value={status}>
                    {status}
                  </option>
                )
          )}
        </select>
      )}

      {/* {(status1 === "Delivered") && (<select
                className="form-control"
                onChange={e => handleStatusChange(e, o,paymentId1)}
            > <option>Update Status</option>
            {
                statusValues.map((status, index) => (
                (status1 === status ? ''
                  : ((status !== "Awaiting Payment" && status !== "Awaiting Customer Pre-configuration" && status !== "Customer Pre-configuration Complete" && status !== "SmartDots Pre-configuration Complete" && status !== "Shipped" && status!=="Delayed") && <option key={index} value={status}>
                  {status}
              </option>) )
                
            ))}
        </select>)} */}

      {status1 === "Delivered" && (
        <select className="form-control" readOnly>
          {" "}
          <option>Delivered</option>
        </select>
      )}

      {status1 === "Order Cancelled" && (
        <select className="form-control" readOnly>
          {" "}
          <option>Order Cancelled</option>
        </select>
      )}

      {status1 === "Delayed" && (
        <select
          className="form-control"
          onChange={(e) => handleStatusChange(e, o)}
        >
          {" "}
          <option>Update Status</option>
          {statusValues.map((status, index) =>
            status1 === status
              ? ""
              : status !== "Awaiting Payment" &&
                status !== "Processing" && (
                  <option key={index} value={status}>
                    {status}
                  </option>
                )
          )}
        </select>
      )}

      {status1 === "Return Requested" && (
        <select
          className="form-control"
          onChange={(e) => handleStatusChange1(e, o, paymentId1)}
        >
          <option>Update Status</option>
          {statusList1.map((s) =>
            status1 === s.value ? (
              ""
            ) : (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            )
          )}
        </select>
      )}

      {status1 === "Return Accepted" && (
        <select
          className="form-control"
          onChange={(e) => handleStatusChange1(e, o, paymentId1)}
        >
          <option>Update Status</option>
          <option value="Return Completed">Return Completed</option>
        </select>
      )}
    </div>
  );

  // Status Change End

  // Check Refund start

  const paymentDetails = async (paymentId, userId) => {
    if (paymentId) {
      const response = await fetch(`${API}/get-refund`, {
        method: "POST",
        headers: fetchConfig,
        body: JSON.stringify({
          paymentid: String(paymentId),
          userid: String(userId),
        }),
      });

      const payment = await response.json();

      var getRefund = payment.data[0];

      if (getRefund !== undefined) {
        var tempRefundID = getRefund.id;

        const response1 = await fetch(`${API}/retrieve-refund`, {
          method: "POST",
          headers: fetchConfig,
          body: JSON.stringify({
            ID: String(tempRefundID),
            userid: String(userId),
          }),
        });

        const payment1 = await response1.json();

        setRefundVal({
          refund_date: payment1.created,
          refund_id: payment1.id,
          refund_amount: payment1.amount,
          refund_status: payment1.status,
        });
      }
    }
  };

  // Check Refund End

  // Cancel Order Starts

  const clickSubmitCancelled = async (event) => {
    event.preventDefault();
    setOpenCancel(true);
    setCancelVal({ ...cancelVal });
    var refundID = "";
    var tempRefundID;
    var getRefund;
    var payment;
    if (order.status !== "Awaiting Payment") {
      const response = await fetch(`${API}/get-refund`, {
        method: "POST",
        headers: fetchConfig,
        body: JSON.stringify({
          paymentid: String(order.paymentId),
          userid: String(order.userid._id),
        }),
      });

      payment = await response.json();

      getRefund = payment.data[0];

      if (getRefund !== undefined) {
        tempRefundID = getRefund.id;

        const response1 = await fetch(`${API}/retrieve-refund`, {
          method: "POST",
          headers: fetchConfig,
          body: JSON.stringify({
            ID: String(tempRefundID),
            userid: String(order.userid._id),
          }),
        });

        const payment1 = await response1.json();

        refundID = payment1.id;

        if (payment1.status === "succeeded") {
          setError("Your order got refund already!!");
          setOpen(true);
          setCancelVal({
            ...cancelVal,
            cancelled_reason: "",
          });
          setShowCancelled(false);
          setOpenCancel(false);
          return 0;
        }
      }

      if (
        order.paymentId !== "" &&
        order.paymentId !== undefined &&
        order.paymentId !== "null" &&
        order.paymentId !== "undefined"
      ) {
        if (refundID === "") {
          const refund = await fetch(`${API}/refund`, {
            method: "POST",
            headers: fetchConfig,
            body: JSON.stringify({
              paymentintentid: String(order.paymentId),
              userid: String(order.userid._id),
            }),
          });
          const refunddetails = await refund.json();

          if (refunddetails.status === "succeeded") {
            updateOrderStatus({
              orderId: order._id,
              status: "Order Cancelled",
              cancelled_reason,
            }).then((data) => {
              if (data.error) {
                console.log("Cancel Error", data.error);
              } else {
                setCancelVal({
                  ...cancelVal,
                  cancelled_reason: "",
                });
                setShowCancelled(false);
                loadOrder(match.params.orderId);
              }
            });
          } else {
            setError("Refund Error, Please try again or comeback later!!");
            setOpen(true);
            setCancelVal({
              ...cancelVal,
              cancelled_reason: "",
            });
            setShowCancelled(false);
            setOpenCancel(false);
            return 0;
          }
        }
      }
    } else {
      updateOrderStatus({
        orderId: order._id,
        status: "Order Cancelled",
        cancelled_reason,
      }).then((data) => {
        if (data.error) {
          console.log("Cancel Error", data.error);
        } else {
          setCancelVal({
            ...cancelVal,
            cancelled_reason: "",
          });
          setShowCancelled(false);
          loadOrder(match.params.orderId);
        }
      });
    }
  };

  const handleChangeforCancelled = (name) => (event) => {
    setCancelVal({ ...cancelVal, [name]: event.target.value });
  };

  const showCancelModal = () => {
    return (
      <Modal
        show={showCancelled}
        onHide={() => setShowCancelled(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={clickSubmitCancelled}>
            <div className="form-group">
              <label className="text-muted">
                Reason<span style={{ color: "red" }}> *</span>
              </label>
              <textarea
                onChange={handleChangeforCancelled("cancelled_reason")}
                className="form-control"
                value={cancelled_reason}
                required
              />
            </div>
            <center>
              <br />
              <button className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn">
                Continue
              </button>
            </center>
          </form>
        </Modal.Body>
      </Modal>
    );
  };

  // Cancel Order Ends

  // Shipping Order Start

  const handleChangeforShipment = (name) => (event) => {
    setRateDetails([]);
    setShipmentType("");
    if (name === "isSameValue") {
      if (event.target.value === "true") {
        setShipVal({ ...shipVal, [name]: true });
      } else if (event.target.value === "false") {
        setShipVal({ ...shipVal, [name]: false });
      }
    } else if (name === "packageType") {
      if (event.target.value === "UPS01") {
        // UPS letter //hiding length, height, width
        setShipVal({ ...shipVal, [name]: event.target.value, weight: 0.5 });
      } else if (event.target.value === "UPS02") {
        //UPS Tube
        setShipVal({
          ...shipVal,
          [name]: event.target.value,
          length: 38,
          width: 6,
          height: 6,
        });
      } else if (event.target.value === "UPS03") {
        // UPS PAK
        setShipVal({
          ...shipVal,
          [name]: event.target.value,
          length: 17,
          width: 13,
          height: 1,
        });
      } else if (event.target.value === "Small") {
        setShipVal({
          ...shipVal,
          [name]: event.target.value,
          length: 13,
          width: 11,
          height: 2,
        });
      } else if (event.target.value === "Medium") {
        setShipVal({
          ...shipVal,
          [name]: event.target.value,
          length: 16,
          width: 11,
          height: 3,
        });
      } else if (event.target.value === "Large") {
        setShipVal({
          ...shipVal,
          [name]: event.target.value,
          length: 18,
          width: 13,
          height: 3,
        });
      }
    } else {
      setShipVal({ ...shipVal, [name]: event.target.value });
    }
  };

  const easyShipClickSubmit = async (event) => {
    event.preventDefault();
    setBtnloadingShip(true);
    setShipVal({ ...shipVal });
    let shipment1 = await fetch("https://api.easyship.com/rate/v1/rates", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${SHIPMENT_KEY}`,
      },

      body: JSON.stringify({
        destination_country_alpha2: "US",
        destination_city: String(order.shipping.city),
        destination_address_line_1: String(order.shipping.address1),
        destination_postal_code: String(order.shipping.pin_code),
        taxes_duties_paid_by: "Sender",
        is_insured: false,
        apply_shipping_rules: true,
        items: itemList,
        /* {
                        quantity: 1,
                        actual_weight: Number(weight),
                        height: Number(height),
                        width: Number(width),
                        length: Number(length),
                        category: 'home_appliances',
                        declared_currency: 'USD',
                        declared_customs_value: 35
                      } */
      }),
    });

    let shipmentResults = await shipment1.json();

    var rateResults = [];
    var rateCount = shipmentResults.rates.length;
    for (var i = 0; i < rateCount; i++) {
      rateResults.push(shipmentResults.rates[i]);
    }

    if (rateCount >= 1) {
      setShipmentType(1);
      setRateDetails(rateResults);
      setCheckRate(true);
      setBtnloadingShip(false);
      setCheckError("");
    } else {
      setCheckError(
        "Sorry, we couldn't find any shipping solutions based on the information provided."
      );
      setBtnloadingShip(false);
      setCheckRate(false);
    }
  };

  // WWEX Shipment - Alternate
  const wwexClickSubmitShipment = async (event) => {
    event.preventDefault();
    setBtnloadingShip(true);
    setShipVal({ ...shipVal });
    let shipmentResults;
    fetch(`${API}/shipping/rates`, {
      method: "POST",
      headers: fetchConfig,
      body: JSON.stringify({
        destination_country_alpha2: "USA",
        destination_city: String(order.shipping.city),
        destination_address_line_1: String(order.shipping.address1),
        destination_postal_code: String(order.shipping.pin_code),
        destination_state: String("TX"),
        quantity: Number(no_of_packages),
        height: Number(height),
        width: Number(width),
        length: Number(length),
        weight: Number(weight),
        description: order.title,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // setTempstate(JSON.parse(data).quoteSpeedFreightShipmentResponse.quoteSpeedFreightShipmentReturn[0].freightShipmentQuoteResults[0].freightShipmentQuoteResult)
        if (data.error) {
          setCheckError(data.error);
          setBtnloadingShip(false);
          return;
        }

        shipmentResults =
          JSON.parse(data).quoteSpeedFreightShipmentResponse
            .quoteSpeedFreightShipmentReturn[0].freightShipmentQuoteResults[0]
            .freightShipmentQuoteResult;

        var rateResults = [];
        var rateCount = shipmentResults.length;
        for (var i = 0; i < rateCount; i++) {
          rateResults.push(shipmentResults[i]);
        }

        if (rateCount >= 1) {
          setShipmentType(2);
          setRateDetails(rateResults);
          setCheckRate(true);
          setBtnloadingShip(false);
          setCheckError("");
        } else {
          setCheckError(
            "Sorry, we couldn't find any shipping solutions based on the information provided."
          );
          setBtnloadingShip(false);
          setCheckRate(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const clickSubmitShipment1 = (courierId, amount) => {
    if (window.confirm("Are you sure you want to continue?")) {
      updateOrderStatus({
        shipmentType,
        itemList,
        orderId: match.params.orderId,
        no_of_packages,
        length,
        width,
        height,
        weight,
        amount: amount,
        status: "Shipped",
        courierid: courierId,
        message,
      }).then((data) => {
        if (data.error) {
          console.log("Status update failed");
        } else {
          setShowShip(false);
          setShowWWEXShipment(false);
          setShipVal({
            ...shipVal,
            message: "",
            width: "",
            height: "",
            no_of_packages: "",
            weight: "",
            length: "",
          });
          loadOrder(match.params.orderId);
        }
      });
    }
  };

  // Manual Shipment

  const manualShipmentSubmit = async (event) => {
    event.preventDefault();
    setBtnloadingShip(true);
    setShipmentType(3);
    createManual({
      shipmentType: 3,
      itemList: manualList,
      orderId: match.params.orderId,
      status: "Shipped",
    }).then((data) => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        setShowShip(false);
        setShowWWEXShipment(false);
        setShowManual(false);
        loadOrder(match.params.orderId);
      }
    });
  };

  /* const courierHistory = rateDetails.map((p,i) => (
        <tr key={i}>    
            <td>{p.carrierName[0]}</td>
            <td>{p.transitDays[0]}</td>
            <td>{p.totalPrice[0]}</td>  
            <td onClick={() => clickSubmitShipment1(p.shipmentQuoteId[0],p.totalPrice[0])}><button className="btn btn-info btn-gra-my-p">Choose</button></td>                                 
        </tr>
    )) */

  const showCourierDetails = () =>
    checkRate &&
    shipmentType &&
    shipmentType === 1 && (
      <Table responsive striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Courier Name</th>
            <th>
              Min
              <br />
              Delivery days
            </th>
            <th>
              Max
              <br />
              Delivery days
            </th>
            <th>
              Shipment
              <br />
              Charge ($)
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rateDetails.map((p, i) => (
            <tr key={i}>
              <td>{p.courier_name}</td>
              <td>{p.min_delivery_time}</td>
              <td>{p.max_delivery_time}</td>
              <td>{p.shipment_charge_total}</td>
              <td
                onClick={() =>
                  clickSubmitShipment1(p.courier_id, p.shipment_charge_total)
                }
              >
                <button className="btn btn-info btn-gra-my-p">Choose</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );

  /* const showCourierDetails = () => (
        (checkRate) &&
            <Table responsive striped bordered hover size="sm"> 
                <thead>           
                    <tr>                                 
                        <th>Courier Name</th>
                        <th>Transit<br/>Days</th>
                        <th>Shipment<br/>Charge ($)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {courierHistory}
                </tbody>
            </Table>   
    ) */

  const showWWEXCourierDetails = () =>
    checkRate &&
    shipmentType &&
    shipmentType === 2 && (
      <Table responsive striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Courier Name</th>
            <th>
              Transit
              <br />
              Days
            </th>
            <th>
              Shipment
              <br />
              Charge ($)
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rateDetails.map((p, i) => (
            <tr key={i}>
              <td>{p.carrierName[0]}</td>
              <td>{p.transitDays[0]}</td>
              <td>{p.totalPrice[0]}</td>
              <td
                onClick={() =>
                  clickSubmitShipment1(p.shipmentQuoteId[0], p.totalPrice[0])
                }
              >
                <button className="btn btn-info btn-gra-my-p">Choose</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );

  const courierErrormsg = () => {
    if (checkError) {
      return <h3 className="text-danger">{checkError}</h3>;
    }
  };

  const handleChangeforShipmentModel = (type) => {
    if (Number(type) === 1) {
      setShipmentType("");
      setRateDetails([]);
      setShowShip(false);
      setShowWWEXShipment(true);
      setCheckError("");
      setShowManual(false);
    } else if (Number(type) === 2) {
      setShipmentType("");
      setRateDetails([]);
      setShowWWEXShipment(false);
      setShowShip(true);
      setCheckError("");
      setShowManual(false);
    } else if (Number(type) === 3) {
      setShowManual(true);
      setShowWWEXShipment(false);
      setShowShip(false);
    }
  };

  const [packageLength] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...itemList];
    list[index][name] = Number(value);
    setItemList(list);
  };

  // handle click event of the Add button
  const handleAddClick = (e, name) => {
    setNumPackages(e.target.value);
    var eventVal = e.target.value;
    var len = itemList.length;
    var list = [...itemList];
    var customPrice =
      Number(order.price + order.shipping_charge) / Number(eventVal);
    if (customPrice <= 0) {
      customPrice = Number(order.price + order.shipping_charge);
    }
    if (Number(eventVal) > Number(len)) {
      list = [];
      for (var i = 0; i < eventVal; i++) {
        list.push({
          description: order.title,
          length: "",
          width: "",
          height: "",
          actual_weight: "",
          quantity: 1,
          category: "home_appliances",
          declared_currency: "USD",
          declared_customs_value: customPrice,
        });
      }
      setItemList(list);
    } else if (Number(eventVal) < Number(len)) {
      var tempVal = len - eventVal;
      for (var j = 0; j < tempVal; j++) {
        list.pop();
      }
      setItemList(list);
    }
    return;
  };

  // For Manual List

  const handleManualInput = (e, index) => {
    const { name, value } = e.target;
    console.log("Name", name);
    const list = [...manualList];
    list[index][name] = value;
    setManualList(list);
  };

  const handleAddClickManual = (e, name) => {
    var eventVal = e.target.value;
    var len = manualList.length;
    var list = [...manualList];

    if (Number(eventVal) > Number(len)) {
      list = [];
      for (var i = 0; i < eventVal; i++) {
        list.push({ trackingNo: "", carriers: "" });
      }
      setManualList(list);
    } else if (Number(eventVal) < Number(len)) {
      var tempVal = len - eventVal;
      for (var j = 0; j < tempVal; j++) {
        list.pop();
      }
      setManualList(list);
    }
    return;
  };

  const showManualShipment = () => {
    return (
      <Modal
        show={showManual}
        onHide={() => setShowManual(false)}
        dialogClassName="modal-90w"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Shipment Details - MANUAL METHOD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={manualShipmentSubmit}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label className="text-muted">
                    Number of Packages:<span style={{ color: "red" }}> *</span>
                  </label>
                  <select
                    required
                    onChange={(e) => handleAddClickManual(e)}
                    className="form-control"
                  >
                    <option defaultValue="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>
              <hr />

              {manualList.length >= 1 &&
                manualList.map((x, i) => (
                  <div className="col-md-3" key={i}>
                    <label
                      className="text-muted"
                      style={{ textDecoration: "underline" }}
                    >
                      <b>Package {i + 1}</b>
                    </label>

                    <div className="form-group">
                      <label className="text-muted">
                        Tracking Number<span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        onChange={(e) => handleManualInput(e, i)}
                        type="text"
                        className="form-control"
                        name="trackingNo"
                        value={x.trackingNo}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-muted">
                        Carriers<span style={{ color: "red" }}> *</span>
                      </label>
                      <select
                        required
                        name="carriers"
                        onChange={(e) => handleManualInput(e, i)}
                        className="form-control"
                      >
                        <option>Select Carriers</option>
                        <option value="DHL">DHL</option>
                        <option value="UPS">UPS</option>
                        <option value="FedEx">FedEx</option>
                        <option value="USPS">USPS</option>
                      </select>
                    </div>
                  </div>
                ))}
            </div>
            <center>
              <button
                disabled={btnloadingShip}
                className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn"
              >
                {btnloadingShip ? "Loading..." : "Submit"}
              </button>
            </center>
          </form>
          <br />
          <center>
            <button
              style={{ margin: "3px" }}
              onClick={() => handleChangeforShipmentModel(2)}
              className="text-center btn btn-outline-primary"
            >
              EASY SHIP METHOD
            </button>
            <button
              style={{ margin: "3px" }}
              onClick={() => handleChangeforShipmentModel(1)}
              className="text-center btn btn-outline-primary"
            >
              WWEX DIRECT METHOD
            </button>
          </center>
          {/*  {showCourierDetails()}
                        {courierErrormsg()} */}
        </Modal.Body>
      </Modal>
    );
  };

  const showEasyshipShipmentModal = () => {
    // Demo Dynamic Update
    return (
      <Modal
        show={showShip}
        onHide={() => setShowShip(false)}
        dialogClassName="modal-90w"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Shipment Details - EASY SHIP METHOD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={easyShipClickSubmit}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label className="text-muted">
                    Number of Packages:<span style={{ color: "red" }}> *</span>
                  </label>
                  <select
                    required
                    onChange={(e) => handleAddClick(e)}
                    className="form-control"
                  >
                    {/* <option >Select no of packages</option> */}
                    <option defaultValue="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>
              <hr />

              {itemList.length &&
                itemList.map((x, i) => (
                  <div className="col-md-3" key={i}>
                    <label
                      className="text-muted"
                      style={{ textDecoration: "underline" }}
                    >
                      <b>Package {i + 1}</b>
                    </label>
                    <div className="form-group">
                      <label className="text-muted">
                        Length (cm)<span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        onChange={(e) => handleInputChange(e, i)}
                        type="number"
                        className="form-control"
                        name="length"
                        value={x.length}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-muted">
                        Width (cm)<span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        onChange={(e) => handleInputChange(e, i)}
                        type="number"
                        className="form-control"
                        name="width"
                        value={x.width}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-muted">
                        Height (cm)<span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        onChange={(e) => handleInputChange(e, i)}
                        type="number"
                        className="form-control"
                        name="height"
                        value={x.height}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-muted">
                        Weight (kg)<span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        onChange={(e) => handleInputChange(e, i)}
                        type="number"
                        className="form-control"
                        name="actual_weight"
                        value={x.actual_weight}
                        required
                      />
                    </div>
                  </div>
                ))}
            </div>

            <center>
              <button
                disabled={btnloadingShip}
                className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn"
              >
                {btnloadingShip ? "Loading..." : "Submit"}
              </button>
            </center>
          </form>
          <br />
          <center>
            <button
              style={{ margin: "3px" }}
              onClick={() => handleChangeforShipmentModel(1)}
              className="text-center btn btn-outline-primary"
            >
              WWEX DIRECT METHOD
            </button>
            <button
              style={{ margin: "3px" }}
              onClick={() => handleChangeforShipmentModel(3)}
              className="text-center btn btn-outline-primary"
            >
              MANUAL METHOD
            </button>
          </center>
          {showCourierDetails()}
          {courierErrormsg()}
        </Modal.Body>
      </Modal>
    );
  };

  /* const showEasyshipShipmentModal = () => {
        return (
            <Modal show={showShip} onHide={() => setShowShip(false)} 
            dialogClassName="modal-90w"
            size="lg"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Shipment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={easyShipClickSubmit}>

                    <div className="form-group">
                        <label className="text-muted">Package Type:<span style={{color:"red"}}> *</span></label>
                            <select required
                                onChange={handleChangeforShipment('packageType')} 
                                className="form-control"
                            >
                                <option >Select Box type</option>
                                <option value="custom">Customer Packaging</option>
                                <option value="UPS01">UPS Letter</option>
                                <option value="UPS02">UPS Tube</option>
                                <option value="UPS03">UPS PAK</option>
                                <option value="Small">UPS Express Box - Small</option>
                                <option value="Medium">UPS Express Box - Medium</option>
                                <option value="Large">UPS Express Box - Large</option>
                            </select>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Length (cm)<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChangeforShipment('length')} type="text" className="form-control" value={length} required/>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Width (cm)<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChangeforShipment('width')} type="number" className="form-control" value={width} required/>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Height (cm)<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChangeforShipment('height')} type="number" className="form-control" value={height} required/>
                    </div>
                   
                    <div className="form-group">
                        <label className="text-muted">Weight (kg)<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChangeforShipment('weight')} type="number" className="form-control" value={weight} autoFocus required/>
                    </div>

                    <center>
                        <button disabled={btnloadingShip} className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn">{btnloadingShip ? "Loading..." : "Submit"}</button>
                    </center>
                </form>
                <br/>
                <center><button onClick={() => handleChangeforShipmentModel(1)} className="text-center btn btn-outline-primary">ALTERNATE SHIPPING METHOD</button></center>
                    {showCourierDetails()}
                    {courierErrormsg()}
                </Modal.Body>
            </Modal>
        )
    } */

  const showWWEXShipmentModal = () => {
    return (
      <Modal
        show={showWWEXShipment}
        onHide={() => setShowWWEXShipment(false)}
        dialogClassName="modal-90w"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Shipment Details - WWEX DIRECT METHOD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={wwexClickSubmitShipment}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-muted">
                    Number of Packages:<span style={{ color: "red" }}> *</span>
                  </label>
                  <select
                    required
                    onChange={handleChangeforShipment("no_of_packages")}
                    className="form-control"
                  >
                    {packageLength.map((s, i) =>
                      no_of_packages === s ? (
                        <option selected key={i} defaultValue={s}>
                          {s}
                        </option>
                      ) : (
                        <option key={i} value={s}>
                          {s}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-muted">
                    Use the same values for all packages?
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <select
                    required
                    disabled={Number(no_of_packages) === 1 ? true : false}
                    onChange={handleChangeforShipment("isSameValue")}
                    className="form-control"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label className="text-muted">
                    Package Type:<span style={{ color: "red" }}> *</span>
                  </label>
                  <select
                    required
                    onChange={handleChangeforShipment("packageType")}
                    className="form-control"
                  >
                    <option>Select Box type</option>
                    <option value="custom">Customer Packaging</option>
                    <option value="UPS01">UPS Letter</option>
                    <option value="UPS02">UPS Tube</option>
                    <option value="UPS03">UPS PAK</option>
                    <option value="Small">UPS Express Box - Small</option>
                    <option value="Medium">UPS Express Box - Medium</option>
                    <option value="Large">UPS Express Box - Large</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="text-muted">
                    Weight (lbs)<span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    onChange={handleChangeforShipment("weight")}
                    type="number"
                    className="form-control"
                    value={weight}
                    autoFocus
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label className="text-muted">
                    Length (in)<span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    onChange={handleChangeforShipment("length")}
                    type="text"
                    className="form-control"
                    value={length}
                    required
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label className="text-muted">
                    Width (in)<span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    onChange={handleChangeforShipment("width")}
                    type="number"
                    className="form-control"
                    value={width}
                    required
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label className="text-muted">
                    Height (in)<span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    onChange={handleChangeforShipment("height")}
                    type="number"
                    className="form-control"
                    value={height}
                    required
                  />
                </div>
              </div>
            </div>

            {/* <div className="form-group">
                        <label className="text-muted">Message</label>
                        <input onChange={handleChangeforShipment('message')} type="text" className="form-control" value={message}/>
                    </div> */}
            <center>
              <button
                disabled={btnloadingShip}
                className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn"
              >
                {btnloadingShip ? "Loading..." : "Submit"}
              </button>
            </center>
          </form>
          <br />
          <center>
            <button
              style={{ margin: "3px" }}
              onClick={() => handleChangeforShipmentModel(2)}
              className="text-center btn btn-outline-primary"
            >
              EASY SHIP METHOD
            </button>
            <button
              style={{ margin: "3px" }}
              onClick={() => handleChangeforShipmentModel(3)}
              className="text-center btn btn-outline-primary"
            >
              MANUAL METHOD
            </button>
          </center>
          {showWWEXCourierDetails()}
          {courierErrormsg()}
        </Modal.Body>
      </Modal>
    );
  };

  const clickShipmentDetails = async () => {
    if (window.confirm("Are you sure you want to continue?")) {
      setBtnloadingLabel(true);
      let shipmentData = await getShipment({ orderId: match.params.orderId });
      var tempID = shipmentData._id;
      var tempAddress2 = "";
      if (order.shipping.address2) {
        tempAddress2 = order.shipping.address2;
      }

      let createShipment = await fetch(`${API}/shipping/label`, {
        method: "POST",
        headers: fetchConfig,
        body: JSON.stringify({
          selected_courier_id: String(shipmentData.courierid),
          destination_country_alpha2: "USA",
          destination_city: String(order.shipping.city), //CARROLLTON
          destination_postal_code: String(order.shipping.pin_code),
          destination_state: String(order.shipping.state),
          destination_name: String(
            order.shipping.prefix +
              ". " +
              order.shipping.first_name +
              " " +
              order.shipping.last_name
          ),
          destination_address_line_1: String(order.shipping.address1),
          destination_address_line_2: String(tempAddress2),
          destination_phone_number: String(order.shipping.phone),
          preferred_date: preferred_date,
          preferred_max_time: preferred_max_time,
          preferred_min_time: preferred_min_time,
          quantity: Number(shipmentData.no_of_packages),
        }),
      });
      let results = await createShipment.json();

      if (results.error) {
        setBtnloadingLabel(false);
        setShipError(results.error);
        return;
      }

      let shipImage =
        JSON.parse(results).bookSpeedFreightShipmentResponse
          .bookSpeedFreightShipmentReturn[0].freightShipmentBOLLabels[0]
          .freightShipmentBOLLabel[0].base64BOLLabel[0];
      let tempShipment =
        JSON.parse(results).bookSpeedFreightShipmentResponse
          .bookSpeedFreightShipmentReturn[0].freightShipmentBOLNumber[0];

      updateShipmentDetails1({
        shipmentid: tempShipment,
        shipImage,
        ID: tempID,
        preferred_date,
        preferred_max_time,
        preferred_min_time,
      }).then((data) => {
        if (data.error) {
          setShipError("Something went wrong, please try again");
          setBtnloadingLabel(false);
        }
        setBtnloadingLabel(false);
        loadOrder(match.params.orderId);
        //window.location.reload();
      });
    } else {
      setShipError("Something went wrong, please try again");
      setBtnloadingLabel(false);
    }
  };

  const clickEasyshipShipmentDetails = async () => {
    if (window.confirm("Are you sure you want to continue?")) {
      setBtnloadingLabel(true);
      let shipmentData = await getShipment({ orderId: match.params.orderId });
      var tempID = shipmentData._id;
      var tempAddress2 = "";
      if (order.shipping.address2) {
        tempAddress2 = order.shipping.address2;
      }

      let createShipment = await fetch(
        "https://api.easyship.com/shipment/v1/shipments/create_and_buy_label",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${SHIPMENT_KEY}`,
          },

          body: JSON.stringify({
            taxes_duties_paid_by: "Sender",
            is_insured: false,
            selected_courier_id: String(shipmentData.courierid),
            allow_courier_fallback: false,
            destination_country_alpha2: "US",
            destination_city: String(order.shipping.city),
            destination_postal_code: String(order.shipping.pin_code),
            destination_state: String(order.shipping.state),
            destination_name: String(
              order.shipping.prefix +
                ". " +
                order.shipping.first_name +
                " " +
                order.shipping.last_name
            ),
            destination_address_line_1: String(order.shipping.adddress1),
            destination_address_line_2: String(tempAddress2),
            destination_phone_number: String(order.shipping.phone),
            items: shipmentData.itemList,
            /* items:[
                        {
                            description:'text',
                            actual_weight: Number(shipmentData.weight),
                            height: Number(shipmentData.height),
                            width: Number(shipmentData.width),
                            length: Number(shipmentData.length),
                            category: 'home_appliances',
                            declared_currency: 'USD',
                            declared_customs_value: 35
                        }
                    ], */
            buy_label_synchronous: true,
            format: "PDF",
            label: "4x6",
            commercial_invoice: "4x6",
            packing_slip: "4x6",
          }),
        }
      );
      let results = await createShipment.json();

      if (!results.shipment) {
        setShipError(results.message);
        setBtnloadingLabel(false);
        return 0;
      } else {
        let results1 = results.shipment;
        var tempShipmentId = results1.easyship_shipment_id;
        let tempLabel = results1.label_response;

        if (results1.label_state === "not_created") {
          setShipError(tempLabel.errors[0]);
          setBtnloadingLabel(false);
          return 0;
        }

        if (
          tempShipmentId !== "" &&
          tempShipmentId !== null &&
          tempShipmentId !== undefined
        ) {
          let getShipmentRes = await fetch(
            `https://api.easyship.com/shipment/v1/shipments/${tempShipmentId}?format=PNG&label=4X6`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${SHIPMENT_KEY}`,
              },
            }
          );

          let shipResults = await getShipmentRes.json();

          let tempValue = shipResults.shipment;
          let tempValue1 = tempValue.shipping_documents;
          let tempUrl = tempValue.tracking_page_url;
          let tempValue3 = tempValue1.label;
          let tempImg = tempValue3.base64_encoded_strings[0];

          let updateShipmentId = await updateShipmentDetails({
            tempUrl,
            tempImg,
            shipmentid: tempShipmentId,
            ID: tempID,
          });

          if (updateShipmentId.shipmentid !== "") {
            setBtnloadingLabel(false);
            loadOrder(match.params.orderId);
          }
        } else {
          setShipError("Something went wrong, please try again");
          setBtnloadingLabel(false);
        }
      }
    }
  };

  const shippingErrorMsg = () => {
    if (shipError) {
      return (
        <>
          <br />
          <h4 className="text-danger">{shipError}</h4>
        </>
      );
    }
  };

  const shippingPickupErrorMsg = () => {
    if (pickupError) {
      return <h4 className="text-danger">{pickupError}</h4>;
    }
  };

  const pickupSuccessMsg = () => {
    if (pickupSuccess) {
      return <h4 className="text-success">{pickupSuccess}</h4>;
    }
  };

  const handleChangeforPickup = (name) => (event) => {
    setPickupError("");
    setPickupVal({ ...pickupVal, [name]: event.target.value });
  };

  const clickWWEXPickupRequest = (event) => {
    event.preventDefault();
    setPickupModal(false);
    clickShipmentDetails();
  };

  const clickEasyShipPickupRequest = async (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to continue ?")) {
      setBtnloadingLabel(true);
      let shipmentDatas = await getShipment({ orderId: match.params.orderId });

      let createPickup = await fetch(
        "https://api.easyship.com/pickup/v1/pickups",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${SHIPMENT_KEY}`,
          },
          body: JSON.stringify({
            courier_id: shipmentDatas.courierid,
            preferred_date: preferred_date,
            preferred_max_time: preferred_max_time,
            preferred_min_time: preferred_min_time,
            easyship_shipment_ids: [`${shipmentDatas.shipmentid}`],
          }),
        }
      );
      let pickupResults = await createPickup.json();

      if (pickupResults.message === "Failed to create Pickup") {
        setPickupError(pickupResults.errors[0]);
        setBtnloadingLabel(false);
      } else {
        setEasyshipPickupModal(false);
        let updatePickupDate = await updateShipmentPickup({
          ID: shipmentDatas._id,
          preferred_date,
          preferred_max_time,
          preferred_min_time,
        });
        if (updatePickupDate) {
          setPickupSuccess("You have successfully requested the pickup.");
          setBtnloadingLabel(false);
          loadOrder(match.params.orderId);
        }
      }
    }
  };

  const showEasyShipPickupModal = () => {
    return (
      <Modal
        show={easyShipPickupModal}
        onHide={() => setEasyshipPickupModal(false)}
        dialogClassName="modal-90w"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Request Pickup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={clickEasyShipPickupRequest}>
            <div className="form-group">
              <label className="text-muted">
                Preferred Date<span style={{ color: "red" }}> *</span>
              </label>
              <input
                onChange={handleChangeforPickup("preferred_date")}
                type="date"
                className="form-control"
                value={preferred_date}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">
                Preferred Maximum time<span style={{ color: "red" }}> *</span>
              </label>
              <input
                onChange={handleChangeforPickup("preferred_max_time")}
                type="datetime-local"
                className="form-control"
                value={preferred_max_time}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">
                Preferred Minimum time<span style={{ color: "red" }}> *</span>
              </label>
              <input
                onChange={handleChangeforPickup("preferred_min_time")}
                type="datetime-local"
                className="form-control"
                value={preferred_min_time}
                required
              />
            </div>
            <center>
              <button
                className="btn btn-outline-primary"
                disabled={btnloadingPick}
              >
                {btnloadingPick ? "Loading..." : "Submit"}
              </button>
            </center>
          </form>
          <br />
          {shippingPickupErrorMsg()}
          {pickupSuccessMsg()}
        </Modal.Body>
      </Modal>
    );
  };

  const showPickupModal = () => {
    return (
      <Modal
        show={pickupModal}
        onHide={() => setPickupModal(false)}
        dialogClassName="modal-90w"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Request Pickup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={clickWWEXPickupRequest}>
            <div className="form-group">
              <label className="text-muted">
                Preferred Date<span style={{ color: "red" }}> *</span>
              </label>
              <input
                onChange={handleChangeforPickup("preferred_date")}
                type="date"
                className="form-control"
                value={preferred_date}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">
                Preferred Maximum time<span style={{ color: "red" }}> *</span>
              </label>
              <input
                onChange={handleChangeforPickup("preferred_max_time")}
                type="time"
                className="form-control"
                value={preferred_max_time}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">
                Preferred Minimum time<span style={{ color: "red" }}> *</span>
              </label>
              <input
                onChange={handleChangeforPickup("preferred_min_time")}
                type="time"
                className="form-control"
                value={preferred_min_time}
                required
              />
            </div>
            <center>
              <button
                className="btn btn-outline-primary"
                disabled={btnloadingPick}
              >
                {btnloadingPick ? "Loading..." : "Submit"}
              </button>
            </center>
          </form>
          <br />
          {shippingPickupErrorMsg()}
          {pickupSuccessMsg()}
        </Modal.Body>
      </Modal>
    );
  };

  const shipmentTracking = async () => {
    setTrackLoading(true);
    let trackDetails = await fetch(
      `https://api.easyship.com/track/v1/status?easyship_shipment_id=${shipmentID}&page=1&per_page=25`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${SHIPMENT_KEY}`,
        },
      }
    );

    let trackRes = await trackDetails.json();

    var result = trackRes.shipments;
    setTrackDetails(result);
    setCheckTrack(true);
    setTrackLoading(false);
  };

  const trackingHistory = trackDetails.map((t, i) => (
    <tr key={i}>
      <td>{t.tracking_number}</td>
      <td>{t.status}</td>
    </tr>
  ));

  const showTrackingDetails = () =>
    checkTrack && (
      <>
        <br />
        <h5 style={{ textDecoration: "underline" }}>
          <b>Tracking Details : </b>
        </h5>
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>
                Tracking
                <br />
                Number
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{trackingHistory}</tbody>
        </Table>{" "}
      </>
    );

  // Shipping Order End

  // Delayed Start

  const handleChangeforDelayed = (name) => (event) => {
    setDelayedVal({ ...delayedVal, [name]: event.target.value });
  };

  const clickSubmitDelayed = (event) => {
    event.preventDefault();
    setStatusLoading(true);
    setDelayedVal({ ...delayedVal });
    updateOrderStatus({
      orderId: match.params.orderId,
      status: "Delayed",
      reason,
      resolution_time,
    }).then((data) => {
      if (data.error) {
        setStatusLoading(false);
      } else {
        setShowDelayed(() => setShowDelayed(false));
        setDelayedVal({
          ...delayedVal,
          reason: "",
          resolution_time: "",
        });
        loadOrder(match.params.orderId);
      }
    });
  };

  const showDelayModal = () => {
    return (
      <Modal
        show={showdelayed}
        onHide={() => setShowDelayed(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={clickSubmitDelayed}>
            <div className="form-group">
              <label className="text-muted">
                Reason<span style={{ color: "red" }}> *</span>
              </label>
              <input
                onChange={handleChangeforDelayed("reason")}
                type="text"
                className="form-control"
                value={reason}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">
                Resolution Time<span style={{ color: "red" }}> *</span>
              </label>
              <input
                onChange={handleChangeforDelayed("resolution_time")}
                type="number"
                className="form-control"
                value={resolution_time}
                required
              />
            </div>
            <center>
              <br />
              <button className="btn btn-outline-primary">Add</button>
            </center>
          </form>
        </Modal.Body>
      </Modal>
    );
  };

  // Delayed End

  const checktrackUrl = (carriers, id) => {
    if (carriers === "DHL") {
      return `https://www.dhl.com/us-en/home/tracking.html?tracking-id=${id}&submit=1`;
    } else if (carriers === "UPS") {
      return `https://www.ups.com/track?loc=null&tracknum=${id}&requester=WT/trackdetails`;
    } else if (carriers === "FedEx") {
      return `https://www.fedex.com/fedextrack/?tracknumbers=${id}&cntry_code=us`;
    } else if (carriers === "USPS") {
      return `https://tools.usps.com/go/TrackConfirmAction_input?strOrigTrackNum=${id}`;
    }
    return "";
  };

  const showOrderDetails = () => {
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4 bord-line">
            <div className="card-body">
              <h5>
                <b>Order Id : </b>
                {order.orderid}
              </h5>
              <hr />
              {/*  <p className="card-text"><b>Order Id : </b>{order.orderid}</p> */}
              <p className="card-text">
                <b>Product Name : </b>
                {order.title}
              </p>
              <p className="card-text">
                <b>Product Description : </b>
                <span
                  dangerouslySetInnerHTML={{ __html: order.order_description }}
                ></span>
              </p>
              <p className="card-text">
                <b>Quantity : </b>
                {order.quantity}
              </p>
              <p className="card-text">
                <b>Purchase Price ($) : </b>
                {(order.price + order.shipping_charge +order?.salesTax).toFixed(2)}
              </p>
              <p className="card-text">
                <b>Product Price ($) : </b>
                {order.price.toFixed(2)}
              </p>
              <p className="card-text">
                <b>Shipping Charge ($) : </b>
                {order.shipping_charge.toFixed(2)}
              </p>
              <p className="card-text">
                <b>Sales Tax ($) : </b>
                {parseFloat((order?.salesTax).toFixed(2))}
              </p>
              <p className="card-text">
                <b>Installation : </b>
                {order.shipping.installation ? "Yes" : "No"}
              </p>
              <p className="card-text">
                <b>Miles : </b>
                {order.shipping.miles}
              </p>
              <p className="card-text">
                <b>Odered Date : </b>
                <Moment format="DD/MM/YYYY">{order.createdAt}</Moment>
              </p>
              {Number(order.discount) >= 1 && (
                <>
                  <hr />
                  <h5 style={{ textDecoration: "underline" }}>
                    Discount Details
                  </h5>
                  <p className="card-text">
                    <b>Discount price : </b>
                    {order.discount}
                  </p>
                  <p className="card-text">
                    <b>Coupon Name : </b>
                    {coupon_name}
                  </p>
                </>
              )}
              <hr />
              <h5>
                <b style={{ textDecoration: "underline" }}>Delivery Address</b>{" "}
                :{" "}
                <button
                  className="btn btn-success"
                  onClick={() => handleAddressModal()}
                >
                  Edit
                </button>
              </h5>
              <p className="card-text">
                <b>Name : </b>
                {order.shipping.prefix +
                  ". " +
                  order.shipping.first_name +
                  " " +
                  order.shipping.last_name}
              </p>
              <p className="card-text">
                <b>Phone : </b>
                {order.shipping.phone}
              </p>
              <p className="card-text">
                <b>Address 1 : </b>
                {order.shipping.address1}
              </p>
              {order.shipping.address2 && (
                <p className="card-text">
                  <b>Address 2 : </b>
                  {order.shipping.address2}
                </p>
              )}
              <p className="card-text">
                <b>City : </b>
                {order.shipping.city}
              </p>
              {order.shipping.state && (
                <p className="card-text">
                  <b>State : </b>
                  {order.shipping.state}
                </p>
              )}
              <p className="card-text">
                <b>Pin Code : </b>
                {order.shipping.pin_code}
              </p>
              <p className="card-text">
                <b>Country : </b>
                {order.shipping.country}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4 bord-line">
            <div className="card-body">
              <h5 style={{ textDecoration: "underline" }}>
                <b>Change Status : </b>
              </h5>
              {showStatus(order._id, order.status, order.paymentId)}
              <br />
              <p className="card-text">
                <b>Status : </b>
                {order.status}
              </p>
              {(order.status === "Order Cancelled" ||
                order.status === "Return Rejected") && (
                <p className="card-text">
                  <b>Cancelled Reason : </b>
                  {order.cancelled_reason}
                </p>
              )}

              {returnData.length >= 1 && (
                <>
                  <h5 style={{ textDecoration: "underline" }}>
                    <b>Return Type Details : </b>
                  </h5>
                  {returnData.map((r) => (
                    <div>
                      <p className="card-text">
                        <b>Return Type : </b>
                        {r.return_type === 1
                          ? "Replacement"
                          : r.return_type === 2 && "Refund"}
                      </p>
                      <p className="card-text">
                        <b>Return Reason : </b>
                        {r.return_reason}
                      </p>
                      <p className="card-text">
                        <b>Return Message : </b>
                        {r.return_message}
                      </p>
                      {r.photo !== undefined && <ShowReturnImg item={r._id} />}
                      <hr />
                    </div>
                  ))}
                </>
              )}
              {order.status === "Shipped" && order.shipmentType === 3 && (
                <>
                  <h5 style={{ textDecoration: "underline" }}>
                    <b>Shipment Details : </b>
                  </h5>
                  <p className="card-text">Manual Method</p>
                  <div class="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Tracking No</th>
                          <th>Carriers</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shipmentDetails?.itemList &&
                          shipmentDetails?.itemList.map((s, i) => (
                            <tr key={i}>
                              <td>
                                <a
                                  target="_blank"
                                  href={checktrackUrl(
                                    s?.carriers,
                                    s?.trackingNo
                                  )}
                                  rel="noreferrer"
                                >
                                  {s?.trackingNo}
                                </a>
                              </td>
                              <td>{s?.carriers}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              {order.status === "Shipped" &&
                !checkShipment &&
                order.shipmentType &&
                order.shipmentType === 1 && (
                  <button
                    disabled={btnloadingLabel}
                    className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn"
                    onClick={() => clickEasyshipShipmentDetails()}
                  >
                    {btnloadingLabel ? "Loading..." : "Create Label"}
                  </button>
                )}
              {order.status === "Shipped" &&
                !checkShipment &&
                order.shipmentType &&
                order.shipmentType === 2 && (
                  <button
                    disabled={btnloadingLabel}
                    className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn"
                    onClick={() => setPickupModal(true)}
                  >
                    {btnloadingLabel
                      ? "Loading..."
                      : "Request Pickup from WWEX"}
                  </button>
                )}
              <div style={{ width: "100%", textAlign: "center" }}>
                <hr />
                {order.status === "Shipped" &&
                  checkShipment &&
                  order.shipmentType &&
                  order.shipmentType === 1 &&
                  pickupDate === "" && (
                    <div style={{ display: "inline-block" }}>
                      <button
                        className="btn btn-success"
                        onClick={() => setEasyshipPickupModal(true)}
                      >
                        Pickup
                      </button>
                      <br />
                    </div>
                  )}
                {order.status === "Shipped" && checkShipment && (
                  <div style={{ display: "inline-block" }}>
                    &nbsp;
                    <Base64Downloader
                      base64={"data:image/png;base64," + label}
                      downloadName="Label"
                      className="btn btn-primary"
                    >
                      Download Label
                    </Base64Downloader>
                    <br />
                  </div>
                )}
                {order.status === "Shipped" &&
                  checkShipment &&
                  order.shipmentType &&
                  order.shipmentType === 1 && (
                    <div style={{ display: "inline-block" }}>
                      &nbsp;
                      <button
                        disabled={checkTrack}
                        className="btn btn-info"
                        onClick={() => shipmentTracking()}
                      >
                        Track info
                      </button>
                    </div>
                  )}
                <hr />
              </div>

              {order.status === "Shipped" &&
                checkShipment &&
                pickupDate !== "" && (
                  <>
                    <br />
                    <span>
                      <b>Pickup:</b>&nbsp;
                      <Moment format="DD/MM/YYYY">{pickupDate}</Moment>
                    </span>
                    <br />
                  </>
                )}

              {shippingErrorMsg()}
              {showTrackingDetails()}
              {/* <hr/> */}
              {(order.status === "Order Cancelled" ||
                order.status === "Return Completed" ||
                refund_id) && (
                <>
                  <h5 style={{ textDecoration: "underline" }}>
                    <b>Refund Details : </b>
                  </h5>
                  <p className="card-text">
                    <b>Refund ID : </b>
                    {refund_id}
                  </p>
                  <p className="card-text">
                    <b>Refund Amount ($) : </b>
                    {Number(refund_amount) / 100}
                  </p>
                  <p className="card-text">
                    <b>Refund Date : </b>
                    {new Date(refund_date * 1000).toLocaleDateString("en-GB")}
                  </p>
                  <p className="card-text">
                    <b>Refund Status : </b>
                    {refund_status}
                  </p>
                  <hr />
                </>
              )}

              <h5 style={{ textDecoration: "underline" }}>
                <b>Payment Details : </b>
              </h5>
              <p className="card-text">
                <b>Status : </b>
                {order.paymentId ? "Paid" : "UnPaid"}
              </p>
              <p className="card-text">
                <b>PaymentID : </b>
                {order.paymentId}
              </p>
              <p className="card-text">
                <b>Amount ($) : </b>
                {(order.price + order.shipping_charge + order?.salesTax).toFixed(2)}
              </p>
              <p className="card-text">
                <b>Date : </b>
                {order.payment_date}
              </p>
            </div>
          </div>
        </div>

        {/* <div className="col-md-6">
                    <div className="card mb-4 bord-line">
                        <div className="card-body">
                           
                        </div>
                    </div>
                </div> */}
      </div>
    );
  };

  const showUserNotes = () => (
    <div className="card mb-4 bord-line">
      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <h4 style={{ color: "#106eea" }}>User Notes : </h4>
            <br />
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {NoteData.map((p, i) => (
                    <tr key={i}>
                      <td>
                        <Moment format="DD/MM/YYYY HH:mm">{p.createdAt}</Moment>
                      </td>
                      <td>{p.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {NoteData.length === 0 && (
                <>
                  <br />
                  <h4 style={{ textAlign: "center", color: "red" }}>
                    Sorry! No notes found
                  </h4>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const showOrderLogs = () => (
    <div className="card mb-4 bord-line">
      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <h4 style={{ color: "#106eea" }}>Order History : </h4>
            <br />
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Reason</th>
                    <th>Added by</th>
                  </tr>
                </thead>
                <tbody>
                  {orderLogs.map((p, i) => (
                    <tr key={i}>
                      <td>
                        <Moment format="DD/MM/YYYY HH:mm">{p.createdAt}</Moment>
                      </td>
                      <td>{p.reason}</td>
                      <td>{p.added_by.clast}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orderLogs.length === 0 && (
                <>
                  <br />
                  <h4 style={{ textAlign: "center", color: "red" }}>
                    Sorry! No Order Logs found
                  </h4>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      {console.log("Manual", manualList)}
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h2 style={{ textAlign: "center", color: "#106eea" }}>
                Order Details
              </h2>
              {!btnloading && order._id && showOrderDetails()}

              {!btnloading &&
                order._id &&
                NoteData.length >= 1 &&
                showUserNotes()}

              {!btnloading && order._id && showOrderLogs()}

              {showCancelModal()}

              {showManualShipment()}

              {showEasyshipShipmentModal()}

              {showWWEXShipmentModal()}

              {showUpdateAddress()}

              {showPickupModal()}

              {showRejectReasonModal()}

              {showEasyShipPickupModal()}

              {showDelayModal()}

              <Backdrop className={classes.backdrop} open={btnloading}>
                <CircularProgress color="inherit" />
              </Backdrop>

              <Backdrop className={classes.backdrop} open={openCancel}>
                <CircularProgress color="inherit" />
              </Backdrop>

              <Backdrop className={classes.backdrop} open={statusLoading}>
                <CircularProgress color="inherit" />
              </Backdrop>

              <Backdrop className={classes.backdrop} open={trackLoading}>
                <CircularProgress color="inherit" />
              </Backdrop>

              <Backdrop className={classes.backdrop} open={btnloadingLabel}>
                <CircularProgress color="inherit" />
              </Backdrop>

              <div className={Errorclasses.root}>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="error">
                    {error}
                  </Alert>
                </Snackbar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderDetails;
