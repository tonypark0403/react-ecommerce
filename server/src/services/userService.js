import User from '../models/User.js';

export const register = (user) => {
  const newUser = new User(user);
  return new Promise((resolve, reject) => {
    newUser.save((err, doc) => {
      if (err) {
        reject(false);
        return;
      }
      resolve(true);
    });
  });
};

export const login = (user) => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        email: user.email,
      },
      (err, userData) => {
        if (err) {
          return reject(err);
        }
        if (!userData) {
          return reject('No user!');
        }
        userData.comparePassword(user.password, (err, isMatch) => {
          if (!isMatch) {
            return reject('Wrong password!!!');
          }
          userData.generateToken((err, user) => {
            if (err) return reject(err);
            return resolve(user);
          });
        });
      }
    );
  });
};

export const logout = (user) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: user._id }, { token: '' }, (err, user) => {
      if (err) return reject(err);
      return resolve(user);
    });
  });
};
