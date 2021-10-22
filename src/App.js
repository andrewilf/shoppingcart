import React, { useState, useReducer } from 'react';
import './styles.css';
import AllTheThings from './Components/AllTheThings';
import MyShoppingCart from './Components/MyShoppingCart';
import AddItemForm from './Components/AddItemForm';
import productsArr from './products';

export default function App() {
  const [products, setProducts] = useState(productsArr);

  const changeCart = (state, action) => {
    switch (action.type) {
      case "ADD":
        console.log("added")
        return ([...state, action.value])
      case "REMOVE":
        console.log("removed")
        const cartArr = state.filter((d, i) => i !== action.value)
        return cartArr
      default:
        return state
    }
  }

  const [shoppingCart, cartDispatch] = useReducer(changeCart, [])



  const addToProducts = newProduct => {
    setProducts([newProduct, ...products])
  }

  return (
    <div className="App">
      <h1>Big Time Shopping</h1>
      <AddItemForm handleSubmit={addToProducts} />
      <div className="items">
        <div className="AllTheThings">
          <AllTheThings products={products} handleClick={cartDispatch}
            
             />
        </div>
        <MyShoppingCart cart={shoppingCart} handleClick={cartDispatch} />
      </div>
    </div>
  );
}
