<script>
export default {
    props: ['titulo']
}
</script>

<template>
    <div class="item text-center">
        <h3>
            <i class="fa fa-trophy" aria-hidden="true"></i>
            {{titulo}}
            <i class="fa fa-trophy" aria-hidden="true"></i>
        </h3>
    </div>
</template>

<style scoped>
.item{
    background-color: rgba(86, 64, 46, 1);
    border: 1px solid;
    color: #EACF9B;
    border-color: #EACF9B;
    font-family: claire;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 15px;
}
</style>