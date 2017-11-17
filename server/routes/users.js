var crypto = require('crypto');

var allUsers = [];


function getUserByUsername(username) {
    return allUsers.filter(function(user) {
        return user.username === username;
    });
}

function getUserByUsernamePassword(usernamePassword) {
    return allUsers.filter(function(user) {
        return user.usernamepassword === usernamePassword;
    });
}

exports.createUser = function (req, res) {
  console.log('Create user');
  if (req.body.usernamepassword === undefined || req.body.username === undefined
      || typeof req.body.usernamepassword !== 'string' || typeof req.body.username !== 'string'
      || req.body.usernamepassword === '' || req.body.username === '') {
      res.status(412).send({
          errorCode: 'INVALID_REQUEST',
          message: 'Invalid Username/password combination'
      })
  } else {
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

exports.getUserByLogin = function (req, res) {
    console.log('Get user by login');
    if (req.body.usernamepassword === undefined
        || typeof req.body.usernamepassword !== 'string'
        || req.body.usernamepassword === '') {
        res.status(412).send({
            errorCode: 'INVALID_REQUEST',
            message: 'Invalid Username/password combination'
        });
    } else {
        var matchedUsers = getUserByUsernamePassword(req.body.usernamepassword);
        if (matchedUsers.length > 0) {
            var user = matchedUsers[0];
            var newToken = crypto.randomBytes(48).toString('hex');

            var newUserConnection = {
                username: user.username,
                usernamepassword: user.usernamepassword,
                token: newToken
            };

            allUsers.push(newUserConnection);

            res.status(201).send({
                token: newToken
            })
        } else {
            res.status(403).send({
                errorCode: 'USER_NOT_FOUND',
                message: 'A user with this password does not exists'
            })
        }
    }
}