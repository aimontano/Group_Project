<template>
  <div id="app">
    <login></login>
  </div>
</template>

<script>
import Login from './components/login'

export default {
  name: 'app',
  data() {
    return {
      currentPage: 'Login'
    }
  },
  components: {
    Login
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
