<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" class="sub-navbar">
        <el-form-item v-if="!isEdit" prop="category" style="display:inline-block;">
          <el-select v-model="postForm.category" class="filter-item" placeholder="请选择类型">
            <el-option v-for="category in categories" :key="category.id" :label="category.description"
              :value="category.id" />
          </el-select>
        </el-form-item>
        <SourceUrlDropdown style="margin-left: 10px" v-model="postForm.sourceLink" />
        <el-button v-loading="loading" style="margin-left: 10px" type="success" @click="submitForm">
          发布
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                新闻标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="60px" label="作者:" class="postInfo-container-item">
                    <el-input v-model="postForm.author" placeholder="请输入作者" />
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item label-width="120px" label="发布时间:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.publishTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择时间" />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="90px" label="重要性:" class="postInfo-container-item">
                    <el-rate v-model="postForm.importance" :max="3" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1" :high-threshold="3" style="display: inline-block" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px" label-width="58px" label="摘要:">
          <el-input v-model="postForm.summary" :rows="1" type="textarea" class="article-textarea" autosize
            placeholder="请输入摘要内容" />
          <!-- <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}个字</span> -->
        </el-form-item>

        <el-form-item prop="cover" style="margin-bottom: 30px" label-width="58px" label="封面:">
          <Upload :imageUrl="postForm.cover" @file="handleFile" />
        </el-form-item>

        <el-form-item prop="content" style="margin-bottom: 30px">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage4'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
// import { validURL } from '@/utils/validate'
import { fetchNewsCategory, fetchNewsById, updateNewsById, createNews } from '@/api/news'
import { searchUser } from '@/api/remote-search'
import {
  CommentDropdown,
  PlatformDropdown,
  SourceUrlDropdown,
} from './Dropdown'

const defaultForm = {
  title: '',
  conver: '',
  author: '',
  summary: '',
  content: '',
  sourceLink: '',
  importance: 0,
  publishTime: '',
}

export default {
  name: 'NewsDetail',
  components: {
    Tinymce,
    MDinput,
    Upload,
    Sticky,
    CommentDropdown,
    PlatformDropdown,
    SourceUrlDropdown,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    // const validateRequire = (rule, value, callback) => {
    //   if (value === '') {
    //     this.$message({
    //       message: rule.field + '为必传项',
    //       type: 'error',
    //     })
    //     callback(new Error(rule.field + '为必传项'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validateSourceUri = (rule, value, callback) => {
    //   if (value) {
    //     if (validURL(value)) {
    //       callback()
    //     } else {
    //       this.$message({
    //         message: '外链url填写不正确',
    //         type: 'error',
    //       })
    //       callback(new Error('外链url填写不正确'))
    //     }
    //   } else {
    //     callback()
    //   }
    // }
    return {
      categories: null,
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        // image_uri: [{ validator: validateRequire }],
        // title: [{ validator: validateRequire }],
        // content: [{ validator: validateRequire }],
        // source_uri: [{ validator: validateSourceUri, trigger: 'blur' }],
      },
      tempRoute: {},
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.summary.length
    },
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    this.getCategory()

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    getCategory() {
      this.loading = true
      fetchNewsCategory().then(({ data }) => {
        // 排除学校介绍和领导关怀
        this.categories = data.filter(v => {
          return v.id > 2
        })
        this.loading = false
      })
    },
    fetchData(id) {
      fetchNewsById(id).then(({ data }) => {
        this.postForm = data

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      })
        .catch(err => {
          console.log(err)
        })
    },
    handleFile(file) {
      this.postForm.cover = file
    },
    setTagsViewTitle() {
      const title = '编辑文章'
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.postForm.id}`,
      })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑新闻'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      if (this.isEdit) {
        // 如果是编辑模式则更新文章
        updateNewsById(this.postForm).then(({ message }) => {
          this.$message({
            message,
            type: 'success'
          })
        })
      } else {
        // 否则添加新文章
        createNews(this.postForm).then(({ message }) => {
          this.$message({
            message,
            type: 'success'
          })
        })
      }
      // this.$refs.postForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     this.$notify({
      //       title: '成功',
      //       message: '发布文章成功',
      //       type: 'success',
      //       duration: 2000,
      //     })
      //     this.postForm.status = 'published'
      //     this.loading = false
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 60px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
