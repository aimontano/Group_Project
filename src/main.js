import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Routes from './routes'

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router: router,
  created: () => {
    // var config = {
    //   apiKey: "AIzaSyCRH7OssgQNvmjhEU7NSwq2E7AtqluVo3k",
    //   authDomain: "donde-93412.firebaseapp.com",
    //   databaseURL: "https://donde-93412.firebaseio.com",
    //   projectId: "donde-93412",
    //   storageBucket: "donde-93412.appspot.com",
    //   messagingSenderId: "639293267817"
    // };
    // firebase.initializeApp(config);
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBIvDXDBSaV3DavZ24nMwEv_TyCZvAg39s",
      authDomain: "myproject-998de.firebaseapp.com",
      databaseURL: "https://myproject-998de.firebaseio.com",
      projectId: "myproject-998de",
      storageBucket: "myproject-998de.appspot.com",
      messagingSenderId: "181746070689"
    };
    firebase.initializeApp(config);
  }
}).$mount('#app')
