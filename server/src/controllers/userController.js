import * as userService from '../services/userService.js';
import User from '../models/User.js';

export const register = (req, res) => {
  userService
    .register(req.body)
    .then((result) => {
      res.status(200).json({
        success: result,
      });
    })
    .catch((result) => {
      res.json({ success: result });
    });
};

export const login = (req, res) => {
  userService
    .login(req.body)
    .then((user) => {
      res.cookie('x_auth', user.token).status(200).json({
        loginSuccess: true,
        userId: user._id,
      });
    })
    .catch((message) => {
      res
        .cookie('x_auth', null)
        .status(400)
        .json({ loginSuccess: false, message });
    });
};

export const afterAuth = (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
};

export const logout = (req, res) => {
  userService
    .logout(req.user)
    .then((user) => {
      res.clearCookie('x_auth');
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      });
    });
};
