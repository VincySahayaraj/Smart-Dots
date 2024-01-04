import React, { useEffect } from "react";
import { API } from "../config";
import {loadMainImage} from "../Apis/apis"
const ShowImage = ({ item }) => {




    return(
  <div className="product-img" style={{ minHeight: "100px" }}>
    {console.log("iamgeeee", item)}
    <img
      src={item}
      alt="details"
      className="mb-3"
      style={{ height: "auto", width: "50%" }}
    />
  </div>
    );
};
export default ShowImage;
