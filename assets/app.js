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

const usersRef = db.ref('/users');

let currentUserEmail; // stores current logged user

// reset inputs
const resetInputs = () => {
	$('#userEmail').val('');
	$('#userPassword').val('');
}

// check if user exist through email
const userExist = userEmail => {
	// db.ref('/users/').on('child_added', snap => {
	

	// 	if(snap.val().email == userEmail){
	// 		console.log("user exist");
	// 	} else {
	// 		$('#main-content').load('./templates/register.html');
	// 		console.log("User not registered!");
	// 	}
	// })
	usersRef.orderByChild('email').equalTo(userEmail).once('child_added', snap => {
		if(snap.val()){
			console.log("User exists");
		} else {
			console.log("User doesn't exist");
		}
	})

}

// functions registers a users
const registerUser = (name, lastName, email) => {
	usersRef.push({
		userName: name,
		lastName: lastName,
		email: email
	});
}

// login click handler
$('#btnLogin').click(e => {
	e.preventDefault();

	let email = $('#userEmail').val().trim();
	let password = $('#userPassword').val().trim();

	const promise = auth.signInWithEmailAndPassword(email, password);
	promise.catch(e => {
		$('#message').text(e.message);
	});

	// resetInputs();
});

// sign up click handler
$('#btnSignUp').click(e => {
	e.preventDefault();

	let email = $('#userEmail').val().trim();
	let password = $('#userPassword').val().trim();

	const promise = auth.createUserWithEmailAndPassword(email, password);
	promise.catch(e => {
		console.log(e.code)
		$('#message').text(e.code);

	});
	$('#main-content').load('./templates/register.html');
	// resetInputs();
});

// register click handler
$(document).on('click', '#btnRegister', e => {
	e.preventDefault();

	let userName = $('#userName').val().trim();
	let lastName = $('#lastName').val().trim();

	registerUser(userName, lastName, currentUserEmail);
});

// Checks user state
auth.onAuthStateChanged(user => {
	if(user) {
		currentUserEmail = user.email;
		userExist(currentUserEmail);
		console.log("Logged In")
	} else {
		console.log("Not Logged in");
	}
});


