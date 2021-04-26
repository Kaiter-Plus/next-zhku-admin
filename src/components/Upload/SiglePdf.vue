<template>
  <el-upload :multiple="false" :show-file-list="false" :on-change="handleChange" class="pdf-uploader"
    accept="application/pdf" :auto-upload="false" drag action="" :limit="1">
    <i class="el-icon-upload" />
    <div class="el-upload__text">
      将文件拖到此处，或<em>点击上传</em>
    </div>
  </el-upload>
</template>

<script>
export default {
  name: 'SinglePdf',
  props: {
    imageUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleChange(file) {
      this.getBase64(file.raw).then(res => {
        this.src = res
        this.$emit('file', res)
      });
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.pdf-uploader {
  ::v-deep.el-upload {
    width: 100%;
    .el-upload-dragger {
      width: 100%;
    }
  }
}
</style>
