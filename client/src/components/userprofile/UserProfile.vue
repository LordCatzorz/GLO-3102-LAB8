<template>
  <div>
    <h1>Hello</h1>
    <p>{{ userName }}</p>
  </div>

</template>

<script>

  export default {
    name: 'UserProfile',
    data() {
      return {
        userName: ''
      }
    }
  }

</script>

<style>

</style>
