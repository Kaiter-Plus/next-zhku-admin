<template>
  <div class="app-container">

    <div class="image-create" style="margin: 0 0 10px;text-align: right;">
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

      <el-table-column min-width="150px" label="预览">
        <template slot-scope="{row}">
          <span class="caroucel-image__container">
            <img class="caroucel-image" :src="row.content" :alt="row.title">
          </span>
        </template>
      </el-table-column>

      <el-table-column label="图片标题">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.title }}</span>
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
          <el-button v-if="row.edit" type="success" size="small" icon="el-icon-circle-check" @click="confirmEdit(row)">
            确定
          </el-button>
          <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="row.edit=!row.edit">
            编辑
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="handleRomove(row.id, $index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      :pageSizes="pageSizes" @pagination="getlist" />

    <el-dialog title="新建图片" :visible.sync="dialogFormVisible">
      <el-form :model="temp" label-position="left" label-width="90px" style="width: 80%; margin-left:50px;">

        <el-form-item label="类型" prop="title">
          <el-input v-model="category" disabled />
        </el-form-item>

        <el-form-item label="图片" prop="title">
          <upload :imageUrl="temp.content" :accept="accept" @file="handleFile" />
        </el-form-item>

        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>

        <el-form-item label="状态" prop="type">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择图片状态">
            <el-option v-for="(state, index) in status" :key="index" :label="state" :value="index" />
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="handleCreateImage">
          确 定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { SCHOOLSCENERY } from '@/constant/image'
import { fetchImageByCategory, updateImageById, removeImageById, createImage } from '@/api/image'
import Pagination from '@/components/Pagination'
import Upload from '@/components/Upload/SingleImage4'

export default {
  name: 'SchoolScenery',
  components: { Pagination, Upload },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      // 分页查询时使用
      listQuery: {
        page: 1,
        limit: 3
      },
      pageSizes: [3, 6, 9, 12],
      dialogFormVisible: false,
      temp: {
        id: undefined,
        title: '',
        content: '',
        status: 1,
        category: SCHOOLSCENERY
      },
      // 可选状态
      status: ['禁用', '启用'],
      // 定义可以上传的只能为图片
      acceptedFiles: ['bmp', 'jpeg', 'png', 'tif', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF', 'webp', 'avif'],
    }
  },
  computed: {
    accept() {
      return this.acceptedFiles.map(file => {
        return `image/${file}`
      }).join(',')
    },
    category() {
      return this.temp.category === SCHOOLSCENERY ? '校园风光' : '获取类型出错了'
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: undefined,
        title: '',
        content: '',
        status: 1,
        category: SCHOOLSCENERY
      }
    },
    getlist() {
      this.listLoading = true
      fetchImageByCategory(SCHOOLSCENERY, this.listQuery).then(({ data }) => {
        this.list = data.item
        this.total = data.total
        this.list.forEach(v => {
          this.$set(v, 'edit', false)
        })
        this.listLoading = false
      })
    },
    updateImage(data) {
      updateImageById(data).then(({ message }) => {
        this.$message({
          message,
          type: 'success'
        })
      })
    },
    handleCreate() {
      this.dialogFormVisible = true
    },
    disableImage(row) {
      row.status = 0
      this.updateImage(row)
    },
    enableImage(row) {
      row.status = 1
      this.updateImage(row)
    },
    confirmEdit(row) {
      row.edit = false
      this.updateImage(row)
    },
    handleFile(file) {
      this.temp.content = file
    },
    handleRomove(id, index) {
      removeImageById(id).then(({ message }) => {
        this.list.splice(index, 1)
        this.$message({
          message,
          type: 'success'
        })
      })
    },
    handleCreateImage() {
      createImage(this.temp).then(({ message }) => {
        this.$message({
          message,
          type: 'success'
        })
        this.list.push(this.temp)
        this.resetTemp()
        this.dialogFormVisible = false
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.caroucel-image__container {
  width: 100%;
  display: inline-block;
  .caroucel-image {
    width: 100%;
  }
}
</style>
