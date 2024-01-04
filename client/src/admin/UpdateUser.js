import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";
import { updateUser, getUser } from "./apiAdmin";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const UpdateUser = ({ match }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  const [values, setValues] = useState({
    prefix: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    btnloading: false,
    error: "",
    success: false,
  });

  const {
    prefix,
    firstName,
    lastName,
    email,
    password,
    phone,
    role,
    btnloading,
    success,
    error,
  } = values;

  const loadUser = (userId) => {
    getUser(userId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
        setLoading(false);
      } else {
        setValues({
          ...values,
          prefix: data.prefix,
          firstName: data.cfirst,
          lastName: data.clast,
          email: data.cemail,
          phone: data.cphone,
          role: data.role,
        });
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    loadUser(match.params.userId);
  }, []);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: "",
      success: false,
      [name]: event.target.value,
      btnloading: false,
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", btnloading: true });
    updateUser({
      userid: match.params.userId,
      prefix,
      cfirst: firstName,
      clast: lastName,
      cemail: email,
      password,
      cphone: phone,
      role,
    }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          btnloading: false,
        });
      } else {
        setValues({
          ...values,
          prefix: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          role: "",
          error: "",
          btnloading: false,
          success: true,
        });
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
  ]);

  const updateUserForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">
          Title<span style={{ color: "red" }}> *</span>
        </label>
        <select
          required
          onChange={handleChange("prefix")}
          className="form-control"
        >
          <option disabled>Select Title</option>{" "}
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
          onChange={handleChange("firstName")}
          type="text"
          className="form-control"
          value={firstName}
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">
          Last Name<span style={{ color: "red" }}> *</span>
        </label>
        <input
          onChange={handleChange("lastName")}
          type="text"
          className="form-control"
          value={lastName}
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">
          Email<span style={{ color: "red" }}> *</span>
        </label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
          readOnly
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">
          Password <span style={{ color: "green" }}>(optional) </span>
        </label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">
          Phone No<span style={{ color: "red" }}> *</span>
        </label>
        <input
          onChange={handleChange("phone")}
          type="number"
          className="form-control"
          value={phone}
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">
          Role<span style={{ color: "red" }}> *</span>
        </label>
        <select
          required
          onChange={handleChange("role")}
          className="form-control"
        >
          <option disabled>Select Role</option>
          {role === 0 ? (
            <option selected value="0">
              User
            </option>
          ) : (
            <option selected value="1">
              Admin
            </option>
          )}
          {role === 0 ? (
            <option value="1">Admin</option>
          ) : (
            <option value="0">User</option>
          )}
        </select>
      </div>

      <center>
        <br />
        <button className="btn btn-outline-primary" disabled={btnloading}>
          {" "}
          {btnloading ? "Loading..." : "Update"}{" "}
        </button>
      </center>

      <div>
        <Link className="nav-link" to="/admin/users">
          Go Back to List{" "}
        </Link>
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

  const showSuccess = () => success && <Redirect to="/admin/users" />;

  return (
    <AdminLayout>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4
                className="card-title"
                style={{ textAlign: "center", color: "#106eea" }}
              >
                Update User
              </h4>

              {showSuccess()}
              {showError()}
              {!loading && updateUserForm()}

              <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
              </Backdrop>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateUser;
