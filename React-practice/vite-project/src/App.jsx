import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    birth: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    console.dir(`${form.name}`);
  }, [form.name]);
  return (
    <div>
      <h1>{form.name}</h1>
      <h1>{form.birth}</h1>
      <h1>{form.country}</h1>

      <div>
        <input
          type="text"
          name="name"
          placeholder="이름"
          onChange={handleChange}
          value={form.name}
        />
      </div>
      <div>
        <input
          type="text"
          name="birth"
          placeholder="생일"
          onChange={handleChange}
          value={form.birth}
        />
      </div>
      <div>
        <select name="country" value={form.country} onChange={handleChange}>
          <option value="한국">한국</option>
          <option value="미국">미국</option>
          <option value="영국">영국</option>
        </select>
      </div>
    </div>
  );
}

export default App;
