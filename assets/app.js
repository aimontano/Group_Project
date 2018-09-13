// Initialize Firebase
var config = {
  apiKey: "AIzaSyCRH7OssgQNvmjhEU7NSwq2E7AtqluVo3k",
  authDomain: "donde-93412.firebaseapp.com",
  databaseURL: "https://donde-93412.firebaseio.com",
  projectId: "donde-93412",
  storageBucket: "donde-93412.appspot.com",
  messagingSenderId: "639293267817"
};
firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.database();

const resetInputs = () => {
	$('#userEmail').val('');
	$('#userPassword').val('');
}

const userExist = userEmail => {
	db.ref('/users/').once('value').then(snap => {
		if(snap.val()){

		} else {
			// window.location.href = 'https://google.com';
			console.log("User not registered!");
		}
	})
}

$('#btnLogin').click(e => {
	e.preventDefault();

	let email = $('#userEmail').val().trim();
	let password = $('#userPassword').val().trim();

	const promise = auth.signInWithEmailAndPassword(email, password);
	promise.catch(e => console.log(e.message));

	// resetInputs();
});

$('#btnSignUp').click(e => {
	e.preventDefault();

	let email = $('#userEmail').val().trim();
	let password = $('#userPassword').val().trim();

	const promise = auth.createUserWithEmailAndPassword(email, password);
	promise.catch(e => console.log(e.code));
	// resetInputs();
})


auth.onAuthStateChanged(user => {
	if(user) {
		userExist(user.email);
		console.log("Logged In")
	} else {
		console.log("Not Logged in");
	}
})