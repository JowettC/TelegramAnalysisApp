<template>
  <button type="button" class="btn btn-success" @click="back()">Back</button>
  <div class="container">Results</div>
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab"
        aria-controls="home" aria-selected="true">
        Top Chats
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab"
        @click="changeDataIngest('used')" aria-controls="profile" aria-selected="false">
        Top Used Words
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab"
        @click="changeDataIngest('received')" aria-controls="contact" aria-selected="false">
        Top Received Words
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="sentiment-tab" data-bs-toggle="tab" data-bs-target="#sentiment" type="button"
        role="tab" aria-controls="contact" aria-selected="false">
        Analysis Of Chats
      </button>
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
      <FrequentChats :data="data['frequent_contacts']['list']" />
    </div>
    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
      <TopWords :data="allWords" :state="dataIngestType" />
    </div>
    <div class="tab-pane fade" id="sentiment" role="tabpanel" aria-labelledby="sentiment-tab">
      <SentimentOfText :data="data['chats']['list']" />
    </div>
  </div>

</template>
<script>
import FrequentChats from "@/components/charts/FrequentChats.vue";
import TopWords from "@/components/charts/TopWords.vue";
import stopwords from "@/assets/stopwords.json";
import SentimentOfText from "@/components/charts/SentimentOfText.vue";
export default {
  name: "ResultSection",
  props: {
    data: Object,
  },
  components: {
    FrequentChats,
    TopWords,
    SentimentOfText
  },
  data() {
    return {
      name: "Jowett",
      stopwords: stopwords["stopwords"],
      usedWords: [],
      dataIngestType: "used"
    };
  },
  methods: {
    changeDataIngest(type) {
      alert("It might take awhile to load when switching between used and received words")
      this.dataIngestType = type;
    },
    cleanData(jsonWords) {
      var res = { "used": [], "received": [] }
      for (var i = 0; i < jsonWords["used"].length; i++) {
        if (typeof (jsonWords["used"][i][1]) == 'number') {
          res.used.push(jsonWords["used"][i])
        }
      }
      for (var j = 0; j < jsonWords["received"].length; j++) {
        if (typeof (jsonWords["received"][j][1]) == 'number') {
          // console.log(jsonWords["received"][i])
          res.received.push(jsonWords["received"][j])
        }
      }

      return res
    },
    back() {
      this.$emit("back");
    },
  },
  mounted() {

  },
  computed: {
    allWords() {
      // get used and received words
      var allWords = {
        used: {},
        received: {},
      };
      for (var i = 0; i < this.data["chats"]["list"].length; i++) {
        var chat = this.data["chats"]["list"][i];
        for (var j = 0; j < chat["messages"].length; j++) {
          var message = chat["messages"][j];
          try {
            if (message["from"].toLowerCase() == localStorage.getItem("name")) {

              var wordsSent = message["text"].split(" ");
              wordsSent.forEach(function (word) {

                if (word != "") {
                  if (word.toLowerCase() in allWords["used"]) {
                    allWords["used"][word.toLowerCase()] += 1;
                  } else {
                    allWords["used"][word.toLowerCase()] = 1;
                  }
                }

              });

            }

            else {
              try {
                var wordsReceived = message["text"].split(" ");
                wordsReceived.forEach(function (word) {
                  if (word != "") {
                    if (word.toLowerCase() in allWords["received"]) {
                      allWords["received"][word.toLowerCase()] += 1;
                    } else {
                      allWords["received"][word.toLowerCase()] = 1;
                    }
                  }
                });
              } catch {
                //   some special cases
                continue;
              }
            }
          } catch {
            //   some special cases
            continue;
          }
        }
      }
      var usedWords = Object.keys(allWords["used"]).map(function (key) {
        return [key, allWords["used"][key]];
        // Sort the array based on the second element
      });
      usedWords.sort(function (first, second) {
        return second[1] - first[1];
      });

      var receivedWords = Object.keys(allWords["received"]).map(function (key) {
        return [key, allWords["received"][key]];
      });
      receivedWords.sort(function (first, second) {
        return second[1] - first[1];
      });
      // console.log(receivedWords)
      return this.cleanData({ used: usedWords, received: receivedWords });
    },
  },
};
</script>
<style scoped>
.active {
  font-weight: bold;
}

.nav-link {
  color: #000;
}
</style>
