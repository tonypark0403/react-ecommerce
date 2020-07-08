import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/index.js';
const saltRounds = 10; // make a salt having 10 length.

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: String,
  tokenExp: Number,
});

userSchema.pre('save', function (next) {
  let user = this;
  console.log(user);
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hashPassword) => {
        if (err) return next(err);

        user.password = hashPassword;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  const user = this;
  user.token = jwt.sign(user._id.toHexString(), config.secretToken);
  user.save((err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  const user = this;
  if (!token) cb(new Error('no token'));
  jwt.verify(token, config.secretToken, (err, decodedUserId) => {
    if (err) cb(err);
    user.findOne({ _id: decodedUserId, token: token }, (err, user) => {
      if (err) cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

export default User;
