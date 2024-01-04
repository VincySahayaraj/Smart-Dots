import React from "react";
import { API } from "../config";

const ShowReturnImg = ({ item, url }) => (
    <div className="product-img" style={{minHeight:'100px'}}>
       
        <img
            src={`${API}/return-request/photo/${item}`}
            alt="details"
            className="mb-3"
            style={{ maxHeight: "50%", maxWidth: "50%" }}
        />
       
    </div>
);

export default ShowReturnImg;
