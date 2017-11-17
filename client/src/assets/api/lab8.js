import * as constantes from '@/assets/Constantes';

function getApiAddress() {
  return constantes.API_ADDRESS;
}

function getUsersAddress() {
  return `${getApiAddress()}users`;
}

export function CreateUserASync(username, password) {

  const myBody = {
    username: username,
    usernamepassword: btoa(`${username}:${password}`)
  }

  const myHeader = new Headers({
    'content-type': 'application/json'
  });


  const myInit = {
    method: 'POST',
    headers: myHeader,
    body: JSON.stringify(myBody)
  }

  const myRequest = new Request(getUsersAddress(), myInit);


  return fetch(myRequest);
}
