<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary"
      @click=" dialogVisible=true">
      上传
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload :multiple="true" :file-list="fileList" :show-file-list="true" :auto-upload="false"
        :on-remove="handleRemove" :on-change="handlechange" class="editor-slide-upload" action=""
        list-type="picture-card">
        <el-button size="small" type="primary">
          点击上传
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        取 消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确 定
      </el-button>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
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
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        console.log(this.listObj[objKeyArr[i]].uid, objKeyArr[i], uid);
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          console.log(this.listObj);
          return
        }
      }
    },
    handlechange(file) {
      const _self = this
      const fileName = file.uid
      this.listObj[fileName] = {}
      const img = new Image()
      img.src = file.url
      img.onload = function () {
        _self.listObj[fileName] = { uid: file.uid, width: this.width, height: this.height, url: file.url }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
