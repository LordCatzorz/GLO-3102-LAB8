import * as constantes from '@/assets/Constantes';

function getApiAddress() {
  return constantes.API_ADDRESS;
}

function getUsersAddress() {
  return `${getApiAddress()}users`;
}

function getLoginAddress() {
  return `${getApiAddress()}login`;
}

function getUserFromTokenAddress(token) {
  return `${getUsersAddress()}?token=${token}`;
}

export function CreateUserASync(username, password) {
  const myBody = {
    username: username,
    usernamepassword: btoa(`${username}:${password}`)
  };

  const myHeader = new Headers({
    'content-type': 'application/json'
  });


  const myInit = {
    method: 'POST',
    headers: myHeader,
    body: JSON.stringify(myBody)
  };

  const myRequest = new Request(getUsersAddress(), myInit);


  return fetch(myRequest);
}

export function GetUserFromLoginAsync(username, password) {
  const myBody = {
    usernamepassword: btoa(`${username}:${password}`)
  };

  const myHeader = new Headers({
    'content-type': 'application/json'
  });


  const myInit = {
    method: 'POST',
    headers: myHeader,
    body: JSON.stringify(myBody)
  };

  const myRequest = new Request(getLoginAddress(), myInit);

  return fetch(myRequest);
}

export function GetUserFromTokenAsync(token) {
  const myInit = {
    method: 'GET'
  };

  const myRequest = new Request(getUserFromTokenAddress(token), myInit);

  return fetch(myRequest);
}
