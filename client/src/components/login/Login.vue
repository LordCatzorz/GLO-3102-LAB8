<template>
  <div>
    <h1>Login</h1>
    <div>
      <label>Username: <input type="text" autocomplete="username"/></label>
    </div>
    <div>
      <label>Password: <input type="password" autocomplete="current-password"/></label>
    </div>
    <div>
      <input type="button" value="Login"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login'
  }
</script>

<style>

</style>
