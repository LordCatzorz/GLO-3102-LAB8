<template>
  <div>
    <h1>Sign up</h1>
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
      <input type="button" value="Sign Up" v-on:click='launchSignUp()'>
    </div>
  </div>
</template>

<script>

  import { CreateUserASync } from '@/assets/api/lab8'
  import Cookie from 'js-cookie'

  export default {
    name: 'SignUp',
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

        if (this.password.length < 8) {
          valid = false;
          this.errors.push('Password must be at least 8 characters long');
        }
        return valid;
      },
      launchSignUp() {
        if (this.validateForm()) {
          CreateUserASync(this.username, this.password).then((response) => {
            console.log(response);
            if (response.ok) {
              return response.json();
            } else {
              if (response.status === 409) {
                throw 'Username taken';
              } else {
                throw 'An error occurred while creating this user';
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
  .errors {
    color: rgba(255,0,0,1);
  }
</style>
