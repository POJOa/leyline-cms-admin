<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="创建日期">
        <el-date-picker
          v-model="form.createdAt"
          type="date"
          placeholder="选择创建日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{this.id ? '修改':'创建'}}</el-button>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {updateOne, getById} from "@/api/tag"
import {getList} from "@/api/category"

export default {
  created(){
    this.id = this.$route.params.id === 'create' ? null : this.$route.params.id
    this.fetchData(this.id)
    getList().then(res=>this.tags = res)
  },
  data() {
    return {
      tags:[],
      form:{
        name: '',
        createdAt: new Date(),
      }
    }
  },
  methods: {
    onSubmit() {
      updateOne(this.form).then(()=>this.onCancel())
    },
    reset() {
      this.form={
        tag:  {id:null}
      }
    },
    onCancel() {
      this.$router.back(-1)
    },
    fetchData(id) {
      id && getById(id).then(res=>this.form=res)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

