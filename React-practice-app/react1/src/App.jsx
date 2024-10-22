import { useState , useEffect, useRef } from "react"
import Controller from "./Components/Controller"
import Viewer from "./Components/Viewer"
import "./App.css"

function App() {
  const [count,setCount] = useState(0);

  const isitfirst = useRef(false);

  //1. 마운트: 컴포넌트가 처음 렌더링 될 때.
  useEffect(()=>{
    if(!isitfirst===false){
      isitfirst.current = true;
      return;
    }
    //실행시킬 코드 포함

  });

  const onClickButton = (value) => {
    // 클릭 시 실행될 함수를 반환합니다
    setCount(count+value);
};
  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section><Viewer count={count} /></section>
      <section><Controller onClickButton={onClickButton} /></section>
    </div>
  )
}

export default App
