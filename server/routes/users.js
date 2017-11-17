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

function getUserByToken(token) {
    return allUsers.filter(function(user) {
        return user.token === token;
    });
}

function getCurrentTime() {
    return (new Date).getTime();
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
              token: newToken,
              tokenCreationTime: getCurrentTime()
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
                token: newToken,
                tokenCreationTime: getCurrentTime()
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
};

exports.getUserByToken = function (req, res) {
    var token = req.query.token;
    console.log('Get user by token with ' + token);
    if (token === undefined
        || typeof token !== 'string'
        || token === '') {
        res.status(412).send({
            errorCode: 'INVALID_REQUEST',
            message: 'Invalid token'
        });
    } else {
        var matchedUsers = getUserByToken(token);
        if (matchedUsers.length === 1) {
            res.status(200).send({
                username: matchedUsers[0].username
            });
        } else if (matchedUsers.length === 0) {
            res.status(403).send({
                errorCode: 'USER_NOT_FOUND',
                message: 'A user with this token does not exists'
            })
        } else {
            // Mathematically impossible
            console.log('!!WARNING!! Duplicate token!');
            res.status(409).send({
                errorCode: 'TOO_MUCH_USERS',
                message: 'Something went real bad'
            })
        }
    }
};