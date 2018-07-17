<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="栏目名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
       <el-form-item label="别名">
        <el-input v-model.number="form.alias"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type === 'STATIC'" label="静态文章ID">
        <el-input v-model.number="form.reference"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type === 'URL'" label="链接">
        <el-input v-model.number="form.reference"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" filterable placeholder="请选择类型">
          <el-option label="文章" value="TOPICS"></el-option>
          <el-option label="静态页" value="STATIC"></el-option>
          <el-option label="链接" value="URL"></el-option>
        </el-select>
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
import {updateOne, getById} from "@/api/category"
export default {
  created() {
    this.id = this.$route.params.id === 'create' ? null : this.$route.params.id
    this.fetchData(this.id)
  },
  data() {
    return {
      form: {
        name: '',
        createdAt: new Date(),
      }
    }
  },
  methods: {
    onSubmit() {
      updateOne(this.form).then(()=>{
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
        name: '',
        monthdiff: 0,
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

