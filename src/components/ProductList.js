import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      allProducts: [],
    };
    this.addCart = this.addCart.bind(this);
    this.GetOnMount = this.GetOnMount.bind(this);
  }

  componentDidMount() {
    this.GetOnMount();
  }

  componentDidUpdate(_, prevState) {
    const { allProducts } = this.state;
    if (prevState.allProducts !== allProducts) {
      localStorage.setItem('products', JSON.stringify(allProducts));
    }
  }

  addCart(product) {
    const { allProducts } = this.state;
    this.setState({ allProducts: [...allProducts, product] });
  }

  GetOnMount() {
    const GET_ITEMS = JSON.parse(localStorage.getItem('products'));
    this.setState({ allProducts: GET_ITEMS || [] });
  }

  render() {
    const { products } = this.props;
    const { results } = products;
    const minLength = 0;

    return (
      <div className="products">
        {
          results.length === minLength ? (
            <h2>Nenhum produto foi encontrado</h2>
          ) : (
            results
              .map((product) => (<ProductCard
                key={ product.id }
                product={ product }
                addToCart={ () => this.addCart(product) }
              />))
          )
        }
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.shape(PropTypes.object).isRequired,
};

export default ProductList;
