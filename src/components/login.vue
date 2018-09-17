<template>

    <div class="container mt-5" id="main-content">
        <div class="row justify-content-md-center">
            <div class="col-md-6">
                <h2 class="text-center">{{ title }}</h2>
                <p class="lead text-danger" id="message">{{ userMessage }}</p>
                <form>
                    <div class="form-group">
                        <label for="userEmail">Email</label>
                        <input v-model="emailValue" type="email" id="userEmail" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="userPassword">Password</label>
                        <input v-model="passwordValue" type="password" id="userPassword" class="form-control">
                    </div>
                    <button v-on:click.prevent="userLogin(); resetInputs()" class="btn btn-primary" id="btnLogin">Login</button>
                    <button v-on:click.prevent="userSignUp(); resetInputs()" class="btn btn-info float-right" id="btnSignUp">Sign Up</button>
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
            userMessage: '',
            emailValue: '',
            passwordValue: ''
        }
    },
    methods: {
        resetInputs: function() {
            this.emailValue = ''
            this.passwordValue = ''
        },
        // userExist: function(userEmail) {
        //     const db = firebase.database();
        //     const usersRef = db.ref('/users');

        //     usersRef.orderByChild('email').equalTo(userEmail).once('child_added', snap => {
        //         if(snap.val()){
        //             console.log('User Exists');
        //             this.$router.push({ path: '/main' });
        //         } else {
        //             console.log('User doesn\'t exist');
        //         }
        //     })
        // },
        userLogin : function(e) {
            const auth = firebase.auth();

            let email = this.emailValue.trim();
            let password = this.passwordValue.trim();

            if (email != '' && password != '' ) {
                const promise = auth.signInWithEmailAndPassword(email, password);
                promise.catch(e => {
                    this.userMessage = e.message;
                });
                promise.then((user) => {
                    this.$router.push({ path: '/home' });
                    console.log(user);
                });
            } else {
                this.userMessage = 'You must enter email & password!';
            }

        },
        userSignUp: function(e) {
            const auth = firebase.auth();

            let email = this.emailValue.trim();
            let password = this.passwordValue.trim();

            if (email != '' && password != '' ) {
                const promise = auth.createUserWithEmailAndPassword(email, password);
                promise.then(() => {
                    this.$router.push({ name: 'register', params: {email: email}});
                });
                promise.catch(e => {
                    console.log(e.code);
                    this.userMessage = e.message;

                });
                
            } else {
                this.userMessage = 'You must enter email & password!';
            }
        }
    }
}

// const auth = firebase.auth();
// const db = firebase.database();

// const usersRef = db.ref('/users');

let currentUserEmail; // stores current logged user

// const userExist = userEmail => {
	// db.ref('/users/').on('child_added', snap => {
	

	// 	if(snap.val().email == userEmail){
	// 		console.log("user exist");
	// 	} else {
	// 		$('#main-content').load('./templates/register.html');
	// 		console.log("User not registered!");
	// 	}
	// })
	// usersRef.orderByChild('email').equalTo(userEmail).once('child_added', snap => {
	// 	if(snap.val()){
	// 		console.log("User exists");
	// 		$('#main-content').load('./templates/profile.html', () =>{
	// 			$('#userInfo').text(snap.val().userName + " " + snap.val().lastName);
	// 		});
	// 	} else {
	// 		console.log("User doesn't exist");
	// 	}
	// })

// }





</script>