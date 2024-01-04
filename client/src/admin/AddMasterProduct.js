import React, { useState, useContext, useEffect } from "react";
import AdminLayout from "./Layout/AdminLayout";
import { AuthContext } from "../globalStates";
import { Redirect, Link } from "react-router-dom";
import {
  getCategories,
  createProduct,
  uploadImageToServer,
  uploadMultipleImageToServer,
} from "./apiAdmin";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import CKEditor from "ckeditor4-react";
import { s3FileUpload } from "../utils/fileUpload";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  multiple_drop: {},
  gallery: {
    border: "1px solid black",
    display: "flex",
    padding: 5,
    overflow: "auto",
  },
  gimage: {
    width: 80,
    height: 60,
    zIndex: 0,
  },
  item: {
    padding: 5,
  },
  btn: {
    zIndex: 1,
    transform: "translate(50px,-30px)",
    background: "black",
    color: "white",
    borderRadius: 50,
  },
}));

const AddMasterProduct = () => {
  const classes = useStyles();

  const [authState] = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState([]);

  const [itemError, setItemError] = useState("");

  const [imgError, setImgError] = useState("");

  const [gallery, SetGallery] = useState([]);

  const [images, setImages] = useState([]);

  const [values, setValues] = useState({
    Device_Name: "",
    Device_Alias: "",
    Description: "",
    Device_Group: "",
    Device_Capability: "",
    Color: "",
    Style: "",
    Technology: "",
    Internal_Cost: "",
    Cost_Price: "",
    SmartDots_MSRP: "",
    Labor_Cost_Installation: "",
    Labor_Cost_Configuration: "",
    Config_Cost_Reseller: "",
    Labor_Price_Installation: "",
    Labor_Price_Configuration: "",
    Supplier: "",
    category: "",
    Manufacturer: "",
    Part_No: "",
    UPC_Code: "",
    shipping_charge: 0,
    Notes: "",
    video: "",
    inventory: "",
    weight: "",
    threshold: "",
    photo: "",
    btnloading: false,
    error: "",
    createdProduct: "",
    isSmartDots: null,
    redirectToProfile: false,
    formData: new FormData(),
  });

  const {
    Device_Name,
    Device_Alias,
    Description,
    Device_Group,
    Device_Capability,
    Color,
    Style,
    Technology,
    Internal_Cost,
    Cost_Price,
    SmartDots_MSRP,
    Labor_Cost_Installation,
    Labor_Cost_Configuration,
    Config_Cost_Reseller,
    Labor_Price_Installation,
    Labor_Price_Configuration,
    Supplier,
    Manufacturer,
    Part_No,
    UPC_Code,
    video,
    shipping_charge,
    Notes,
    inventory,
    weight,
    threshold,
    isSmartDots,
    btnloading,
    error,
    createdProduct,
    formData,
  } = values;

  const [categories, setCategories] = useState([]);

  const [onImageUpload, setOnImageUpload] = useState(false);

  const [mainImageURL, setMainImageURL] = useState(null);
  const [galleryImageURL, setGalleryImageURL] = useState([]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setItemError(data.error);
        setLoading(false);
      } else {
        setCategories(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (name) => async (event) => {
    setImgError("");
    //const value = name === 'photo' ? event.target.files[0] : event.target.value
    let value;
    if (name === "photo") {
      value = event.target.files[0];

      // upload the productImage image to server
      setOnImageUpload(true);
      let data = await uploadImageToServer(event.target.files[0]);
      console.log("this is the data", data);
      if (!data.error) {
        setMainImageURL(data.url);
      }

      setOnImageUpload(false);
    } else if (name === "Description") {
      value = event.editor.getData();
      formData.set(name, value);
      setValues({
        ...values,
        error: "",
        Description: value,
        btnloading: false,
      });
      return;
    } else {
      value = event.target.value;
    }

    if (name === "isSmartDots") {
      if (value.toLowerCase() === "true") {
        formData.set(name, true);
        setValues({ ...values, [name]: true, btnloading: false });
        return;
      }
      if (value.toLowerCase() === "false") {
        formData.set(name, false);
        setValues({ ...values, [name]: false, btnloading: false });
        return;
      }
    }
    formData.set(name, value);
    setValues({ ...values, [name]: value, btnloading: false });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setImgError("");
    if (images.length >= 1) {
      formData.append("images", JSON.stringify(images));
      formData.set("checkImg", true);
    } else {
      formData.append("images", JSON.stringify([]));
      formData.set("checkImg", true);
    }
    formData.set("added_by", authState._id);
    formData.set("type", 1);
    formData.append("mainImageURL", mainImageURL);
    formData.append("galleryImageURL", galleryImageURL);

    setValues({ ...values, error: "", btnloading: true });

    createProduct(formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, btnloading: false });
      } else {
        setValues({
          ...values,
          Device_Name: "",
          /* Device_Alias: '', */
          Description: "",
          /* Device_Group:'', */
          Device_Capability: "",
          Color: "",
          Style: "",
          Technology: "",
          Internal_Cost: "",
          Cost_Price: "",
          SmartDots_MSRP: "",
          Labor_Cost_Installation: "",
          Labor_Cost_Configuration: "",
          Config_Cost_Reseller: "",
          Labor_Price_Installation: "",
          Labor_Price_Configuration: "",
          category: "",
          Supplier: "",
          Manufacturer: "",
          Part_No: "",
          UPC_Code: "",
          shipping_charge: 0,
          video: "",
          /* Notes:'', */
          inventory: "",
          weight: "",
          isSmartDots: null,
          threshold: "",
          btnloading: false,
          createdProduct: data.Device_Name,
        });
      }
    });
  };

  const handleChangeGallery = (e) => {
    setImgError("");
    SetGallery(e.target.files);
  };

  const removeImage = (e, i) => {
    setImgError("");
    setValues({ ...values, error: "", btnloading: true });
    e.preventDefault();
    var newImg = images;
    newImg.splice(i, 1);
    setImages(newImg);
    setValues({ ...values, error: "", btnloading: false });
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        //console.log("Called", reader);
        baseURL = reader.result;
        //console.log(baseURL);
        resolve(baseURL);
      };
      //console.log(fileInfo);
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setImgError("");

    if (gallery.length >= 1) {
      setOnImageUpload(true);
      let data = await uploadMultipleImageToServer(gallery);
      if (!data.error) {
        setGalleryImageURL(data?.url);
        setImages(data?.url);
      }
      console.log("this is data incoming", data)
      setOnImageUpload(false);

      //   var baseData;
      //   var result = [];

      //   for (var i = 0; i < gallery.length; i++) {
      //     baseData = await getBase64(gallery[i]);
      //     result.push(baseData);
      //   }
      //   console.log("this is result for all images upload", result);

      //   setImages(result);
    } else {
      setImgError("Unable to upload images, because the field is empty!");
    }
  };

  const deviceForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="text-muted">
              Device Name<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("Device_Name")}
              type="text"
              className="form-control"
              value={Device_Name}
              required
            />
          </div>
          {/* <div className="form-group">
                       <label className="text-muted">Device Alias<span style={{color:"red"}}> *</span></label>
                       <input onChange={handleChange('Device_Alias')} type="text" className="form-control" value={Device_Alias} required />
                    </div> */}
          <div className="form-group">
            <label className="text-muted">
              Description<span style={{ color: "red" }}> *</span>
            </label>
            {/*  <textarea onChange={handleChange('Description')} rows="7" cols="7" className="form-control" value={Description} required /> */}
            <CKEditor
              data={Description}
              config={{}}
              onChange={handleChange("Description")}
            />
          </div>
          {/*  <div className="form-group">
                       <label className="text-muted">Device Group<span style={{color:"red"}}> *</span></label>
                       <input onChange={handleChange('Device_Group')} type="text" className="form-control" value={Device_Group} required />
                    </div> */}

          <div className="form-group">
            <label className="text-muted">Device_Capability</label>
            <input
              onChange={handleChange("Device_Capability")}
              type="text"
              className="form-control"
              value={Device_Capability}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">
              Color<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("Color")}
              type="text"
              className="form-control"
              value={Color}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">
              Style<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("Style")}
              type="text"
              className="form-control"
              value={Style}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">
              Technology<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("Technology")}
              type="text"
              className="form-control"
              value={Technology}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Labor_Cost_Installation($)</label>
            <input
              onChange={handleChange("Labor_Cost_Installation")}
              type="text"
              className="form-control"
              value={Labor_Cost_Installation}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Labor_Cost_Configuration($)</label>
            <input
              onChange={handleChange("Labor_Cost_Configuration")}
              type="text"
              className="form-control"
              value={Labor_Cost_Configuration}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Labor_Price_Installation($)</label>
            <input
              onChange={handleChange("Labor_Price_Installation")}
              type="text"
              className="form-control"
              value={Labor_Price_Installation}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Labor_Price_Configuration($)</label>
            <input
              onChange={handleChange("Labor_Price_Configuration")}
              type="text"
              className="form-control"
              value={Labor_Price_Configuration}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Config_Cost_Reseller($)</label>
            <input
              onChange={handleChange("Config_Cost_Reseller")}
              type="text"
              className="form-control"
              value={Config_Cost_Reseller}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Internal_Cost($)</label>
            <input
              onChange={handleChange("Internal_Cost")}
              type="text"
              className="form-control"
              value={Internal_Cost}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="text-muted">
              Cost_Price($)<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("Cost_Price")}
              type="text"
              className="form-control"
              value={Cost_Price}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">
              SmartDots_MSRP($)<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("SmartDots_MSRP")}
              type="text"
              className="form-control"
              value={SmartDots_MSRP}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">
              Supplier<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("Supplier")}
              type="text"
              className="form-control"
              value={Supplier}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Manufacturer</label>
            <input
              onChange={handleChange("Manufacturer")}
              type="text"
              className="form-control"
              value={Manufacturer}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Part_No</label>
            <input
              onChange={handleChange("Part_No")}
              type="text"
              className="form-control"
              value={Part_No}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">UPC_Code</label>
            <input
              onChange={handleChange("UPC_Code")}
              type="text"
              className="form-control"
              value={UPC_Code}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">
              Shipping Charge($)<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("shipping_charge")}
              type="text"
              className="form-control"
              value={shipping_charge}
              required
            />
          </div>
          {/* <div className="form-group">
                       <label className="text-muted">Notes</label>
                       <input onChange={handleChange('Notes')} type="text" className="form-control" value={Notes} />
                    </div> */}

          <div className="form-group">
            <label className="text-muted">
              Quantity<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("inventory")}
              type="number"
              min="0"
              className="form-control"
              value={inventory}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">
              Threshold<span style={{ color: "red" }}> *</span>
            </label>
            <input
              onChange={handleChange("threshold")}
              type="number"
              min="0"
              className="form-control"
              value={threshold}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Weight</label>
            <input
              onChange={handleChange("weight")}
              type="number"
              min="0"
              className="form-control"
              value={weight}
            />
          </div>
          <div className="form-group">
            <p className="text-muted">Is SmartDots Product</p>
            <label className="text-muted" for="yes">
              Yes &nbsp;
            </label>
            <input
              onChange={handleChange("isSmartDots")}
              type="radio"
              id="yes"
              name="isSmartDots"
              className=""
              value="true"
              required
              checked={isSmartDots}
            />
            <br />
            <label className="text-muted" for="no">
              No &nbsp;
            </label>
            <input
              onChange={handleChange("isSmartDots")}
              type="radio"
              id="no"
              className=""
              name="isSmartDots"
              value="false"
              checked={!isSmartDots}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">
              Category<span style={{ color: "red" }}> *</span>
            </label>
            <select
              required
              onChange={handleChange("category")}
              className="form-control"
            >
              <option>Select Category</option>{" "}
              {categories &&
                categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <label className="text-muted">
            Product Image<span style={{ color: "red" }}> *</span>
          </label>

          <div className="form-group">
            <label className="btn btn-secondary">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image/*"
                required
              />
            </label>
          </div>

          <label className="text-muted">
            Product Gallery<span style={{ color: "green" }}> (optional)</span>
          </label>
          <br />

          <label className="btn btn-secondary">
            <input
              onChange={handleChangeGallery}
              className={classes.multiple_drop}
              type="file"
              multiple
              accept="image/*"
            />
            <button onClick={handleUpload}>Upload</button>
          </label>
          <label style={{ color: "red" }}>
            <b>Note: Use ctrl + click to select multiple images.</b>
          </label>

          {images && images.length > 0 && (
            <div className={classes.gallery}>
              {" "}
              {images.map((s, i) => (
                <div key={i} className={classes.item}>
                  <button
                    onClick={(e) => removeImage(e, i)}
                    className={classes.btn}
                  >
                    x
                  </button>
                  <img className={classes.gimage} src={s} alt="" />
                </div>
              ))}{" "}
            </div>
          )}

          <br />
          <label className="text-muted">
            Product Video<span style={{ color: "green" }}> (optional)</span>
          </label>
          <br />
          <label className="btn btn-secondary">
            <input
              onChange={handleChange("video")}
              className={classes.multiple_drop}
              type="text"
              placeholder={"paste youtube video url here..."}
              value={video}
            />
          </label>
        </div>
      </div>

      <center>
        <br />
        <button className="btn btn-outline-primary" disabled={btnloading}>
          {" "}
          {btnloading ? "Loading..." : "Add Device"}{" "}
        </button>
      </center>

      <div>
        <Link className="nav-link" to="/admin/master-products">
          Go Back to List{" "}
        </Link>
      </div>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      role="alert"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showAddingError = () => (
    <div
      className="alert alert-danger"
      role="alert"
      style={{ display: itemError ? "" : "none" }}
    >
      {itemError}
    </div>
  );

  const showSuccess = () =>
    createdProduct && <Redirect to="/admin/master-products" />;

  const showImageError = () => (
    <div
      className="alert alert-danger"
      role="alert"
      style={{ display: imgError ? "" : "none" }}
    >
      {imgError}
    </div>
  );

  const ImageUploading = () => {
    return (
      <>
        <Backdrop className={classes.backdrop} open={true}>
          uploading Image...
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  };
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
                Add Product
              </h4>
              {deviceForm()}
              {showSuccess()}
              {showError()}
              {showAddingError()}
              {showImageError()}
            </div>
          </div>
        </div>
      </div>
      {onImageUpload && ImageUploading()}

      <Backdrop className={classes.backdrop} open={btnloading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </AdminLayout>
  );
};

export default AddMasterProduct;
