<template>
  
    <router-view></router-view>

</template>

<script>
import Login from './components/login'
import Routes from './routes'

export default {
  name: 'app',
  data() {
    return {
      // currentPage: 'Login'
    }
  },
  components: {
    // Login
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
html, body {
    height: 100%;
}
</style>
