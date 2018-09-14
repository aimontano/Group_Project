<template>

    <div class="container mt-5" id="main-content">
        <div class="row justify-content-md-center">
            <div class="col-md-6">
                <h2 class="text-center">{{ title }}</h2>
                <p class="lead text-danger" id="message"></p>
                <form>
                    <div class="form-group">
                        <label for="userEmail">{{ email }}</label>
                        <input v-model="emailValue" type="email" id="userEmail" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="userPassword">{{ password }}</label>
                        <input v-model="passwordValue" type="password" id="userPassword" class="form-control">
                    </div>
                    <button v-on:click="resetInputs()" class="btn btn-primary" id="btnLogin">{{ login }}</button>
                    <button v-on:click="resetInputs()" class="btn btn-info float-right" id="btnSignUp">{{ signUp }}</button>
                </form>					
            </div>
        </div>
    </div>

</template>


<script>

export default {
    name: 'Login',
    data() {
        return {
            title: 'Login',
            email: 'Email',
            password: 'Password',
            login: 'Login',
            signUp: 'Sign Up',
            emailValue: '',
            passwordValue: ''
        }
    },
    methods: {
        resetInputs: () => {
            this.emailValue = ''
            this.passwordValue = ''
        },
        userExist: userEmail => {
            usersRef.orderByChild('email').equalTo(userEmail).once('child_added', snap => {

            })
        }
    }
}

// const auth = firebase.auth();
// const db = firebase.database();

// const usersRef = db.ref('/users');

let currentUserEmail; // stores current logged user

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
			$('#main-content').load('./templates/profile.html', () =>{
				$('#userInfo').text(snap.val().userName + " " + snap.val().lastName);
			});
		} else {
			console.log("User doesn't exist");
		}
	})

}




</script>