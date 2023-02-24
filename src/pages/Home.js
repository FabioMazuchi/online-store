import React from 'react';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import Loading from '../components/Loading';
import ProductList from '../components/ProductList';
import '../App.css';
import Categories from '../components/Categories';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Home extends React.Component {
  constructor() {
    super();

    this.handlechangeSearch = this.handlechangeSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.a = this.a.bind(this);

    this.state = {
      searchText: '',
      listProduct: [],
      isLoading: false,
      isLoadingCategory: true,
      categories: '',
      Category: '',
    };
  }

  componentDidMount() {
    this.getAllCategories();
  }

  async componentDidUpdate() {
    const { isLoading } = this.state;
    if (isLoading) {
      this.a();
    }
  }

  handlechangeSearch({ target }) {
    this.setState({ searchText: target.value });
  }

  handleClick = async () => {
    this.setState({ isLoading: true });
  };

  async getAllCategories() {
    const all = await getCategories();
    this.setState({ categories: all, isLoadingCategory: false });
  }

  async a() {
    const { Category, searchText } = this.state;
    const CatRequest = await getProductsFromCategoryAndQuery(
      Category,
      searchText,
    );
    this.setState({ listProduct: CatRequest, isLoading: false });
  }

  renderCategory({ target }) {
    this.setState({ isLoading: true, Category: target.id });
  }

  render() {
    const { listProduct, isLoading, isLoadingCategory, categories } = this.state;
    return (
      <div>
        <Header />
        <section className="container">
          <div>
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
            <section className="formSearch">
              <input
                data-testid="query-input"
                onChange={ this.handlechangeSearch }
                className="search-input"
                type="text"
              />
              <button
                data-testid="query-button"
                className="search-button"
                type="button"
                onClick={ this.handleClick }
              >
                Buscar
              </button>
            </section>
          </div>
          <section className="categories">
            <nav>
              <Categories
                categoriesProp={ categories }
                isLoadingCategoryProp={ isLoadingCategory }
                renderCategory={ this.renderCategory }
              />
            </nav>
            {isLoading && <Loading />}
            {listProduct.length !== 0 && <ProductList products={ listProduct } />}
          </section>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Home;
