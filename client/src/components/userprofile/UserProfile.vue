<template>
  <div>
    <h1>Hello</h1>
    <p>{{ username }}</p>
    <div>
      <input type="button" value="Log out" v-on:click='launchLogout()'>
    </div>
  </div>

</template>

<script>
  import * as constantes from '@/assets/Constantes'
  import { GetUserFromTokenAsync } from '@/assets/api/lab8'
  import Cookie from 'js-cookie'

  export default {
    name: 'UserProfile',
    data() {
      return {
        username: ''
      }
    },
    methods : {
      goToLogin() {
        this.$router.push('Login');
      },
      launchLogout() {
        Cookie.remove(constantes.COOKIE_USER_TOKEN);
        this.goToLogin();
      },
      getUserFromToken(token) {
        GetUserFromTokenAsync(token).then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw 'Incorrect request'
          }
        }).then((data) => {
          this.username = data.username;
        }).catch((error) => {
          this.goToLogin();
        });
      }
    },
    created() {
      const token = Cookie.get('userToken');
      if (token === undefined) {
        this.goToLogin();
      } else {
        this.getUserFromToken(token);
      }
    }
  }

</script>

<style>

</style>
