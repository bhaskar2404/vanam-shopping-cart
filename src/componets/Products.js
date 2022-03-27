import React, { useState, useEffect } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import { fetchProducts } from "../action/prodcutActions";
import { connect } from "react-redux";
import Modal from "react-modal";

import { Zoom } from "react-reveal";
const Products = ({ products, addToCart, ...props }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    props.fetchProducts();
  }, []);
  const openModal = (product) => {
    setProduct(product);
  };

  console.log("products ***", products);
  const closeModal = () => {
    setProduct(null);
  };
  return (
    <div>
      <Fade button cascade>
        {!products ? (
          <div>Loading...</div>
        ) : (
          <ul className="products">
            {products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a
                    href={`# + ${product._id}`}
                    onClick={() => openModal(product)}
                  >
                    <img src={product.image} alt={product.title} />
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    {formatCurrency(product.price)}
                  </div>
                  <button
                    className="button primary"
                    onClick={() => addToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Fade>
      {product && (
        <Modal isOpen={true}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              x
            </button>
            <div className="product-details">
              <img src={product.image} alt={product.title} />
              <div className="product-details-description">
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>{product.description}</p>
                <p>
                  Available size{"  "}
                  {product.availableSizes.map((x) => (
                    <span>
                      {" "}
                      <button className="button">{x}</button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => {
                      addToCart(product);
                      closeModal();
                    }}
                  >
                    {" "}
                    add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state.items;
};

export default connect(
  (state) => ({
    products: state.products.items,
  }),
  { fetchProducts }
)(Products);
