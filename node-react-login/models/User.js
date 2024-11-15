const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

// 비밀번호 암호화
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 비밀번호 비교 메서드
userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

// 토큰 생성 메서드
userSchema.methods.generateToken = function () {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  return user.save().then(() => user);
};

// 토큰을 통해 유저를 찾는 findByToken 메서드 정의
userSchema.statics.findByToken = function(token) {
  const user = this;
  try {
    const decoded = jwt.verify(token, 'secretToken');
    return user.findOne({ _id: decoded, token });
  } catch (error) {
    return null;
  }
};


module.exports = mongoose.model('User', userSchema);
