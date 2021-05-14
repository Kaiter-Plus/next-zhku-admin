<template>
  <div class="home-container">
    <template v-if="finished < 4">
      <span class="home-title">欢迎来到仲恺农业工程学院管理系统</span>
      <img src="~@/assets/home_images/home.gif" class="emptyGif">
    </template>
    <template v-else>
      <panel-group :count="count" />
      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper">
            <pie-chart :count="count" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper">
            <bar-chart :count="count" />
          </div>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
// 请求
import { fetchImageCount } from '@/api/image'
import { fetchNewsCount } from '@/api/news'
import { fetchSpecialCount } from '@/api/special'
import { fetchLinkCount } from '@/api/link'

// 组件
import PanelGroup from './components/PanelGroup'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

export default {
  name: 'Home',
  components: { PanelGroup, PieChart, BarChart },
  data() {
    return {
      count: {
        image: null,
        news: null,
        special: null,
        link: null
      },
      finished: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      fetchImageCount().then(({ data }) => {
        this.count.image = data
        this.finished += 1
      })
      fetchNewsCount().then(({ data }) => {
        this.count.news = data
        this.finished += 1
      })
      fetchSpecialCount().then(({ data }) => {
        this.count.special = data
        this.finished += 1
      })
      fetchLinkCount().then(({ data }) => {
        this.count.link = data
        this.finished += 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  &-container {
    width: 100%;
    position: relative;
    height: calc(100vh - 84px);
    background-color: #e3e3e3;
    padding: 32px;
    text-align: center;
    .home-title {
      color: #fefefe;
      font-size: 2rem;
      text-shadow: 1px 1px 10px #c1c1c1, -1px -1px 10px #ffffff;
    }
    .emptyGif {
      display: block;
      width: 45%;
      margin: 0 auto;
    }
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
      border-radius: 5px;
      color: #fff;
    }
  }
}
</style>
