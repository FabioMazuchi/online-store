import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProductFromId } from "../services/api";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      allProducts: [],
      loading: false,
    };
    this.callApi = this.callApi.bind(this);
    this.addCart = this.addCart.bind(this);
    this.GetOnMount = this.GetOnMount.bind(this);
  }

  componentDidMount() {
    this.callApi();
  }

  componentDidUpdate(_, prevState) {
    const { allProducts } = this.state;
    if (prevState.allProducts !== allProducts) {
      localStorage.setItem("products", JSON.stringify(allProducts));
    }
  }

  addCart(product) {
    const { allProducts } = this.state;
    this.setState({ allProducts: [...allProducts, product] });
  }

  GetOnMount() {
    const GET_ITEMS = JSON.parse(localStorage.getItem("products"));
    this.setState({ allProducts: GET_ITEMS || [] });
  }

  async callApi() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ loading: true });
    const response = await getProductFromId(id);
    this.setState({
      product: response,
      loading: false,
    });
  }

  render() {
    const { product, loading } = this.state;
    {product.attributes !== undefined && console.log(product.attributes[0]);}
    return (
      <div>
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <section className="container-details">
            <div className="details-product">
              <p data-testid="product-detail-name">{product.title}</p>
              <img src={product.thumbnail} alt={product.title} />
              <h3>R${product.price}</h3>
              <button
                className="card-button"
                onClick={() => this.addCart(product)}
                type="button"
                data-testid="product-detail-add-to-cart"
              >
                Adicionar no Carrinho
              </button>
            </div>
            <div className="details">
              {product.attributes !== undefined && product.attributes.map((attr => (
                <p><b>{attr.name}</b>: {attr.value_name}</p>
              )))}
            </div>
          </section>
        )}
        <Footer />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
