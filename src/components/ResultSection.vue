<template>
    <div class="container">result section</div>
</template>
<script>
export default {
    name: 'ResultSection',
    props: {
        data: String,
    },
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
    },
    mounted(){
        console.log(this.data)
    }
}
</script>