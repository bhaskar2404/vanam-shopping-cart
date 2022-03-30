import React, { useState } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { removeFromCart } from "../action/cartActions";
import { createOrder, clearOrder } from "../action/createOrder";
import Modal from "react-modal/lib/components/Modal";
import { Zoom } from "react-reveal";

const Cart = (props) => {
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [chkDetails, setChkDetails] = useState({
    name: "",
    email: "",
    address: "",
  });
  console.log("props from cart" + props.order);
  const handleInput = (e) => {
    setChkDetails({ ...chkDetails, [e.target.name]: e.target.value });
  };
  const closeModal = () => {
    props.clearOrder();
  };
  const createOrder = (e) => {
    //   e.priventDefault();
    e.preventDefault();

    const order = {
      name: chkDetails.name,
      email: chkDetails.email,
      address: chkDetails.address,
      cartitems: props.cartItems,
      total: props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    //console.table(order);
    props.createOrder(order);
  };

  return (
    <div>
      <div>
        {props.cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is Empty</div>
        ) : (
          <div className="cart cart-header">
            You have {props.cartItems.length} in the Cart
          </div>
        )}
      </div>
      {props.order && (
        <Modal isOpen={true} onRequestClose={closeModal} ariaHideApp={false}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
            <div className="order-details">
              <h3 className="success-message">Your order has been placed.</h3>
              <h2>Order {props.order._id}</h2>
              <ul>
                <li>
                  <div>Name:</div>
                  <div>{props.order.name}</div>
                </li>
                <li>
                  <div>Email:</div>
                  <div>{props.order.email}</div>
                </li>
                <li>
                  <div>Address:</div>
                  <div>{props.order.address}</div>
                </li>
                <li>
                  <div>Date:</div>
                  <div>{props.order.createdAt}</div>
                </li>
                <li>
                  <div>Total:</div>
                  <div>{props.order.total}</div>
                </li>
                <li>
                  <div>Cart Items:</div>
                  <div>
                    {props.order.cartItems?.map((x) => (
                      <div>
                        {x.count} {" x "} {x.title}
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </Zoom>
        </Modal>
      )}
      <div className="cart">
        <Fade left cascade>
          <ul className="cart-item">
            {props.cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x {item.count}{" "}
                    <button
                      className="button primary"
                      onClick={() => props.removeFromCart(item)}
                    >
                      Remote Item
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
      </div>
      {props.cartItems.length !== 0 && (
        <div>
          <div className="cart">
            <div className="total">
              <div>
                Total : {""}
                {formatCurrency(
                  props.cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <button
                className="button primary"
                onClick={() => setShowCheckOut(true)}
              >
                Procesed
              </button>
            </div>
          </div>
          {showCheckOut && (
            <Fade right cascade>
              <div className="cart">
                <form onSubmit={createOrder}>
                  <ul className="form-container">
                    <li>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        onChange={(e) => handleInput(e)}
                      />
                    </li>
                    <li>
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        onChange={(e) => handleInput(e)}
                      />
                    </li>
                    <li>
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        onChange={(e) => handleInput(e)}
                      />
                    </li>
                    <li>
                      <button className="button primary" type="submit">
                        Checkout
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            </Fade>
          )}
        </div>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
    order: state.order.order,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart);
