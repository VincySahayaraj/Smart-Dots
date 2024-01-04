import React, { useEffect } from "react";
import { API } from "../config";
import { loadMainImage } from "../Apis/apis";

const ShowListingImg = ({ item }) =>
  useEffect(() => {
    console.log("this is item", item);
    if (item) {
      console.log("this is item", item);
      loadMainImage(item);
    }
  }, [item])(
    <div className="product-img" style={{ minHeight: "100px" }}>
      <img
        src={`${API}/product/photo/${item}`}
        alt="details"
        className="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
    </div>
  );

export default ShowListingImg;
