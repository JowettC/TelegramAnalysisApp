<template>
  <UploadSection :process="processFile" v-if="!file"/>
  <ResultSection :data="file" v-else/>
</template>

<script>
// @ is an alias to /src
import UploadSection from '@/components/UploadSection.vue'
import ResultSection from '@/components/ResultSection.vue'

export default {
  name: 'AppView',
  components: {
    UploadSection,
    ResultSection
  },
  data() {
    return {
      file:null
    }
  },
  methods:{
    processFile(file){
      this.file = file;
    }
  }
}
</script>
