import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../_actions/user_action.jsx";
import { useDispatch } from "react-redux";
import "./LoginPage.css";

function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const gotoRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 후 페이지 새로고침을 막는다.
    const body = {
      email: email,
      password: password,
    };

    dispatch(loginUser(body));
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">로그인</button>
          <button type="button" onClick={gotoRegister} className="register-btn">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
