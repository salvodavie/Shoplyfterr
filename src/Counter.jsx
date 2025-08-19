import React, { useState } from "react";

function Counter() {
  const [quantity, setQuantity] = useState(0);

  function increment() {
    setQuantity(prev => prev + 1);
  }

  function decrement() {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
    }
  }

  return(

      <div className="quantity">
        <span className="quantity-label">x{quantity}</span>
        <button className="increment" onClick={increment}>+</button>
        <button className="decrement" onClick={decrement}>-</button>
        <span className="quantity-amount"></span>
      </div>
        )
};

export default Counter;