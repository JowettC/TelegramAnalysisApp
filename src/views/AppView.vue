<template>
  <UploadSection @process="processFile" v-if="!file"/>
  <ResultSection :data="file" v-else/>
</template>

<script>
// @ is an alias to /src
import UploadSection from '@/components/UploadSection.vue'
import ResultSection from '@/components/ResultSection.vue'
// to remove this during staging/production
import myJson from '@/assets/result.json'

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
  mounted(){
    // to remove this during staging/production
    this.file = myJson
  },
  methods:{
    processFile(file){
      this.file = file;
    }
  }
}
</script>
