import React, { useState, useEffect } from "react";
import { getProducts } from "./helper/coreapicalls";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  return (
    <Base title="Home Page" description="Welcome to my store">
      <div className="row text-center">
        <h1 className="text-white">All of Tshirt</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
