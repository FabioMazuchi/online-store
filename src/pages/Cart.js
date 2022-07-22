import React, { Component } from "react";
import { Link } from "react-router-dom";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      allProducts: [],
    };
    this.getProducts = this.getProducts.bind(this);
    this.incrementItem = this.incrementItem.bind(this);
    this.decrementItem = this.decrementItem.bind(this);
    this.updateProductSoma = this.updateProductSoma.bind(this);
    this.updateProductSub = this.updateProductSub.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    const getAll = JSON.parse(localStorage.getItem("products"));
    this.setQtdPrice(getAll);
    this.setState({ allProducts: getAll || [] });
  }

  setQtdPrice(storage) {
    if (storage !== null) {
      const res = storage.reduce((acc, prod) => {
        prod.qtdProduct = 1;
        prod.preco = prod.price;
        acc.push(prod);
        return acc;
      }, []);
      this.setState({
        allProducts: res,
      });
    }
  }

  updateProductSub(product) {
    const { allProducts } = this.state;
    const res = allProducts.reduce((acc, prod) => {
      if (product.id === prod.id) {
        prod.price -= product.preco;
        acc.push(prod);
      } else {
        acc.push(prod);
      }
      return acc;
    }, []);
    this.setState({
      allProducts: res,
    });
  }

  updateProductSoma(product) {
    const { allProducts } = this.state;
    const res = allProducts.reduce((acc, prod) => {
      if (product.id === prod.id) {
        prod.price += product.preco;
        acc.push(prod);
      } else {
        acc.push(prod);
      }
      return acc;
    }, []);
    this.setState({
      allProducts: res,
    });
  }

  incrementItem(product) {
    const { allProducts } = this.state;
    const res = allProducts.reduce((acc, prod) => {
      if (product.id === prod.id) {
        product.qtdProduct += 1;
        acc.push(prod);
      } else {
        acc.push(prod);
      }
      return acc;
    }, []);
    this.setState(
      {
        allProducts: res,
      },
      this.updateProductSoma(product)
    );
  }

  decrementItem(product) {
    const { allProducts } = this.state;
    const res = allProducts.reduce((acc, prod) => {
      if (product.id === prod.id) {
        product.qtdProduct -= 1;
        acc.push(prod);
      } else {
        acc.push(prod);
      }
      return acc;
    }, []);
    this.setState(
      {
        allProducts: res,
      },
      () => this.updateProductSub(product)
    );
  }

  render() {
    const { allProducts } = this.state;
    return (
      <div>
        <header>
          <h1>Trybe Online Store</h1>
          <nav>
            <Link to="/">
              <i class="fas fa-home"></i>
            </Link>
          </nav>
        </header>
        {allProducts.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (
          <ul className="cart">
            {allProducts.map((product) => (
              <li key={product.id}>
                <section
                  className="cart-product"
                  data-testid="product-detail-link"
                >
                  <div className="cart-details">
                    <p
                      className="card-title"
                      data-testid="shopping-cart-product-name"
                    >
                      {product.title}
                    </p>
                    <img
                      className="image-card"
                      src={product.thumbnail}
                      alt={product.title}
                    />
                    <p className="card-price">
                      {`Valor: R$${product.price.toFixed(2)}`}
                    </p>
                    <div className="buttons">
                      <button
                        onClick={() => this.incrementItem(product)}
                        type="button"
                        data-testid="product-increase-quantity"
                      >
                        +
                      </button>
                      <p data-testid="shopping-cart-product-quantity">
                        Qtd. {product.qtdProduct}
                      </p>
                      {product.qtdProduct === 1 ? (
                        <button
                          onClick={() => this.decrementItem(product)}
                          type="button"
                          data-testid="product-decrease-quantity"
                          disabled
                        >
                          -
                        </button>
                      ) : (
                        <button
                          onClick={() => this.decrementItem(product)}
                          type="button"
                          data-testid="product-decrease-quantity"
                        >
                          -
                        </button>
                      )}
                    </div>
                  </div>

                  <button className="excluir" type="button">
                    X
                  </button>
                </section>
              </li>
            ))}
            <button className="finalizar" type="button">
              Finalizar Compra
            </button>
          </ul>
        )}
      </div>
    );
  }
}

export default Cart;
