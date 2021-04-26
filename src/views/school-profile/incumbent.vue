<template>
  <div class="app-container">

    <div class="carousel-create" style="margin: 0 0 10px;text-align: right;">
      <el-button icon="el-icon-plus" style="margin-left: 10px;" type="success" @click="handleCreate">
        新建图片
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="50px" label="预览">
        <template slot-scope="{row}">
          <span class="incumbent-image__container">
            <img class="incumbent-image" :src="row.content" alt="test">
          </span>
        </template>
      </el-table-column>

      <el-table-column label="图片标题">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="110">
        <template slot-scope="{row}">
          <el-button v-if="row.status" type="success" size="small" icon="el-icon-circle-check"
            @click="disableImage(row)">
            启用
          </el-button>
          <el-button v-else type="danger" size="small" icon="el-icon-circle-close" @click="enableImage(row)">
            禁用
          </el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="230">
        <template slot-scope="{row, $index}">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="handleRomove(row.id, $index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="pageQuery.page" :limit.sync="pageQuery.limit"
      @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="65%" :key="+new Date()">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px"
        style="width: 80%; margin-left:50px;" :rules="rules">

        <el-form-item label="类型" prop="category">
          <el-input v-model="category" disabled />
        </el-form-item>

        <el-form-item prop="image_uri" style="margin-bottom: 30px" label-width="58px" label="图片">
          <Upload :imageUrl="temp.content" :accept="accept" @file="handleFile" />
        </el-form-item>

        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>

        <el-form-item label="简介" prop="introduction">
          <Tinymce ref="editor" v-model="temp.introduction" :height="300" />
        </el-form-item>

        <el-form-item label="成就" prop="achievement">
          <Tinymce ref="editor" v-model="temp.achievement" :height="300" />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择图片状态">
            <el-option v-for="(state, index) in status" :key="index" :label="state" :value="index" />
          </el-select>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确 定
        </el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { INCUMBENT } from '@/constant/image'
import { fetchImageByCategory, updateImageById, removeImageById, createImage } from '@/api/image'
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage4'
import Pagination from '@/components/Pagination'

export default {
  name: 'Incumbent',
  components: { Tinymce, Upload, Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    translateStatusFilter(status) {
      const statusMap = {
        published: '已发布',
        draft: '草稿',
        deleted: '已删除'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      pageQuery: {
        page: 1,
        limit: 10
      },
      dialogFormVisible: false,
      temp: {
        id: undefined,
        title: '',
        content: '',
        introduction: '',
        achievement: '',
        status: 1,
        category: INCUMBENT
      },
      // 可选状态
      status: ['禁用', '启用'],
      // 定义可以上传的只能为图片
      acceptedFiles: ['bmp', 'jpeg', 'png', 'tif', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF', 'webp', 'avif'],
      dialogStatus: '',
      textMap: {
        update: '编辑图片内容',
        create: '添加新图片'
      },
      rules: {
        title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
        content: [{ required: true, message: '请上传图片', trigger: 'change' }],
        introduction: [{ required: true, message: '请填写简介', trigger: 'blur' }],
        achievement: [{ required: true, message: 'title is required', trigger: 'blur' }],
        status: [{ required: true, message: 'type is required', trigger: 'change' }],
      },
    }
  },
  computed: {
    accept() {
      return this.acceptedFiles.map(file => {
        return `image/${file}`
      }).join(',')
    },
    category() {
      return this.temp.category === INCUMBENT ? '现任领导' : '获取类型出错了'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: undefined,
        title: '',
        content: '',
        introduction: '',
        achievement: '',
        status: 1,
        category: INCUMBENT
      }
    },
    getList() {
      this.listLoading = true
      fetchImageByCategory(INCUMBENT, this.pageQuery).then(({ data }) => {
        this.list = data.item
        this.total = data.total
        this.list.forEach(v => {
          this.$set(v, 'edit', false)
          v.originalTitle = v.title //  will be used when user click the cancel botton
          return v
        })
        this.listLoading = false
      })
    },
    handleFile(file) {
      this.temp.content = file
    },
    updateImage(data) {
      updateImageById(data).then(({ message }) => {
        this.$notify({
          title: '成功',
          message,
          type: 'success',
          duration: 2000
        })
      })
    },
    updateData() {
      const tempData = Object.assign({}, this.temp)
      updateImageById(tempData).then(({ message }) => {
        const index = this.list.findIndex(v => v.id === this.temp.id)
        this.list.splice(index, 1, this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message,
          type: 'success',
          duration: 2000
        })
      })
    },
    disableImage(row) {
      row.status = 0
      this.updateImage(row)
    },
    enableImage(row) {
      row.status = 1
      this.updateImage(row)
    },
    handleFile(file) {
      this.temp.content = file
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleRomove(id, index) {
      removeImageById(id).then(({ message }) => {
        this.list.splice(index, 1)
        this.$notify({
          title: '成功',
          message,
          type: 'success',
          duration: 2000
        })
      })
    },
    createData() {
      createImage(this.temp).then(({ message }) => {
        this.$notify({
          title: '成功',
          message,
          type: 'success',
          duration: 2000
        })
        this.list.push(this.temp)
        this.resetTemp()
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.incumbent-image__container {
  width: 100%;
  display: inline-block;
  .incumbent-image {
    width: 100%;
  }
}
</style>
