<template>

    <div class="row justify-content-md-center">
        <div class="col-md-6">
            <h2 class="text-center">{{ title }}</h2>
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
                <div class="form-group">
                    <label for="address">Address (optional)</label>
                    <input v-model="address" type="text" class="form-control" id="address">
                </div>

                <div id="interestDiv">
                
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="interest">Add interests</label>
                        <input v-model="interests" type="text" class="form-control" id="interest">
                    </div>	
                    <div class="form-group col-md-6">
                        <br>
                        <button class="btn btn-outline-primary mt-2" id="btnAddInterest">Add Interest</button>	
                    </div>
                </div>

                <div class="form-group">
                    <label>Upload picture/select an avatar (optional)</label>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <button class="btn btn-outline-primary btn-block" id="btnUpload">Upload Picture</button>
                    </div>
                    <div class="form-group col-md-6">
                        <button class="btn btn-outline-primary btn-block" id="btnAvatar">Choose Avatar</button>
                    </div>
                </div>
                <hr>
                <button v-on:click.prevent="registerUser()" class="btn btn-outline-primary btn-lg btn-block" id="btnRegister">Register</button>
            </form>					
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
            interests: ''
        }
    },
    props: ['email'],
    methods: {
        registerUser: function(name, lastName, email) {
            const db = firebase.database();
            const userId = firebase.auth().currentUser.uid;
            const userRef = db.ref('/users/' + userId);

            userRef.once('value').then((snapshot) => {
                console.log(snapshot.val());
            });

            userRef.set({
                userName: this.name,
                lastName: this.lastName,
                email: this.email
            });
        }
    }
}

// const auth = firebase.auth();
// const db = firebase.database();

// const usersRef = db.ref('/users');

// let currentUserEmail; // stores current logged user

// const registerUser = (name, lastName, email) => {
// 	usersRef.push({
// 		userName: name,
// 		lastName: lastName,
// 		email: email
// 	});
// }

</script>