// Initialize Firebase
const config = {
    apiKey: "AIzaSyB9S-mCQGEi097jF4ZuSCKacRifBAhSOrw",
    authDomain: "donde-chat.firebaseapp.com",
    databaseURL: "https://donde-chat.firebaseio.com",
    projectId: "donde-chat",
    storageBucket: "donde-chat.appspot.com",
    messagingSenderId: "916819442348"
};
firebase.initializeApp(config);

const auth = firebase.auth();
auth.signInWithEmailAndPassword(email, pass);
auth.createUserWithEmailAndPassword(email, pass);
auth.onAuthStateChanbged(firebaseUser => { });

$("#register-form-link").on("click", function () {
    $("#login-form").style("display", "hidden");
    $("#register-form-link").attr("class", "active");
    $("#register-form").style("display", "visible");
});

