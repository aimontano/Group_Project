import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  created: () => {
    var config = {
      apiKey: "AIzaSyCRH7OssgQNvmjhEU7NSwq2E7AtqluVo3k",
      authDomain: "donde-93412.firebaseapp.com",
      databaseURL: "https://donde-93412.firebaseio.com",
      projectId: "donde-93412",
      storageBucket: "donde-93412.appspot.com",
      messagingSenderId: "639293267817"
    };
    firebase.initializeApp(config);
    console.log(config)
  }
}).$mount('#app')
