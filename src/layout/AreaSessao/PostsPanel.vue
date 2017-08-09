<script>
import StPost from './PostsPanel/Post.vue'
var vm = {
    components: {
        StPost
    }
}
export default vm
</script>
<template>
    <st-post></st-post>
</template>

<style>
.panel-post {
    position: relative;
    border-radius: 30px;
    border: 1px solid #eacf9b;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    background-color: transparent;
    color:#eacf9b!important;
    border-radius: 30px;
}
.panel-post > .panel-body{
    padding-bottom: 0;
}
</style>