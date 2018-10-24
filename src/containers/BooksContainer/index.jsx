import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart } from '../../actions'
import { getVisibleProducts } from '../../reducers/products'

const BooksContainer = ({ products, addToCart }) => (
  <div>
    <h2>网上书店</h2>
    <div className="products-container">
      {products.map(product =>
        <div key={product.id}>
          {product.title} - {product.price}元 库存数量： {product.inventory ? `${product.inventory}` : null}
          <button
            className="add-btn"
            onClick={() => addToCart(product.id)}
            disabled={product.inventory > 0 ? '' : 'disabled'}>
            {product.inventory > 0 ? '添加到购物车' : '售罄'}
          </button>
        </div>
      )}
    </div>
  </div>
)

BooksContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products)
})

export default connect(
  mapStateToProps,
  { addToCart }
)(BooksContainer)
