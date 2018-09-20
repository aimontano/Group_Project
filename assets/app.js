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

const auth = firebase.auth(); // auth reference
const db = firebase.database(); // database reference
const usersRef = db.ref('/users'); // users reference
let connectedRef = db.ref('.info/connected'); // user connection reference


let userEmail; // stores current logged user
let userID;  // stores current user id

// reset inputs
const resetInputs = () => {
	$('#userEmail').val('');
	$('#userPassword').val('');
}

// function displays register page
displayRegisterPage = () => {
	$('#main-content').load('./templates/register.html');
}

// funtion display profile page
const displayProfile = (displayName) => {
	$("#main-content").load("./templates/profile.html" ,function(){
		$('#userInfo').text(displayName); 
	});
}

// functions registers a users
const registerUser = (fName, lName, email, uid) => {
  let user = usersRef.child('/' + uid); // sets user unique id
  user.set({
		firstName: fName,
		lastName: lName, 
		email: email,
		isOnline: true,
		coordinates: {
			lat: 0,
			long: 0
		},
		uid: uid  	// todo: debate whether is a good idea to have two reference of uid or not
  });
}

// login click handler
$('#btnLogin').click(e => {
	e.preventDefault();

	let email = $('#userEmail').val().trim();
	let password = $('#userPassword').val().trim();
	// if user has entered password and email
	if (email != '' && password != '' ) {
		const promise = auth.signInWithEmailAndPassword(email, password); // sign them in
		promise.catch(e => { // else show them an error message
			$('#message').text(e.message);
		});
	} else {
		alert("You must enter email & password!");
	}

	resetInputs();
});

// sign up click handler
$('#btnSignUp').click(e => {
	e.preventDefault();

	let email = $('#userEmail').val().trim();
	let password = $('#userPassword').val().trim();

	if (email != '' && password != '' ) {
		const promise = auth.createUserWithEmailAndPassword(email, password); // create user on firebase
		promise.catch(e => {
			$('#message').text(e.code); // if user exists notify user
		});
		// displayRegisterPage();
	} else {
		alert("You must enter email & password!");
	}
	resetInputs();
});

// register click handler
$(document).on('click', '#btnRegister', e => {
	e.preventDefault();

	let firstName = $('#userName').val().trim();
	let lastName = $('#lastName').val().trim();

	if(firstName != '' && lastName != '') {
		registerUser(firstName, lastName, userEmail, userID); // register users' information
		let displayName = firstName + " " + lastName;
		auth.currentUser.updateProfile({ // update current user display name
			displayName: displayName
		});
		displayProfile(displayName); // render profile page
	} else {
		alert("You must enter your first and last name");
	}
});

// logout handler
$(document).on('click', '#logout', e => {
	auth.signOut(); // sign user out
	window.location.href = './index.html'; // render login page
})

// google sign in hanlder
$('#btnGoogle').click(e => {
	e.preventDefault();
	var provider = new firebase.auth.GoogleAuthProvider();
	// redirects user to google log in page
	auth.signInWithPopup(provider).then(snap => {
		let firstName = snap.additionalUserInfo.profile.given_name;
		let lastName = snap.additionalUserInfo.profile.family_name;
		let uid = snap.user.uid;
		registerUser(firstName, lastName, snap.user.email, uid);
	});
});

// anonymous sign in hanlder
$('#btnAnonymous').click(e => {
	e.preventDefault();
	auth.signInAnonymously().catch( e => {
		console.log(e.message);
	})

});

// Checks user state
auth.onAuthStateChanged(user => {

	if(user) { // user logged in
		// console.log(user)
 		// if signed  in anonymously
		connectedRef.on('value', function(snap){
		  if(snap.val()){
		    let connection = usersRef.child(user.uid); // reference to unique user that's present
		    connection.update({isOnline: true}); // update database to show user is present

		    connection.onDisconnect().update({ // when disconnected update database 
		    	isOnline: false
		    })
		  } 
		}); 

		// if logged in anonymously
		if(user.isAnonymous) { // load user page
			displayProfile();
		} 
		
		// if user has display name
		if(user.displayName != null)
			displayProfile(user.displayName);  // display profile page

		if(user.displayName == null ) { // is logged user doesn't have a display name
			userEmail = user.email;
			userID = user.uid;
			displayRegisterPage();// ask for first and last name - display register page
		} 
		
		console.log("Logged In");
	} else {
		console.log("Not Logged in");
	}
});


