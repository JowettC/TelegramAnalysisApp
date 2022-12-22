<template>
    <div class="container">
        <br />
        <div class="form-group col-12 col-sm-6 mx-auto p-2">
            <select class="form-select selectpicker" v-model="selected" @change="changeChat" data-live-search="true">
                <option :value="null"> Select a Chat</option>
                <option v-for="chat in chats" :value="chat.value" :key="chat.value">{{ chat.name }}</option>

            </select>
        </div>
        <div class="card col-12 col-sm-6 mx-auto results" v-if="selected != null">
            <div class="title text-center pt-3"> Results</div>
            
            <div class="row">
                <div class="col-12 col-sm-6">
                    <u>Yours</u>
                    <div class="content mb-3">
                        <br />
                        Total Message: <br /><b>{{ result.used.length }}</b>
                        <br />
                        Average Characters Per Msg: <br /><b>{{ result.usedLength / result.used.length }}</b>
                        <br />
                        Sentiment Score: <br /><b>{{ result.usedValue/ result.used.length }}</b>
                    </div>

                </div>
                <div class="col-12 col-sm-6">
                    <u>{{ data[selected].name }}</u>
                    <div class="content mb-3">
                        <br />
                        Total Message: <br /><b>{{ result.received.length }}</b>
                        <br />
                        Average Characters Per Msg: <br /> <b>{{ result.receivedLength / result.received.length }}</b>
                        <br />
                        Sentiment Score: <br /> <b>{{ result.receivedValue/ result.received.length }}</b>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>
<script>

import Sentiment from "sentiment";

export default {
    name: "SentimentOfText",
    data() {
        return {
            sentimentAnalysis: null,
            selected: null,
            result: {
                used: [],
                usedLength: 0,
                usedValue: 0,
                received: [],
                receivedLength: 0,
                receivedValue: 0
            },

        }
    },
    props: {
        data: Object
    },
    mounted() {
        this.sentimentAnalysis = new Sentiment();
    },
    computed: {
        chats() {
            var res = []
            for (var i = 0; i < this.data.length; i++) {
                res.push(
                    {
                        name: this.data[i].name,
                        value: i
                    }
                )
            }
            return res
        },

    },
    methods: {
        changeChat() {

            this.updateValues()
        },
        resetValue() {
            this.result.used = []
            this.result.usedValue = 0
            this.result.received = []
            this.result.receivedValue = 0
            this.result.usedLength = 0
            this.result.receivedLength = 0
        },
        updateValues() {
            this.resetValue()
            for (var i = 0; i < this.data[this.selected].messages.length; i++) {
                var message = this.data[this.selected].messages[i]

                try {
                    if (message.from.toLowerCase() == localStorage.getItem("name")) {
                        this.result.used.push(message.text)
                        this.result.usedLength += message.text.length
                        this.result.usedValue += this.sentimentAnalysis.analyze(message.text).score
                    }
                    else {
                        this.result.received.push(message.text)
                        this.result.receivedLength += message.text.length
                        this.result.receivedValue += this.sentimentAnalysis.analyze(message.text).score
                    }
                }
                catch {
                    // for special cases
                    console.log("skipping text")
                    continue;
                }

            }

        }

    }
}
</script>
<style scoped>
.results {
    min-height: 100px;
    /* width: 100%; */
    background-color: #f8f9fa;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    /* text-align:left */
}
</style>