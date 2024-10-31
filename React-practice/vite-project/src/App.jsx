import React, { useReducer } from "react";

function reducer(state, action) {
  switch(action.type){
    case "plus":
      return state+1;
    case "minus":
      return state-1;
  }
 
}

function App() {
  const [count,dispatch] = useReducer(reducer,0);

  const onCountUp = ()=>{
    dispatch({type:"plus"});
  }

  const onCountDown = ()=>{
    dispatch({type:"minus"});
  }

  return(
    <>
    <h1>{count}</h1>
    <button onClick={onCountUp}>+</button>
    <button onClick={onCountDown}>-</button>

    </>
  )
    
}

export default App;
