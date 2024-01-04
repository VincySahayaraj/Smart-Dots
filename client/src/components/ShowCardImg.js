import React, { useState, useEffect } from "react";
import { API } from "../config";
import Skeleton from "@material-ui/lab/Skeleton";
import { loadMainImage } from "../Apis/apis";

const ShowCardImg = ({ item, id }) => {
  const [loading, setIsLoading] = useState(true);

  return (
    <div className="product-img" style={{ minHeight: "100px" }}>
      <a href={"/product-details/" + id}>
        {loading && (
          <Skeleton animation="wave" variant="rect" width={390} height={260} />
        )}
        <img
          src={item}
          alt="card image"
          className="card-img-top"
          onLoad={() => setIsLoading(false)}
        />
      </a>
    </div>
  );
};

export default ShowCardImg;
