<template>
    <div class="container">Results</div>
</template>
<script>
export default {
    name: 'ResultSection',
    props: {
        data: Object,
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