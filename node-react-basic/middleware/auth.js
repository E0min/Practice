const User = require('../models/User'); // User 모델 임포트
const jwt = require('jsonwebtoken');

let auth = async (req, res, next) => {
  try {
    // 클라이언트 쿠키에서 토큰을 가져온다.
    const token = req.cookies.x_auth;

    // 토큰을 복호화하여 유저를 찾는다.
    const user = await User.findByToken(token);
    if (!user) return res.json({ isAuth: false, error: true });

    // 유저 정보와 토큰을 요청 객체에 추가
    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    console.error("Authentication error:", err.message); // 에러 로그 추가
    return res.status(401).json({ isAuth: false, error: true, message: err.message });
  }
};

module.exports = { auth };
