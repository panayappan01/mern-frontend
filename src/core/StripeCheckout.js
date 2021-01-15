import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { loadCart } from "./helper/cartHelper";
import { cartEmpty, createOrder } from "./helper/orderHelper";
import axios from "axios";
import { API } from "../backend";
import { getOrderData } from "./helper/paymentHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const user = isAuthenticated() && isAuthenticated().user;

  const getFinalAmount = () => {
    let amount = 0;
    products &&
      products.map((p, index) => {
        amount += p.price;
      });
    return amount;
  };

  //   const displayRazorpay = async () => {
  //     // const res = await loadScript(
  //     //   "https://checkout.razorpay.com/v1/checkout.js"
  //     // );
  //     const res;

  //     if (!res) {
  //       alert("Razorpay SDK failed to load. Are you online?");
  //       return;
  //     }

  //     const result = await axios.post(`${API}/orders`);

  //     if (!result) {
  //       alert("Server error. Are you online?");
  //       return;
  //     }

  //     console.log("RESULT.DATA", result.data);

  //     const { amount, id: order_id, currency } = result.data;

  //     const options = {
  //       key: "rzp_test_FMeqdDQCalKdzX", // Enter the Key ID generated from the Dashboard
  //       amount: amount.toString(),
  //       currency: currency,
  //       name: "Soumya Corp.",
  //       description: "Test Transaction",
  //       //   image: { logo },
  //       order_id: result.data.id,
  //       handler: async function (response) {
  //         // const data = {
  //         //   orderCreationId: order_id,
  //         //   razorpayPaymentId: response.razorpay_payment_id,
  //         //   razorpayOrderId: response.razorpay_order_id,
  //         //   razorpaySignature: response.razorpay_signature,
  //         // };
  //         // const result = await axios.post(
  //         //   "http://localhost:8000/api/success",
  //         //   data
  //         // );
  //         // alert(result.data.msg);
  //       },
  //       prefill: {
  //         name: "Soumya Dey",
  //         email: "SoumyaDey@example.com",
  //         contact: "9999999999",
  //       },
  //       notes: {
  //         address: "Soumya Dey Corporate Office",
  //       },
  //       theme: {
  //         color: "#61dafb",
  //       },
  //     };

  //     const paymentObject = new window.Razorpay(options);
  //     paymentObject.open();
  //   };

  const getPaymentDetail = () => {
    getOrderData(getFinalAmount() * 100, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);

        var options = {
          key: process.env.REACT_APP_RAZORPAYKEY,
          amount: data.amount,
          currency: data.currency,
          name: user.name,
          description: "Test Transaction",
          image:
            "https://www.flaticon.com/svg/vstatic/svg/4019/4019907.svg?token=exp=1610510925~hmac=b8c68f37c40d215681447d2761d7549c",
          order_id: data.id,
          prefill: {
            name: user.name,
            email: user.email,
            contact: "9999999999",
          },
          notes: {
            address: "Soumya Dey Corporate Office",
          },
          theme: {
            color: "#61dafb",
          },
          handler: async function (response) {
            console.log("RAZORPAY RESPONSE", response);
            if (response.razorpay_payment_id) {
              alert("Payment Success");

              const orderData = {
                products: products,
                transaction_id: response.razorpay_payment_id,
                amount: data.amount,
              };

              createOrder(userId, token, orderData);

              cartEmpty(() => {
                console.log("DID WE GOT A CRASH");
                setReload(!reload);
              });
            }
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    });
  };

  const showStripeButton = () => {
    return isAuthenticated() && products.length > 0 ? (
      <button onClick={getPaymentDetail} className="btn btn-success">
        Pay with Stripe
      </button>
    ) : (
      <>
        {/* <Link to="/signin">
          <button className="btn btn-warning">Signin</button>
        </Link> */}
        <h1>Please Login or Add Something to the Cart</h1>
      </>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
