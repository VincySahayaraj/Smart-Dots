import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";
import { updateService, getServiceById } from "./apiAdmin";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from 'react'
import { AuthContext } from '../globalStates';
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const UpdateService = ({ match }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [values, setValues] = useState({
    serviceName: '',
    updated_by: userId,
    btnloading: false,
    error: '',
    success: false
});

const [authState, setauthState] = useContext(AuthContext);
const {
    serviceName,
    servicePrice,
    updated_by,
    btnloading,
    error,
    success } = values

  const loadService = (serviceId) => {
    getServiceById(serviceId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
        setLoading(false);
      } else {
        setValues({
          ...values,
          serviceName: data.serviceName,
         
        });
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setUserId(authState._id);
    setValues({ ...values, updated_by: authState._id, error: false, btnloading: false });
    loadService(match.params.serviceId);
  }, [userId]);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      updated_by: authState._id,
      error: "",
      success: false,
      [name]: event.target.value,
      btnloading: false,
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values,updated_by: authState._id, error: "", btnloading: true });
    updateService(match.params.serviceId, { id: match.params.serviceId, values }).then((data) => {
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
         
          serviceName: "",
          updated_by:authState._id,
          error: "",
          btnloading: false,
          success: true,
        });
      }
    });
  };



  const updateServiceForm = () => (
    <form onSubmit={clickSubmit}>
     
      <div className="form-group">
        <label className="text-muted">
         Service Name<span style={{ color: "red" }}> *</span>
        </label>
        <input
          onChange={handleChange("serviceName")}
          type="text"
          className="form-control"
          value={serviceName}
          required
        />
      </div>

      <center>
        <br />
        <button className="btn btn-outline-primary" disabled={btnloading}>
          {" "}
          {btnloading ? "Loading..." : "Update"}{" "}
        </button>
      </center>

      <div>
        <Link className="nav-link" to="/admin/services">
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

  const showSuccess = () => success && <Redirect to="/admin/services" />;

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
                Update Service
              </h4>

              {showSuccess()}
              {showError()}
              {!loading && updateServiceForm()}

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

export default UpdateService;
