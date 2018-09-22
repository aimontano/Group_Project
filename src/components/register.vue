<template>

    <div class="container mt-5" id="register-content">
        <div class="row justify-content-md-center">
            <div class="col-md-6">
                <h2 class="text-center">{{ title }}</h2>
                <p class="lead text-danger" id="message">{{ userMessage }}</p>
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="userName">Name</label>
                            <input v-model="name" type="text" id="userName" class="form-control">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="lastName">Last Name</label>
                            <input v-model="lastName" type="text" id="lastName" class="form-control">
                        </div>
                    </div> 
                </form> 
            </div>

                <button v-on:click.prevent="registerUser()" class="btn btn-outline-primary btn-lg btn-block" id="btnRegister">Register &#38; Login</button>
                                
        </div>
    </div>

</template>

<script>

export default {
    name: 'Register',
    data() {
        return {
            title: 'Register',
            name: '',
            lastName: '',
            address: '',
            interests: '',
            userMessage: ''
        }
    },
    props: ['email'],
    methods: {
        registerUser: function(name, lastName, email) {
            if (this.name != '' && this.lastName != '') {
                const db = firebase.database();
                const userId = firebase.auth().currentUser.uid;
                const userRef = db.ref('/users/' + userId);

                userRef.once('value').then((snapshot) => {
                    // console.log(snapshot.val());
                });

                userRef.set({
                    userName: this.name,
                    lastName: this.lastName,
                    email: this.email
                });
                this.$router.push({ path: '/home' });
            }
            else {
                this.userMessage = 'You Must Enter Your First And Last Name';
            } 
        }
    }
}

</script>