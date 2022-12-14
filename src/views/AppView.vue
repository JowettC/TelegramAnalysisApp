<template>
  <UploadSection :process="processFile"/>
</template>

<script>
// @ is an alias to /src
import UploadSection from '@/components/UploadSection.vue'

export default {
  name: 'AppView',
  components: {
    UploadSection
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
