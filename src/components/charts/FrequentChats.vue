<template>
    <div class="form-group col-12 col-sm-6 mx-auto p-2">
        <select class="form-select" v-model="selected" @change="changeCount">
            <option>5</option>
            <option>10</option>
            <option>20</option>
        </select>
    </div>
    <Bar id="Top Chats" :options="chartOptions" :data="chartData" :Title="'Top Chat'" />

    <h3 class="Title fw-bold mt-4"> Top 3</h3>
    <div class="row p-4">
        <div class="col-sm-4 col-12 mx-auto pb-4" v-for="(chat,index) in data.slice(0,3)" :key="chat.name">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Position: {{index+1}}</h5>
                    <h6> Name: <b>{{chat.name}}</b></h6>
                    <p class="card-text">Chat Rating: <b>{{chat.rating}}</b></p>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'ResultSection',
    props: {
        data: Object,
    },
    components: {
        Bar,
    },
    data() {
        return {
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
        changeCount() {
            console.log(this.selected)
        },

    },
    computed: {
        chartData() {
            var fcLabels = []
            var fcData = []
            try {
                for (var i = 0; i < this.selected; i++) {
                    fcLabels.push(this.data[i].name)
                    fcData.push(this.data[i].rating)
                }
            }
            catch (err) {
                console.log(err)
            }

            return {
                labels: fcLabels,
                datasets: [  {label:"Chat Rating", backgroundColor:'rgba(75, 192, 192, 0.5)', data: fcData }]
            }
        }
        
    },
    mounted() {
        console.log(this.data)
    }
}
</script>