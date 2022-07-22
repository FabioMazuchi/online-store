import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header>
        <h1>Trybe Online Store</h1>
        <nav>
          <Link data-testid="shopping-cart-button" to="/cart">
            <i className="fas fa-shopping-cart" />
          </Link>
          <Link to="/">
          <i class="fas fa-home"></i>
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
