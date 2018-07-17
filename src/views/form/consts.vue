<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item v-for="c in constants" :key="c.id" :label="c.name">
        <el-input v-model="c.value"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {updateBatch, getList} from "@/api/consts"
export default {
  created() {
    // this.fetchData(this.id)
  },
  data() {
    return {
      form:{},
      constants:[]
    }
  },
  methods: {
    onSubmit() {
      updateBatch(this.constants).then(()=>{
          this.$message({
            message: '提交成功!',
            type: 'success'
          })
          this.onCancel()
        }
      )
    },
    reset() {
      this.form={
        field: '',
        rate: 0,
      }
    },
    onCancel() {
      // this.$router.back(-1)
    },
    fetchData() {
      getList().then(res=>this.constants=res)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

