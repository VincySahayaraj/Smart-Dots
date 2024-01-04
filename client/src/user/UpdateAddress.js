import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { getAddress, updateAddress } from "./apiUser";
import UserLayout from "./Layout/UserLayout";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const UpdateAddress = ({ match }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    pin_code: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    error: "",
    prefix: "",
    success: false,
  });

  var {
    first_name,
    prefix,
    last_name,
    phone,
    pin_code,
    address1,
    address2,
    city,
    state,
    country,
    success,
    error,
  } = values;

  const [btnloading, setBtnloading] = useState(false);
  const [loading, setloading] = useState(true);
  const [hide, setHide] = useState(false);

  const loadAddress = (shippingId) => {
    getAddress(shippingId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        setloading(false);
      } else {
        // populate the state
        setValues({
          ...values,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          pin_code: data.pin_code,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          country: data.country,
          prefix: data.prefix,
        });
        setloading(false);
      }
    });
  };

  useEffect(() => {
    loadAddress(match.params.shippingId);
  }, []);

  const handleChange = (name) => (event) => {
    if (event.target.value === "Custom" && name == "prefix") {
      setHide(true);
    } else if (event.target.value !== "Custom" && name == "prefix") {
      setHide(false);
    }

    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setBtnloading(true);
    setValues({ ...values, error: false });
    if (values.prfx && hide) {
      prefix = values.prfx;
    }
    updateAddress(match.params.shippingId, {
      ID: match.params.shippingId,
      first_name,
      prefix,
      last_name,
      phone,
      pin_code,
      address1,
      address2,
      city,
      state,
      country,
    }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
        setBtnloading(false);
      } else {
        setValues({
          ...values,
          first_name: "",
          last_name: "",
          phone: "",
          pin_code: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          country: "",
          error: "",
          success: true,
        });
        setBtnloading(false);
      }
    });
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

  const updateShippingForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="text-muted">
              Title<span style={{ color: "red" }}> *</span>
            </label>
            <select
              required
              onChange={handleChange("prefix")}
              className="form-control"
            >
              <option value="">Select Title</option>{" "}
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
            <input
              type="text"
              style={{ display: hide ? "block" : "none" }}
              onChange={handleChange("prfx")}
              required={hide}
              className="form-control border-rad-0-px"
              id="usr"
              placeholder="Enter the Custom Prefix"
            />
          </div>

          <div className="form-group">
            <label className="text-muted">
              First Name<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("first_name")}
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
              onChange={handleChange("last_name")}
              type="text"
              className="form-control"
              value={last_name}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">
              Phone Number<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("phone")}
              type="number"
              className="form-control border-rad-0-px"
              value={phone}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">
              Address Line 1<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("address1")}
              type="text"
              className="form-control border-rad-0-px"
              value={address1}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Address Line 2 </label>
            <input
              onChange={handleChange("address2")}
              type="text"
              className="form-control border-rad-0-px"
              value={address2}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="text-muted">
              Town/City<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("city")}
              type="text"
              className="form-control border-rad-0-px"
              value={city}
              required
            />
          </div>
          {/*  <div className="form-group">
                        <label className="text-muted">State<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('state')} type="text" className="form-control border-rad-0-px" value={state} required />
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
              <option value="">Select State</option>{" "}
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
              onChange={handleChange("pin_code")}
              type="text"
              className="form-control border-rad-0-px"
              value={pin_code}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">
              Country<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("country")}
              type="text"
              className="form-control border-rad-0-px"
              readOnly
              value={country}
            />
          </div>
          <button disabled={btnloading} className="btn btn-success">
            {btnloading ? "Loading..." : "Update"}
          </button>
        </div>
      </div>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => {
    if (success) {
      if (match.params.testValue === "recentaddress") {
        return <Redirect to="/user/recent/address" />;
      } else {
        return <Redirect to="/user/all/address" />;
      }
    }
  };

  return (
    <UserLayout>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <div className="main-panel">
            <div className="content-wrapper white-bg-ad">
              <div className="row">
                <div className="col-md-12 grid-margin">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="font-weight-bold mb-0">Update Address</h4>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>

              {showSuccess()}
              {showError()}

              {updateShippingForm()}
            </div>
          </div>
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </UserLayout>
  );
};

export default UpdateAddress;
