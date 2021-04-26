<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="领导关怀标题:">
        <el-input v-model="form.title" />
      </el-form-item>

      <el-form-item label-width="120px" label="最后修改时间:">
        <el-date-picker v-model="form.publishTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择时间" />
      </el-form-item>

      <el-form-item prop="content" style="margin-bottom: 30px" label="领导关怀内容:">
        <Tinymce ref="editor" v-model="form.content" :height="400" />
      </el-form-item>

      <el-form-item>

        <el-button type="primary" @click="onSubmit">修改</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { LEADERCARE } from '@/constant/news'
import { fetchNewsByCategory, updateNewsById } from '@/api/news'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'LeaderCare',
  components: { Tinymce },
  data() {
    return {
      form: {
        title: '',
        publishTime: '',
        content: ''
      }
    }
  },
  created() {
    this.getArtical()
  },
  methods: {
    getArtical() {
      fetchNewsByCategory(LEADERCARE).then(({ data }) => {
        this.form = data.item[0]
      })
    },
    onSubmit() {
      updateNewsById(this.form).then(({ message }) => {
        this.$message({
          message,
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

