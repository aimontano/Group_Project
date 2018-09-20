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

let userEmail; // stores current logged user
let userID; 
var user = firebase.auth().currentUser;

// reset inputs
const resetInputs = () => {
	$('#userEmail').val('');
	$('#userPassword').val('');
}

// check if user exist through email
const userExist = userEmail => {
	usersRef.orderByChild('email').equalTo(userEmail).once('child_added', snap => {
		if(snap.val()){
			console.log("User exists");
			$('#main-content').load('./templates/profile.html', () =>{
				$('#userInfo').text(snap.val().userName + " " + snap.val().lastName);
			});
		} else {
			$('#main-content').load('./templates/register.html');
		}
	})
}

const displayRegisterPage = () => {
	$('#main-content').load('./templates/register.html');
}

const displayProfile = (displayName) => {
	$("#main-content").load("./templates/profile.html" ,function(){
		$('#userInfo').text(displayName); 
	});
}

// functions registers a users
const registerUser = (fName, lName, email, uid) => {

  let user = usersRef.child('/' +uid);
  user.set({
		firstName: fName,
		lastName: lName, 
		email: email,
		isOnline: true,
		coordinates: {
			lat: 0,
			long: 0
		},
		uid: uid  	
  });

}


// login click handler
$('#btnLogin').click(e => {
	e.preventDefault();

	let email = $('#userEmail').val().trim();
	let password = $('#userPassword').val().trim();

	if (email != '' && password != '' ) {
		const promise = auth.signInWithEmailAndPassword(email, password);
		promise.catch(e => {
			$('#message').text(e.message);
		});
	} else {
		alert("You must enter email & password!");
	}

	// resetInputs();
});

// sign up click handler
$('#btnSignUp').click(e => {
	e.preventDefault();

	let email = $('#userEmail').val().trim();
	let password = $('#userPassword').val().trim();

	if (email != '' && password != '' ) {
		const promise = auth.createUserWithEmailAndPassword(email, password);
		promise.catch(e => {
			$('#message').text(e.code);
		});
		displayRegisterPage();
	} else {
		alert("You must enter email & password!");
	}
	// resetInputs();
});

// register click handler
$(document).on('click', '#btnRegister', e => {
	e.preventDefault();

	let firstName = $('#userName').val().trim();
	let lastName = $('#lastName').val().trim();

	if(firstName != '' && lastName != '') {
		registerUser(firstName, lastName, userEmail, userID);
		let displayName = firstName + " " + lastName;
		auth.currentUser.updateProfile({
			displayName: displayName
		});
	} else {
		alert("You must enter your first and last name");
	}
});

$(document).on('click', '#logout', e => {
	// e.preventDefault();

	auth.signOut();
	window.location.href = './index.html';
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

const isUser = (uid) => {
	db.ref('/users').on('child_added', snap  => {
		console.log(snap.val());
	});
}

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
		if(user.isAnonymous) { // load user page
			$('#main-content').load('./templates/profile.html', () => {
				$('#userInfo').text("Random Person"); // display randomperson message
			});
		} 
		
		userExist(user.email);

		if(user.displayName == null ) {
			userEmail = user.email;
			userID = user.uid;
			displayRegisterPage();
		} else {
			displayProfile(user.displayName);
		}


		console.log("Logged In");
	} else {
		console.log("Not Logged in");
	}
});


