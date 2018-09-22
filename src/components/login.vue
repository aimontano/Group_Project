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
                    // console.log(e.code);
                    this.userMessage = e.message;

                });
                
            } else {
                this.userMessage = 'You must enter email & password!';
            }
        }
    }
}


</script>