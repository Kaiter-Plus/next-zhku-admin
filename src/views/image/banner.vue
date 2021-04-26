<template>
  <div class="components-container" v-loading="bannerLoading">

    <!-- 展示当前展示的图片 -->
    <aside>
      <i class="el-icon-info" />
      <span>当前使用图片</span>
    </aside>
    <div class="banner" v-if="banner">
      <img class="banner-image" :src="banner.content" alt="庆祝建党 100 周年">
      <div class="banner-title__container">
        <span class="banner-title__tip">图片标题：</span>
        <el-input class="banner-title__input" :placeholder="banner.title" :disabled="true"></el-input>
      </div>
      <div class="banner-link__container">
        <span class="banner-link__tip">图片绑定的链接地址：</span>
        <el-input class="banner-link__input" :placeholder="banner.href" :disabled="true"></el-input>
      </div>
    </div>

    <!-- 需要上传的图片 -->
    <aside>
      <i class="el-icon-info" />
      <span>点击或者拖拽图片到下方框上传新的 Banner 图</span>
    </aside>
    <div v-if="tempBanner.content.length > 1" class="editor-container">
      <upload :imageUrl="tempBanner.content" :accept="accept" @file="handleFile" />
      <div class="banner-title__container">
        <span class="banner-title__tip">图片标题：</span>
        <el-input class="banner-title__input" placeholder="请输入图片标题" v-model="tempBanner.title" clearable />
      </div>
      <div class="banner-link__container">
        <span class="banner-link__tip">图片绑定的链接地址：</span>
        <el-input class="banner-link__input" placeholder="请输入与图片绑定的链接地址" v-model="tempBanner.href" clearable />
      </div>
    </div>

    <div class="banner-actions">
      <el-button size="middle" type="success" @click="uploadBanner">上传新的 Banner</el-button>
    </div>

  </div>
</template>

<script>
import { fetchImageByCategory, updateImageById } from '@/api/image'
import { BANNER } from '@/constant/image'
import Upload from '@/components/Upload/SingleImage4'

export default {
  name: 'Banner',
  components: { Upload },
  data() {
    return {
      // 定义可以上传的只能为图片
      acceptedFiles: ['bmp', 'jpeg', 'png', 'tif', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF', 'webp', 'avif'],
      // 显示加载动画
      bannerLoading: true,
      // Banner 对象
      banner: null,
      // 临时 Banner 对象
      tempBanner: {
        id: '',
        href: '',
        title: '',
        content: '',
      }
    }
  },
  created() {
    this.getBanner()
  },
  computed: {
    accept() {
      return this.acceptedFiles.map(file => {
        return `image/${file}`
      }).join(',')
    },
  },
  methods: {
    getBanner() {
      this.bannerLoading = true
      fetchImageByCategory(BANNER).then(({ data }) => {
        // 引用
        this.banner = data.item[0]
        // 直接拷贝
        this.tempBanner = Object.assign({}, data.item[0])
        // 关闭加载动画
        this.bannerLoading = false
      })
    },
    handleFile(file) {
      this.tempBanner.content = file
    },
    uploadBanner() {
      this.bannerLoading = true
      updateImageById(this.tempBanner).then(({ message }) => {
        this.banner = Object.assign({}, this.tempBanner)
        this.bannerLoading = false
        this.$message({
          message,
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.components-container {
  .banner {
    margin-bottom: 20px;
    .banner-image {
      width: 100%;
      border-radius: 5px;
    }
  }
  .banner-link__container,
  .banner-title__container {
    display: flex;
    line-height: 40px;
    margin: 10px 0 0;
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }
  .banner-link__container .banner-link__input,
  .banner-title__container .banner-title__input {
    flex: 1;
  }
  .banner-actions {
    display: flex;
    margin: 20px 0 0;
    justify-content: center;
  }
}
</style>