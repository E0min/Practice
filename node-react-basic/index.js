const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth'); // auth 미들웨어 임포트

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://bbok4yo:9JkqINUawFtCy0NX@cluster0.niola.mongodb.net/myDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//test
app.get('/api/hello',(req,res)=>{
  res.send("안녕하세요");
})

// 회원가입 엔드포인트
app.post('/api/users/register', async (req, res) => {
  const user = new User(req.body);

  try {
    const doc = await user.save();
    return res.status(200).json({ success: true, data: doc });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

// 로그인 엔드포인트
app.post('/api/users/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
    }

    const tokenUser = await user.generateToken();
    res.cookie("x_auth", tokenUser.token)
      .status(200)
      .json({ loginSuccess: true, userId: tokenUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// 인증 엔드포인트
app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role
  });
});

// 로그아웃
app.get('/api/users/logout', auth, async (req, res) => {
  try {
    // 토큰을 null로 설정하여 로그아웃 처리
    await User.findOneAndUpdate({ _id: req.user._id }, { token: null });
    
    // 클라이언트 쿠키에서 토큰 제거
    res.clearCookie("x_auth").status(200).json({ success: true, message: "로그아웃되었습니다." });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});
