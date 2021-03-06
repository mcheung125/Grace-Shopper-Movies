import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getUserCartById, removeMovieThunk} from '../store/cartReducer'

class ShoppingCart extends React.Component {
  componentDidMount() {
    if (this.props.user.id) this.props.renderCart()
  }
  render() {
    if (this.props.cart.movies) {
      return (
        <div className="cart">
          <div>
            {this.props.cart.movies.map((movie, idx) => (
              <div key={idx} className="cartMovie">
                <img src={movie.image} />
                <p>{movie.name}</p>
                <p>${movie.price / 100}</p>
                <button
                  type="submit"
                  className="remove"
                  onClick={() => this.props.removeMovie(movie)}
                >
                  Remove
                </button>
              </div>
            ))}
            <Link to="/movies">
              <button type="submit">Back to Shopping</button>
            </Link>
            {Object.keys(this.props.user).length > 1 ? (
              <Link to="/checkout">
                <button type="submit">Proceed to Checkout</button>
              </Link>
            ) : (
              <Link to="/guestcheckout">
                <button type="submit">Proceed to Checkout</button>
              </Link>
            )}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <p>Your cart is empty</p>
        </div>
      )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    cart: state.cart.userCart
  }
}

const mapDispatch = dispatch => {
  return {
    renderCart: () => {
      dispatch(getUserCartById())
    },
    removeMovie: movie => {
      dispatch(removeMovieThunk(movie))
    }
  }
}

export default connect(mapState, mapDispatch)(ShoppingCart)

/**
 * PROP TYPES
 */
// ShoppingCart.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
