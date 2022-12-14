<template>
    <div class="container">Results</div>
    <FrequentChats :data="data['frequent_contacts']['list']"/>
</template>
<script>
import FrequentChats from "@/components/charts/FrequentChats.vue"
export default {
    name: 'ResultSection',
    props: {
        data: Object,
    },
    components: {
        FrequentChats
    },
    data() {
        return {
        }
            
    },
    methods: {
    },
    mounted() {
        console.log(this.data)
    }
}
</script>