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

        <h3 class="Title fw-bold mt-4"> All Words</h3>
        <div class="text-center">

            <div id="wrap">
                <div class="container mb-4">
                    <table cellpadding="0" cellspacing="0" class="datatable table table-striped table-bordered mt-4">

                        <thead class="">
                            <tr>
                                <th>Word</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody class="table_body">
                            <tr v-for="word in data" :key="word[0]">
                                <td>{{ word[0] }}</td>
                                <td>{{ word[1] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { Bar } from 'vue-chartjs'
import $ from 'jquery'

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
import { DataTable } from "datatables.net";

export default {
    name: 'TopWords',
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
        DataTable: DataTable,

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
                datasets: [{ label: "Frequency", backgroundColor: 'rgb(255, 99, 132,0.5)', data: fcData }]
            }
        },

    },
    mounted() {


        $('.datatable').DataTable({
            "pagingType ": "simple",
            order: [[1, 'desc']],
            "columnDefs": [
                { "type": "html", "targets": 0 },
                { "type": "num" }
            ]
        });
        $('.datatable').each(function () {
            var datatable = $(this);
            // SEARCH - Add the placeholder for Search and Turn this into in-line form control
            var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
            search_input.attr('placeholder', 'Search');
            search_input.addClass('form-control input-sm');
            // LENGTH - Inline-Form control
            var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
            length_sel.addClass('form-control input-sm');
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

.table_body {
    font-weight: 500;
}
.filter-option{
    max-width:300px;
    margin:auto;
}
</style>