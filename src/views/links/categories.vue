<template>
  <div class="app-container">

    <div class="category-create" style="margin: 0 0 10px;text-align: right;">
      <el-button icon="el-icon-plus" style="margin-left: 10px;" type="success" @click="createCategory">
        新建链接类型
      </el-button>
    </div>

    <el-table v-loading="categoryListLoading" :data="categoryList" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="链接类别标题">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.description" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.description }}</span>
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
          <el-button type="danger" size="small" icon="el-icon-delete" @click="handleRomove(row, $index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="pageQuery.page" :limit.sync="pageQuery.limit"
      @pagination="getcategoryList" />

    <el-dialog title="新建链接类型" :visible.sync="dialogFormVisible">
      <el-form :model="temp" label-position="left" label-width="90px" style="width: 80%; margin-left:50px;">

        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.description" />
        </el-form-item>

        <el-form-item label="状态" prop="type">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择标题状态">
            <el-option v-for="(state, index) in status" :key="index" :label="state" :value="index" />
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="createCategoryImage">
          确 定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchLinkCategory, createLinkCategory, updateLinkCategory, removeLinkCategory } from '@/api/link'
import Pagination from '@/components/Pagination'
import Upload from '@/components/Upload/SingleImage4'

export default {
  name: 'LinkCategories',
  components: { Pagination, Upload },
  data() {
    return {
      categoryList: null,
      total: 0,
      categoryListLoading: true,
      // 分页查询时使用
      pageQuery: {
        page: 1,
        limit: 20
      },
      dialogFormVisible: false,
      temp: {
        id: undefined,
        description: '',
        status: 1,
      },
      // 可选状态
      status: ['禁用', '启用'],
    }
  },
  created() {
    this.getcategoryList()
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: undefined,
        description: '',
        status: 1,
      }
    },
    getcategoryList() {
      this.categoryListLoading = true
      fetchLinkCategory(this.pageQuery).then(({ data }) => {
        this.categoryList = data.item
        this.total = data.total
        this.categoryList.forEach(v => {
          this.$set(v, 'edit', false)
        })
        this.categoryListLoading = false
      })
    },
    updateImage(data) {
      updateLinkCategory(data).then(({ message }) => {
        this.$message({
          message,
          type: 'success'
        })
      })
    },
    createCategory() {
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
    handleRomove(row, index) {
      removeLinkCategory(row).then(({ message }) => {
        this.categoryList.splice(index, 1)
        this.$message({
          message,
          type: 'success'
        })
      })
    },
    createCategoryImage() {
      createLinkCategory(this.temp).then(({ message }) => {
        this.$message({
          message,
          type: 'success'
        })
        this.categoryList.push(this.temp)
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
