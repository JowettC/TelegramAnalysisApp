<template>
  <div class="container">Results</div>
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button
        class="nav-link active"
        id="home-tab"
        data-bs-toggle="tab"
        data-bs-target="#home"
        type="button"
        role="tab"
        aria-controls="home"
        aria-selected="true"
      >
        Top Chats
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="profile-tab"
        data-bs-toggle="tab"
        data-bs-target="#profile"
        type="button"
        role="tab"
        aria-controls="profile"
        aria-selected="false"
      >
        Top Used Words
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="contact-tab"
        data-bs-toggle="tab"
        data-bs-target="#contact"
        type="button"
        role="tab"
        aria-controls="contact"
        aria-selected="false"
      >
        Top Received Words
      </button>
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div
      class="tab-pane fade show active"
      id="home"
      role="tabpanel"
      aria-labelledby="home-tab"
    >
      <FrequentChats :data="data['frequent_contacts']['list']" />
    </div>
    <div
      class="tab-pane fade"
      id="profile"
      role="tabpanel"
      aria-labelledby="profile-tab"
    >
      <TopUsedWords :data="allWords" />
    </div>
    <div
      class="tab-pane fade"
      id="contact"
      role="tabpanel"
      aria-labelledby="contact-tab"
    ></div>
  </div>
</template>
<script>
import FrequentChats from "@/components/charts/FrequentChats.vue";
import TopUsedWords from "@/components/charts/TopUsedWords.vue";
import stopwords from "@/assets/stopwords.json";
export default {
  name: "ResultSection",
  props: {
    data: Object,
  },
  components: {
    FrequentChats,
    TopUsedWords,
  },
  data() {
    return {
      name: "Jowett",
      stopwords: stopwords["stopwords"],
    };
  },
  methods: {},
  mounted() {
    // console.log(this.data)
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
          if (message["from"] == this.name) {
            try {
              var wordsSent = message["text"].split(" ");
              wordsSent.forEach(function (word) {
                if (stopwords["stopwords"].indexOf(word) == -1) {
                  if (word in allWords["used"]) {
                    allWords["used"][word] += 1;
                  } else {
                    allWords["used"][word] = 1;
                  }
                }
              });
            } catch {
              console.log("error");
              continue;
            }

            // console.log(wordsSent)
          }
        }
      }
      console.log(allWords);
      return allWords;
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
