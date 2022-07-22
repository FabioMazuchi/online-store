import React from "react";
import PropTypes from "prop-types";
import "../App.css";
import { Link } from "react-router-dom";

class ProductCard extends React.Component {
  render() {
    const { product, addToCart } = this.props;
    return (
      <div data-testid="product" className="card-container">
        <section className="card">
          <Link data-testid="product-detail-link" to={`/details/${product.id}`}>
            <p className="card-title">{product.title}</p>
            <img
              className="image-card"
              src={product.thumbnail}
              alt={product.title}
            />
            <p>
              <b className="card-price">{`Valor: R$${product.price}`}</b>
            </p>
            <button
              className="card-button"
              type="button"
              data-testid="product-add-to-cart"
              onClick={addToCart}
            >
              Adicionar ao carrinho
            </button>
          </Link>
        </section>
      </div>
    );
  }
}

ProductCard.propTypes = {
  addToCart: PropTypes.func.isRequired,
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
