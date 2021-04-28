<template>
  <div style="position: relative;">
    <sticky :z-index="10" class="sub-navbar">
      <el-button icon="el-icon-plus" style="margin-left: 10px;" type="success" @click="createNews">
        新建新闻
      </el-button>
    </sticky>
    <div class="tab-container" v-loading="loading">
      <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
        <el-tab-pane v-for="item in tabMapOptions" :key="item.id" :label="item.description" :name="item.description">
          <keep-alive>
            <tab-pane v-if="activeName==item.description" :type="item.id" />
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { fetchAllNewsCategory, createNews } from '@/api/news'
import TabPane from './components/TabPane'
import Sticky from '@/components/Sticky'

export default {
  name: 'NewsTab',
  components: { TabPane, Sticky },
  data() {
    return {
      tabMapOptions: null,
      activeName: '',
      loading: false,
      dialogFormVisible: false,
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
      fetchAllNewsCategory().then(({ data }) => {
        this.tabMapOptions = data
        // 初始化 activeName
        this.activeName = this.tabMapOptions[0].description
        this.loading = false
      })
    },
    // 重置 temp
    resetTemp() {
      this.temp = {
        id: undefined,
        title: '',
        conver: '',
        author: '',
        summary: '',
        content: '',
        sourceLink: '',
        importance: 0,
        publishTime: '',
        status: 1,
        category: 1
      }
    },
    // 点击新建按钮
    createNews() {
      this.$router.push('/news/create')
    },
    handleSubmit() {
      createNews(this.temp).then(({ message }) => {
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


<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.tab-container {
  margin: 30px;
}
</style>
