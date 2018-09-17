<template>
    <div class="row">
        <div class="col-12" id="navbar-column">
            <nav class="navbar navbar-light bg-light">
                <span class="navbar-brand mb-0 h1">{{ title }}</span>
                <button class="btn btn-primary" type="button">Users: <span class="badge badge-light badge-pill">{{ users }}</span></button>
            </nav> 
        </div>
    </div>

</template>

<script>

export default {
    name: 'Nav',
    data() {
        return {
            title: 'Donde',
            users: 0
        }
    }
}

</script>

<style scoped>

</style>