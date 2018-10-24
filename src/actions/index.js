import shop from '../api/shop'  // 模拟获取服务端数据
import * as types from '../actionTypes/' // actionType 定义

/**
 * Action 创建函数
 * 获取商品（书籍）
 */
const getProductsAction = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
})

/**
 * Action 创建函数
 * 创建一个被绑定的 action 创建函数来自动 dispatch
 */
export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(getProductsAction(products))
  })
}

/**
 * Action 创建函数
 * 加入购物车
 */
const addToCartAction = productId => ({
  type: types.ADD_TO_CART,
  productId
})

/**
 * 加入购物车
 */
export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartAction(productId))
  }
}

/**
 * 去结算
 */
export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()
  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}
