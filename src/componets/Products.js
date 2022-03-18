import React from "react";
import formatCurrency from "../util";

const Products = ({ products, addToCart }) => {
  console.log("prodcuts", products);
  return (
    <div>
      <ul className="products">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product">
              <a href={`# + ${product._id}`}>
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
    </div>
  );
};

export default Products;
