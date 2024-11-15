import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.css";

const RegisterForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    lastname: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        user
      );
      // 서버로부터 받은 응답 처리
      if (response.data.success) {
        alert("회원가입 성공");
      } else {
        alert("회원가입 실패: " + response.data.message);
      }
    } catch (error) {
      console.error("회원가입 요청 중 오류 발생:", error);
      alert("회원가입 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <form className="register-form">
      <div className="form-group">
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          required
          value={user.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastname">성</label>
        <input
          type="text"
          id="lastname"
          required
          value={user.lastname}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          required
          value={user.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          required
          value={user.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit" onClick={handleSubmit} className="submit-button">
        회원가입
      </button>
    </form>
  );
};

export default RegisterForm;
