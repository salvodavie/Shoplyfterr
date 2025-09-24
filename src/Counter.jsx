import React from "react";

function Counter({qty, onIncrement, onDecrement}) {

  return(

      <div className="quantity">
        <span className="quantity-label">×{qty}</span>
        <button className="increment" onClick={onIncrement}>+</button>
        <button className="decrement" onClick={onDecrement} disabled={qty <= 0}>-</button>
        <span className="quantity-amount"></span>
      </div>
        );
};

export default Counter;