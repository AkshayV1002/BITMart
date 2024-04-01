import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import "../ProductDetails.css";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Product = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [showDetails, setShowDetails]=useState(false);
  const [buttonText,setButtonText]=useState("SHOW SELLER DETAILS");

  //initalp details
  useEffect(() => {
    if (params?.id) getProduct();
  }, [params?.id]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/product/get-product/${params.id}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  const detailsFunction=()=>{
    if(showDetails===false){
      setShowDetails(true);
      setButtonText("HIDE SELLER DETAILS");
    }
    else{
      setShowDetails(false);
      setButtonText("SHOW SELLER DETAILS");
    }
  }

  return (
    <Layout>
      {/* console.log({product._id}); */}
      <div className="product-container">
        <LazyLoadImage
          src={`http://localhost:5000/api/product/product-photo/${product._id}`}
          className="product-image"
          alt={product.name}
          height="300"
          width={"350px"}
        />
        <div className="product-details">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </p>
          <p className="product-description">{product.description}</p>
          <p className="product-quantity">
            Available: {product.quantity} in stock
          </p>

          <button
            className="add-to-bag-button"
            onClick={() => {
              const items = JSON.parse(localStorage.getItem("cart")) || [];
              let exists = false;

              if (items.length) {
                for (const item of items) {
                  if (item?._id === product._id) {
                    exists = true;
                    break;
                  }
                }
              }
              if (exists) {
                const updatedCart = cart.filter(
                  (item) => item._id !== product._id
                );
                setCart(updatedCart);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                toast("Product removed from favourites", { icon: "🥺" });
              } else {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast("Product added to favourites", { icon: "❤️" });
              }
            }}
          >
            ADD TO FAVOURITES
          </button>
          <button className="contact-seller-button">CONTACT SELLER</button>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
