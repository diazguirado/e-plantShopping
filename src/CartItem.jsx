import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      return total + item.quantity * parseFloat(item.cost.replace("$", ""));
    }, 0).toFixed(2); // Round to two decimal places
  };

  const handleContinueShopping = (e) => {
    console.log('handleContinueShopping')
    // We do this to verify that onContinueShopping() exists
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    console.log('handleIncrement', item.name);
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      console.log('handleDecrement', item.name);
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      console.log('handleDecrement', item.name, '(removeItem)');
      dispatch(removeItem({ name: item.name}));
    }
  };

  const handleRemove = (item) => {
    console.log('handleRemove', item.name);
    dispatch(removeItem({ name: item.name}));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace("$", ""));
    return (item.quantity * cost).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
        <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
        <div className="continue_shopping_btn">
          <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
          <br />
          <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
        </div>
      </div>
  );
};

export default CartItem;


