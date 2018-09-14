<template>

    <div class="row justify-content-md-center">
        <div class="col-md-6">
            <h2 class="text-center">Register</h2>
            <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="userName">Name</label>
                        <input type="text" id="userName" class="form-control">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label for="address">Address (optional)</label>
                    <input type="text" class="form-control" id="address">
                </div>

                <div id="interestDiv" >

                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="interest">Add interests</label>
                        <input type="text" class="form-control" id="interest">
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
                <button class="btn btn-outline-primary btn-lg btn-block" id="btnRegister">Register</button>
            </form>					
        </div>
    </div>

</template>

<script>

export default {
    name: 'Login',
    data() {
        return {
            title: 'Login'
        }
    }
}

const auth = firebase.auth();
const db = firebase.database();

const usersRef = db.ref('/users');

let currentUserEmail; // stores current logged user


</script>