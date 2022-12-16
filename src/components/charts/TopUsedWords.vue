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
        <div class="container">
            <table class="table table-sm table-hover mb-0">
                <thead class="table-info bg-opacity-25">
                    <tr>
                        <th scope="col" class="ps-4">Words</th>
                        <th scope="col">Counts</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="word in data['used']" :key="word[0]">
                        <td class="ps-4">{{ word[0] }}</td>
                        <td>{{ word[1] }}</td>
                    </tr>
                </tbody>
            </table>

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
                datasets: [{ label: "Frequency", backgroundColor: 'rgb(255, 99, 132,0.5)', data: fcData }]
            }
        },

    },
    mounted() {
        console.log(this.data["used"][1])
        document.ready(function () {
            document.getElementById('#dtBasicExample').DataTable();
            document.getElementsByClassName(".dataTables_length")[0].addClass('bs-select');
        });
    }
}
</script>
<style>
   .table {
        max-width: none;
        table-layout: fixed;
        word-wrap: break-word;
    }
</style>