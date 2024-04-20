import React from "react";

const Cart = ({ cartItems, onClear, onLog }) => {
  return (
    <>
      <div>Cart</div>
      <ul>
        {cartItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={onClear}>CLear</button>
      <button onClick={onLog}>LOG</button>
    </>
  );
};

export default Cart;
