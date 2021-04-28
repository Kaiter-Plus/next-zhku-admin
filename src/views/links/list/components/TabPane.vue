<template>
  <div>

    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="链接标题">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="链接地址">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.link" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.link }}</span>
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

    <pagination :pageSizes="pageSizes" v-show="total>0" :total="total" :page.sync="pageQuery.page"
      :limit.sync="pageQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchLinkByCategory, updateLinkById, removeLinkById } from '@/api/link'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  props: {
    type: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      pageQuery: {
        page: 1,
        limit: 15
      },
      loading: false,
      pageSizes: [15, 30, 45, 60]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      fetchLinkByCategory(this.type, this.pageQuery).then(({ data, message }) => {
        this.list = data.item
        this.total = data.total
        this.list.forEach(v => {
          this.$set(v, 'edit', false)
        })
        this.loading = false
        this.$notify({
          title: '成功',
          message,
          type: 'success',
          duration: 1000
        })
      })
    },
    update(data) {
      updateLinkById(data).then(({ message }) => {
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
    handleRomove(id, index) {
      removeLinkById(id).then(({ message }) => {
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

