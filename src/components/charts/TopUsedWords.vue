<template>
    <div class="container">
        <div class="form-group col-12 col-sm-6 mx-auto p-2">
            <select class="form-select" v-model="selected" @change="changeCount">
                <option value="5"> Top 5</option>
                <option value="10">Top 10</option>
                <option value="20">Top 20</option>
                <option value="100">Top 100</option>
            </select>
        </div>
        <Bar id="Top Chats" class="charts" :options="chartOptions" :data="chartData" :Title="'Top Chat'" />

        <h3 class="Title fw-bold mt-4"> All Words</h3>
        <button type="button" class="btn btn-success" @click="showWords()">Show</button>
        <div class="text-center" v-if="show">
            <p v-for="word in data.used.slice(1,-1)" :key="word[0]">
                {{ word[0] }} : {{ word[1] }}
            </p>

        </div>
    </div>

</template>
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'TopUsedWords',
    props: {
        data: Object,
    },
    components: {
        Bar,
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
                        text: "Top Chats of All Time",
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
                for (var i = 0; i < this.selected; i++) {
                    fcLabels.push(this.data["used"][i][0])
                    fcData.push(this.data["used"][i][1])
                }
            }
            catch (err) {
                console.log(err)
            }

            return {
                labels: fcLabels,
                datasets: [{ label: "Frequency", backgroundColor: 'rgba(75, 192, 192, 0.5)', data: fcData }]
            }
        },

    },
    mounted() {
        console.log(this.data["used"][1])
    }
}
</script>