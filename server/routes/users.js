var crypto = require('crypto');

var allUsers = [];


function getUserByUsername(username) {
    return allUsers.filter(function(user) {
        return user.username === username;
    });
}

exports.createUser = function (req, res) {
  console.log('Create user');
  if (req.body.usernamepassword === undefined || req.body.username === undefined
      || typeof req.body.usernamepassword !== 'string' || typeof req.body.username !== 'string'
      || req.body.usernamepassword === '' || req.body.username === '') {
      res.status(412).send({
          errorCode: 'INVALID_REQUEST',
          message: 'Valid Username/password combination required'
      })
  }  else {
      if (getUserByUsername(req.body.username).length > 0) {
          res.status(409).send({
              errorCode: 'USERNAME_ALREADY_EXISTS',
              message: 'User already exists'
          })
      } else {
          var newToken = crypto.randomBytes(48).toString('hex');
          var newUser = {
              username: req.body.username,
              usernamepassword: req.body.usernamepassword,
              token: newToken
          };

          allUsers.push(newUser);

          res.status(201).send({
            token: newToken
          });
      }
  }
};