import React, { useReducer } from 'react';
import './styles.css';
import AllTheThings from './Components/AllTheThings';
import MyShoppingCart from './Components/MyShoppingCart';
import AddItemForm from './Components/AddItemForm';
import productsArr from './products';

export default function App() {
  
  const addProduct = (state, action) => {
    switch (action.type) {
      case "ADD":
        return ([action.value, ...state])
      default:
        return state
    }
  }

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

  const [products, productDispatch] = useReducer(addProduct, productsArr);
  const [shoppingCart, cartDispatch] = useReducer(changeCart, [])



  // const addToProducts = newProduct => {
  //   setProducts([newProduct, ...products])

  // }

  return (
    <div className="App">
      <h1>Big Time Shopping</h1>
      <AddItemForm handleSubmit={productDispatch} />
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
