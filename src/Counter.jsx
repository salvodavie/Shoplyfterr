import React from "react";

function Counter({qty, onIncrement, onDecrement}) {

  return(

      <div className="quantity">
        <span className="quantity-label">×{qty}</span>
        <div className="quantity-buttons"></div>
        <button className="quantity-button" onClick={onIncrement}>+</button>
        <button className="quantity-button" onClick={onDecrement} disabled={qty <= 0}>-</button>
        <span className="quantity-amount"></span>
      </div>
        );
};

export default Counter;