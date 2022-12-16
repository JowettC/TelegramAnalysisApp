<template>
    <div class="container">
        <div class="form-check filter-option">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
        </div>
        <div class="form-group col-12 col-sm-6 mx-auto p-2">
            <select class="form-select" v-model="selected" @change="changeCount">
                <option value="5"> Top 5</option>
                <option value="10">Top 10</option>
                <option value="20">Top 20</option>
                <option value="100">Top 100</option>
            </select>
        </div>
        <Bar id="Top Chats" class="charts" :options="chartOptions" :data="chartData" :Title="'Top Chat'" />

        
        <!-- insert data table here -->
        <DataTableWords :data="data"/>
    </div>

</template>
<script>
import { Bar } from 'vue-chartjs'
import DataTableWords from './DataTableWords.vue'

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
    name: 'TopWords',
    props: {
        data: Object,
    },
    components: {
        Bar,
        DataTableWords,
    },
    data() {
        return {
            show: false,
            selected: 5,
            chartOptions: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: "Top Sent Words",
                    },
                },
            }
        }
    },
    methods: {
        showWords() {
            this.show = !this.show
        },
    },
    computed: {
        chartData() {
            var fcLabels = []
            var fcData = []
            try {
                for (var i = 1; i < this.selected; i++) {
                    fcLabels.push(this.data[i][0])
                    fcData.push(this.data[i][1])
                }
            }
            catch (err) {
                console.log(err)
            }

            return {
                labels: fcLabels,
                datasets: [{ label: "Frequency", backgroundColor: 'rgb(115, 147, 179,0.5)', data: fcData }]
            }
        },

    },
    mounted() {

    }
}
</script>
<style>
.table {
    max-width: none;
    table-layout: fixed;
    word-wrap: break-word;
}

.table_body {
    font-weight: 500;
}
.filter-option{
    max-width:300px;
    margin:auto;
}
</style>