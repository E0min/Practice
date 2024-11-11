const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { User } = require('./models/User');
const bodyParser = require('body-parser'); // bodyParser를 {bodyParser}가 아닌 bodyParser로 불러옴

// bodyParser 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 

// MongoDB 연결
mongoose.connect('mongodb+srv://bbok4yo:9JkqINUawFtCy0NX@cluster0.niola.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB Connected");
}).catch((err) => console.log(err));

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 회원가입 엔드포인트
app.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
