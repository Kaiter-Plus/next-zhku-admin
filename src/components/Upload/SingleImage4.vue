<template>
  <div class="upload-container">
    <el-upload v-show="!isUpload" :multiple="false" :show-file-list="false" :on-change="handleChange"
      class="image-uploader" :accept="accept" :auto-upload="false" drag action="">
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
    </el-upload>
    <div v-show="isUpload" class="image-preview">
      <div class="image-preview-wrapper">
        <img :src="src">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleImageUpload4',
  props: {
    imageUrl: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      src: ''
    }
  },
  computed: {
    isUpload() {
      return this.src.length > 1
    }
  },
  created() {
    this.src = this.imageUrl
  },
  watch: {
    imageUrl(val) {
      this.src = val
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.getBase64(file.raw).then(res => {
        // console.log(res); // debug
        this.src = res
        // 把 base64 的结果发送给父组件
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
    },
    rmImage() {
      this.src = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.upload-container {
  width: 100%;
  @include clearfix;
  .image-uploader {
    width: 100%;
  }
  .image-preview {
    width: 100%;
    border: 1px dashed #d9d9d9;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    .image-preview-wrapper {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
