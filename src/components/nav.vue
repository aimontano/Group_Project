<template>
    
    <nav class="navbar navbar-light bg-light">
        <span class="navbar-brand mb-0 h1">{{ title }}</span>
        <button v-on:click.prevent="showChat = !showChat; $emit('toggle-chat', showChat)" class="btn btn-danger">Chat</button>
        <button v-on:click.prevent="showUserList = !showUserList; $emit('toggle-user-list', showUserList)" class="btn btn-primary" type="button">Users: <span class="badge badge-light badge-pill">{{ users }}</span></button>
    </nav> 

</template>

<script>

export default {
    name: 'Nav',
    props: ['users'],
    data() {
        return {
            title: 'Donde',
            showUserList: false,
            showChat: false
        }
    }
}

</script>

<style scoped>

</style>

