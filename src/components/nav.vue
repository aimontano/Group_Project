<template>
    <div class="row">
        <div class="col-12" id="navbar-column">
            <nav class="navbar navbar-light bg-light">
                <span class="navbar-brand mb-0 h1">{{ title }}</span>
            </nav> 
        </div>
    </div>

</template>

<script>

export default {
    name: 'Nav',
    data() {
        return {
            title: 'Donde'
        }
    }
}

</script>

<style scoped>

</style>