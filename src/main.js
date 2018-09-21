import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Routes from './routes'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBXERsAFMf5LFPggyP1uxEAZAyq9gEp65A',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
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
