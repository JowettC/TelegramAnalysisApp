<template>
    <div class="upload">
        <div class="container text-center">
            <div class="mb-3">
                <input type="file" id="file-upload" class="form-control-file" @change="uploadFile()" ref="file"> <button
                    type="button" class="btn btn-success" :disabled="!file" @click="submitFile()">Upload</button>
            </div>

            <div class="mb-3 w-50 mx-auto">
                <div class="alert alert-danger" role="alert" v-if="error.state">
                    {{ error.msg }}
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name: 'UploadSection',
    components: {

    },
    data() {
        return {
            file: null,
            error: {
                state: false,
                msg: ''
            }
        }
    },
    methods: {
        uploadFile() {
            this.file = this.$refs.file.files[0];
            console.log(this.file.type)
            if (this.file.type != 'application/json') {
                this.error.state = true;
                this.error.msg = 'Please upload a json file';
                this.file = null;
            } else {
                this.error.state = false;
                this.error.msg = '';
            }
        },
        submitFile() {
            console.log(this.file)
        }
    }
}
</script>
<style>
#file-upload {
    width: 250px;
}
</style>