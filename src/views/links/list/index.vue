<template>
  <div class="tab-container" v-loading="loading">
    <div class="category-create" style="margin: 0 0 10px;text-align: right;">
      <el-button icon="el-icon-plus" style="margin-left: 10px;" type="success" @click="createLink">
        新建链接
      </el-button>
    </div>
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.id" :label="item.description" :name="item.description">
        <keep-alive>
          <tab-pane v-if="activeName==item.description" :type="item.id" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="新建链接" :visible.sync="dialogFormVisible">
      <el-form :model="temp" label-position="left" label-width="90px" style="width: 80%; margin-left:50px;">
        <el-form-item label="类型" prop="category">
          <el-select v-model="temp.category" class="filter-item" placeholder="请选择标题状态">
            <el-option v-for="(link, index) in tabMapOptions" :key="index" :label="link.description" :value="link.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="temp.link" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择链接类型">
            <el-option v-for="(state, index) in status" :key="index" :label="state" :value="index" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="handleSubmit">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchAllLinkCategory, createLink } from '@/api/link'
import TabPane from './components/TabPane'

export default {
  name: 'LinkTab',
  components: { TabPane },
  data() {
    return {
      tabMapOptions: null,
      activeName: '',
      loading: false,
      dialogFormVisible: false,
      temp: {
        id: undefined,
        title: '',
        link: '',
        status: 1,
        category: 1
      },
      // 可选状态
      status: ['禁用', '启用'],
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    this.getCategory()
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    getCategory() {
      this.loading = true
      fetchAllLinkCategory().then(({ data }) => {
        this.tabMapOptions = data
        // 初始化 activeName
        this.activeName = this.tabMapOptions[0].description
        this.loading = false
      })
    },
    createLink() {
      this.dialogFormVisible = true
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        title: '',
        link: '',
        status: 1,
        category: 1
      }
    },
    handleSubmit() {
      createLink(this.temp).then(({ message }) => {
        this.$message({
          message,
          type: 'success'
        })
        this.resetTemp()
        this.dialogFormVisible = false
        location.reload()
      })
    }
  }
}
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
