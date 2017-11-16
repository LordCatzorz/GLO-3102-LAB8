<template>
  <div>
    <login></login>
    <div>
      <h4>or</h4>
    </div>
    <sign-up></sign-up>
  </div>

</template>

<script>
  import Login from '@/components/login/Login';
  import SignUp from '@/components/login/SignUp';

  export default {
    name: 'LoginPage',
    components: {
      'login': Login,
      'sign-up': SignUp
    }
  }
</script>

<style>

</style>
