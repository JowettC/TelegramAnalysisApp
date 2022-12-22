<template>
<h3 class="Title fw-bold mt-4"> All Words - ({{state}})</h3>
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
                        <tbody class="table_body" v-if="used">
                            <tr v-for="word in data[state]" :key="word">
                                <td>{{ word[0] }}</td>
                                <td>{{ word[1] }}</td>
                            </tr>
                        </tbody>
                        <tbody class="table_body" v-else>
                            <tr v-for="word in data[state]" :key="word">
                                <td>{{ word[0] }}</td>
                                <td>{{ word[1] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
</template>
<script>
import $ from 'jquery'
import { DataTable } from "datatables.net";
export default {
    name:"DataTableWords",
    props: {
        data: Object,
        state: String,
    },
    methods:{
        DataTable: DataTable,
    },
    watch: { 
        // state: function() { // watch it
        //     $('.datatable').DataTable({
        //     "pagingType ": "simple",
        //     order: [[1, 'desc']],
        //     "columnDefs": [
        //         { "type": "html", "targets": 0 },
        //         { "type": "num" }
        //     ]
        // });
        // $('.datatable').each(function () {
        //     var datatable = $(this);
        //     // SEARCH - Add the placeholder for Search and Turn this into in-line form control
        //     var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
        //     search_input.attr('placeholder', 'Search');
        //     search_input.addClass('form-control input-sm');
        //     // LENGTH - Inline-Form control
        //     var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
        //     length_sel.addClass('form-control input-sm');
        // });
        // }
      },
    mounted(){
        // console.log(this.data)
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