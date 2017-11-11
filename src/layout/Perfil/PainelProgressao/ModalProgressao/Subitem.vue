<script>
export default {
    props: ['subitem', 'temConquista']
}
</script>

<template>
    <div class="subitem">
        <h4>
            <i v-if="temConquista" class="fa fa-star text-warning" aria-hidden="true"></i>
            <i v-else class="fa fa-star-o text-warning" aria-hidden="true"></i>
            {{subitem['.value']}}
        </h4>
    </div>
</template>