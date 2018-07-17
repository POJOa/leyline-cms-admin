<template>
  <div class="app-container">
    <el-header style="text-align: right; font-size: 12px">
      <el-button type="primary" @click="handleEdit()" plain>
        <i class="el-icon-edit"></i>
        <span>新增</span>
      </el-button>
    </el-header>
    <el-main>

      <el-table
      stripe
      :data="list"
      v-loading.body="listLoading"
      element-loading-text="Loading"
      :default-sort = "{prop: 'monthdiff', order: 'descending'}"
      border fit highlight-current-row>
        <el-table-column align="center" label='序号' width="95">
          <template slot-scope="scope">
            {{scope.$index}}
          </template>
        </el-table-column>
        <el-table-column label="栏目名">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="URL别名">
          <template slot-scope="scope">
            {{scope.row.alias}}
          </template>
        </el-table-column>
        <el-table-column label="静态文章ID">
          <template slot-scope="scope">
            {{scope.row.reference}}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index, scope.row)"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
import {getList,deleteById} from "@/api/category"

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.content
        this.listLoading = false
      })
    },
    handleEdit(idx,r){
      let pushDest = r ? { name: '栏目表单', params: { id: r.id }} : { name: '栏目表单' , params: { id: 'create'}}
      this.$router.push(pushDest)
    },
    handleDelete(idx,r){
      this.$confirm('删除不可逆，如有关联数据，删除将失败。', '提示', {
          confirmButtonText: '我确定要删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteById(r.id).then(res=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            this.fetchData()
          })

        }).catch((r) => {
          this.$message({
            type: r ? 'error' : 'info',
            message: '删除失败'
          });
        });
    },
  }
}
</script>
