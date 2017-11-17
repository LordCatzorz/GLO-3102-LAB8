<template>
  <div>
    <h1>Login</h1>
    <div class="errors" v-for="anError in this.errors">
      {{ anError }}
    </div>
    <div>
      <label>Username: <input type="text" v-model="username"/></label>
    </div>
    <div>
      <label>Password: <input type="password" autocomplete="new-password" v-model="password"/></label>
    </div>
    <div>
      <input type="button" value="Login" v-on:click='launchLogin()'>
    </div>
  </div>
</template>

<script>
  import { GetUserAsync } from '@/assets/api/lab8'
  import Cookie from 'js-cookie'

  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        errors: []
      }
    },
    methods: {
      validateForm() {
        let valid = true;
        this.errors = [];
        if (this.username.length === 0) {
          valid = false;
          this.errors.push('Username required');
        }

        if (this.password.length === 0) {
          valid = false;
          this.errors.push('Password required');
        }
        return valid;
      },
      launchLogin() {
        if (this.validateForm()) {
          GetUserAsync(this.username, this.password).then((response) => {
            console.log(response);
            if (response.ok) {
              return response.json();
            } else {
              if (response.status === 403) {
                throw 'No match for this username/password';
              } else {
                throw 'An error occurred while login for this user';
              }
            }
          }).then((data) => {
            Cookie.set('userToken', data.token, {expires: 1});
            this.$router.push('UserProfile');
          }).catch((error) => {
            if (typeof error === 'string') {
              this.errors.push(error);
            } else {
              this.errors.push('An error occurred');
              console.log(error);
            }
          })
        }
      }
    }
  }
</script>

<style>

</style>
