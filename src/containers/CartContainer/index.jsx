import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout } from '../../actions'
import { getTotal, getCartProducts } from '../../reducers'

const CartContainer = ({ products, total, checkout }) => {
  const hasProducts = products.length > 0;
  return (
    <div>
      <h3>您的购物车</h3><em>请选择以上商品</em>
      <div className="cart-container">
        <div>
          {
            products.map(product =>
              <div key={product.id}>{product.title} - {product.price}元{product.quantity ? ` x ${product.quantity} 本` : null}</div>
            )
          }
        </div>
        <p>总价是: {total}元</p>
      </div>
      <button className="submit-btn" onClick={() => checkout(products)}
        disabled={hasProducts ? '' : 'disabled'}>
        去结算
      </button>
    </div>
  )
}

CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state)
})

export default connect(
  mapStateToProps,
  { checkout }
)(CartContainer)
