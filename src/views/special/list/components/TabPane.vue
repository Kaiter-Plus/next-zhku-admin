<template>
  <div>
    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="专题标题">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="发布时间">
        <template slot-scope="{row}">
          <span>{{ new Date(row.publishTime) | parseTime }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="重要性">
        <template slot-scope="{row}">
          <svg-icon v-for="n in +row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="110">
        <template slot-scope="{row}">
          <el-button v-if="row.status" type="success" size="small" icon="el-icon-circle-check"
            @click="disableLink(row)">
            启用
          </el-button>
          <el-button v-else type="danger" size="small" icon="el-icon-circle-close" @click="enableLink(row)">
            禁用
          </el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="230">
        <template slot-scope="{row, $index}">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleUpdate(row.id)">
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
  </div>
</template>

<script>
import { fetchSpecialByCategory, updateSpecialById, removeSpecialById } from '@/api/special'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  props: {
    type: {
      type: Number,
      require: true
    }
  },
  filters: {
    parseTime
  },
  data() {
    return {
      list: null,
      total: 0,
      pageQuery: {
        page: 1,
        limit: 10
      },
      loading: false,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      fetchSpecialByCategory(this.type, this.pageQuery).then(({ data, message }) => {
        this.list = data.item
        this.total = data.total
        this.loading = false
        this.$notify({
          message,
          type: 'success',
          duration: 1000
        })
      })
    },
    update(data) {
      updateSpecialById(data).then(({ message }) => {
        this.$message({
          message,
          type: 'success'
        })
      })
    },
    disableLink(row) {
      row.status = 0
      this.update(row)
    },
    enableLink(row) {
      row.status = 1
      this.update(row)
    },
    confirmEdit(row) {
      row.edit = false
      this.update(row)
    },
    // 编辑新闻
    handleUpdate(id) {
      this.$router.push(`/special/edit/${id}`)
    },
    handleRomove(id, index) {
      removeSpecialById(id).then(({ message }) => {
        this.list.splice(index, 1)
        this.$message({
          message,
          type: 'success'
        })
      })
    }
  }
}
</script>

