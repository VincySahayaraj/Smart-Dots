import React, { useState, useEffect, useContext } from "react";
import { updateUser } from "./apiUser";
import UserLayout from "./Layout/UserLayout";
import { AuthContext } from "../globalStates";

const EditProfile = () => {
  const [authState, setAuthstate] = useContext(AuthContext);

  const [values, setValues] = useState({
    prfx: "",
    firstname: "",
    lastname: "",
    phone_num: "",
    _email: "",
    error: "",
    success: false,
  });

  var { prfx, firstname, lastname, phone_num, _email, error, success } =
    values;

  const [spinloading, setspinloading] = useState(true);

  const [btnloading, setbtnloading] = useState(false);

  const [hide, setHide] = useState(false);

  const init = () => {
    setValues({
      ...values,
      prfx: authState.prefix,
      firstname: authState.firstName,
      lastname: authState.lastName,
      phone_num: authState.phone,
      _email: authState.email,
    });
    setspinloading(false);
  };

  useEffect(() => {
    init();
  }, [authState]);

  const handleChange = (name) => (event) => {
    if (event.target.value === "Custom" && name == "prfx" &&event.target.id=="selectBx") {
      setHide(true);
    } else if (event.target.value !== "Custom" && name == "prfx"&&event.target.id=="selectBx") {
      setHide(false);
    }

    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    if (hide) {
      if (values.prfx == "") {
        alert("custom prefix is mandatory");
        return;
      }
    }

    setbtnloading(true);
    setValues({ ...values, error: false });
    if (values.cusPrefix && hide) {
      prfx = values.cusPrefix;
    }
    updateUser({
      userid: authState._id,
      prefix: prfx,
      cfirst: firstname,
      clast: lastname,
      cemail: _email,
      cphone: phone_num,
    }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
        setbtnloading(false);
      } else {
        setValues({
          ...values,
          error: "",
          success: true,
        });
        setAuthstate({
          ...authState,
          _id: data._id,
          prefix: data.prefix,
          firstName: data.cfirst,
          lastName: data.clast,
          email: data.cemail,
          role: data.role,
          phone: data.cphone,
          customerid: data.customerid,
        });
        setbtnloading(false);
      }
    });
  };

  const [titleList] = useState([
    { label: "Mr ", value: "Mr" },
    { label: "Mrs", value: "Mrs" },
    { label: "Ms", value: "Ms" },
    { label: "Miss", value: "Miss" },
    { label: "Dr", value: "Dr" },
    { label: "Sir", value: "Sir" },
    { label: "Custom", value: "Custom" },
  ]);

  const updateUserForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">
          Title<span style={{ color: "red" }}> *</span>
        </label>
        <select
          required
          onChange={handleChange("prfx")}
          id="selectBx"
          className="form-control"
        >
          <option value="">Choose Here</option>
          {titleList.map((room) =>
            prfx === room.value ? (
              ""
            ) : (
              <option key={room.value} value={room.value}>
                {room.label}
              </option>
            )
          )}
          {prfx ? (
            <option selected key={prfx} value={prfx}>
              {prfx}
            </option>
          ) : (
            ""
          )}
        </select>
        <input
          type="text"
          style={{ display: hide ? "block" : "none" }}
          onChange={handleChange("cusPrefix")}
          className="form-control border-rad-0-px"
          required={hide}
          id="usr"
          placeholder="Enter the Custom Prefix"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">
          First Name<span style={{ color: "red" }}> *</span>
        </label>
        <input
          onChange={handleChange("firstname")}
          type="text"
          className="form-control"
          value={firstname}
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">
          Last Name<span style={{ color: "red" }}> *</span>
        </label>
        <input
          onChange={handleChange("lastname")}
          type="text"
          className="form-control"
          value={lastname}
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">
          Email<span style={{ color: "red" }}> *</span>
        </label>
        <input
          onChange={handleChange("_email")}
          type="email"
          className="form-control"
          value={_email}
          readOnly
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">
          Phone No<span style={{ color: "red" }}> *</span>
        </label>
        <input
          onChange={handleChange("phone_num")}
          type="number"
          className="form-control"
          value={phone_num}
          required
        />
      </div>

      <center>
        <br />
        <button
          disabled={btnloading}
          className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn"
        >
          {btnloading ? "Loading..." : "Update"}
        </button>
      </center>

      <div>
        <a className="nav-link" href="/user/dashboard">
          Go Back to Dashboard{" "}
        </a>
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

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Profile updated Successfully
    </div>
  );

  return (
    <UserLayout>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 style={{ color: "#19a6dd", textAlign: "center" }}>
                Edit Profile
              </h2>
            </div>
          </div>

          <div className="col-md-12">
            <br />
            {spinloading ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : (
              ""
            )}
            {showSuccess()}
            {showError()}
            {!spinloading && updateUserForm()}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default EditProfile;
