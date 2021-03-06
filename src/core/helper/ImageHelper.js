import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageUrl}
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          width: 100,
          height: 100,
          objectFit: "cover",
        }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
