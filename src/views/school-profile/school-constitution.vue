<template>
  <div class="components-container">
    <div class="editor-container">
      <upload @file="handleFile" />
    </div>
    <div class="viewer">
      <div class="viewer-actions">
        <div class="viewer-actions__title">
          <el-tag>上传文件预览</el-tag>
        </div>
        <div class="viewer-actions__button">
          <el-button type="success" size="small" @click="handleSubmit">上传文件</el-button>
        </div>
      </div>
      <div class="viewer-container" v-if="pdf">
        <vue-pdf :page="pageNum" :src="pdf.content" @progress="loadedRatio=$event" @num-pages="total=$event">
        </vue-pdf>

        <pagination v-if="total>0" :total="total" :page.sync="page" @pagination="currentPage" layout="prev, pager, next"
          :limit="1" />
      </div>
    </div>
  </div>
</template>

<script>
import { SCHOOLCONSTITUTION } from '@/constant/image'
import { fetchImageByCategory, updateImageById } from '@/api/image'
import Upload from '@/components/Upload/SiglePdf'
import VuePdf from 'vue-pdf'
import Pagination from '@/components/Pagination'

export default {
  name: 'SchoolConstitution',
  components: { Upload, VuePdf, Pagination },
  data() {
    return {
      pdf: null,
      pageNum: 1,
      total: 0,
      loadedRatio: 0,
      page: 1
    }
  },
  created() {
    this.getPdf()
  },
  methods: {
    // 获取文件
    getPdf() {
      fetchImageByCategory(SCHOOLCONSTITUTION).then(({ data }) => {
        this.pdf = data.item[0]
        this.getNumPages()
      })
    },
    // 接收文件
    handleFile(file) {
      this.pdf.content = file
    },
    // 上传文件
    handleSubmit() {
      if (this.pdf.id) {
        updateImageById(this.pdf).then(() => {
          this.$message({
            message: '文件上传成功了',
            type: 'success'
          })
        })
      } else {
        this.$message({
          message: '获取文件失败了',
          type: 'error'
        })
      }
    },
    // 当前页
    currentPage({ page }) {
      this.pageNum = page
    },
    // 获取所有页数
    getNumPages() {
      let loadingTask = VuePdf.createLoadingTask(this.pdf.content)
      loadingTask.promise.then(pdf => {
        this.numPages = pdf.numPages
      }).catch(err => {
        console.error('pdf 加载失败', err);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.viewer {
  margin: 10px 0 0;
  .viewer-actions {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap-reverse;
  }
  .viewer-container {
    padding: 0 0 10px 0;
    border: solid 1px #d6d6d6;
    text-align: center;
  }
}
</style>