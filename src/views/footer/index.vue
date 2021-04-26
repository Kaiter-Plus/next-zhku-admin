<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="学校地址:">
        <el-input v-model="form.address" />
      </el-form-item>

      <el-form-item label="邮政编码:">
        <el-input v-model="form.postCode" />
      </el-form-item>

      <el-form-item label="备案证号:">
        <el-input v-model="form.record" />
      </el-form-item>

      <el-form-item>

        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button type="danger" @click="onReset">清空</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchFooter, updateFooter } from '@/api/footer'

export default {
  name: 'Footer',
  data() {
    return {
      form: {
        address: '',
        postCode: '',
        record: ''
      }
    }
  },
  created() {
    this.getFooter()
  },
  methods: {
    getFooter() {
      fetchFooter().then(({ data, message }) => {
        this.form = data
        this.$message({
          message,
          type: 'success'
        })
      })
    },
    onSubmit() {
      updateFooter(this.form).then(({ message }) => {
        this.$message({
          message,
          type: 'success'
        })
      })
    },
    onReset() {
      this.form = {
        address: '',
        postCode: '',
        record: ''
      }
      this.$message({
        message: '清空完成!',
        type: 'success'
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

