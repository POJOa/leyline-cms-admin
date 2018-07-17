<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" :disabled="form.id !== undefined"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-select v-model="form.role" filterable placeholder="请选择权限">
          <el-option label="未验证用户" :value=0></el-option>
          <el-option label="一般用户" :value=1></el-option>
          <el-option label="管理员" :value=99></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="邮箱">
        <el-input v-model="form.mail"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="留空则为不修改"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-input v-model="form.avatar"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
          v-model="form.birthday"
          type="date"
          placeholder="选择生日">
        </el-date-picker>
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
import {updateOne, getById} from "@/api/user"
export default {
  created() {
    this.id = this.$route.params.id === 'create' ? null : this.$route.params.id
    this.fetchData(this.id)
  },
  data() {
    return {
      form: {
        name: '',
        serial: '',
        institute: '',
        contact: '',
      }
    }
  },
  methods: {
    onSubmit() {
      updateOne(this.form).then(()=>this.onCancel())
    },
    reset() {
      this.form={
        name: '',
        serial: '',
        institute: '',
        contact: '',
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

