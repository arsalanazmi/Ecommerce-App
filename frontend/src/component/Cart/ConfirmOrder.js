import React, { Fragment } from "react";
import "./ConfirmOrder.css";
import CheckOutSteps from "./CheckOutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  let filteredItems = cartItems.filter((item) => {
    return item?.user === user?._id;
  });

  const subTotal = filteredItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subTotal > 1000 ? 0 : 200;

  const tax = (subTotal * 0.18).toFixed(2);

  const totalPrice = Number(subTotal) + Number(shippingCharges) + Number(tax);

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subTotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />

      <CheckOutSteps activeStep={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>

            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.name}</span>
              </div>

              <div>
                <p>Phone:</p>
                <span>{shippingInfo?.phoneNumber}</span>
              </div>

              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {filteredItems &&
                filteredItems.map((item) => (
                  <div key={item?.product}>
                    <img src={item?.image} alt="Product" />
                    <Link to={`/product/${item?.product}`}>{item.name}</Link>
                    <span>
                      {item?.quantity} X PKR {item?.price} =
                      <b> PKR {item?.price * item?.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>

            <div>
              <div>
                <p>SubTotal: </p>
                <span>PKR {subTotal}</span>
              </div>

              <div>
                <p>Shipping Charges: </p>
                <span>PKR {shippingCharges}</span>
              </div>

              <div>
                <p>GST:</p>
                <span>PKR {tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total: </b>
              </p>
              <span>PKR {totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
