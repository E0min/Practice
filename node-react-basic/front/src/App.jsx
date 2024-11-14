import { useEffect } from "react";

import "./App.css";

function App() {
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response.data));
  }, []);
  return (
    <>
      <h1>랜딩페이지</h1>
    </>
  );
}

export default App;
