<template>
  <div class="app-container">
    <div class="previewHtml">
      <TopicPreview class="col-md-6 col-xs-6 col-sm-6 full-height"
                    :multiLang=form.latest.multiLang
                    :topic=form.latest
                    :tags=form.tags
                    id="contentPreview"
                    ref="contentPreview"
                    v-if="render"
      ></TopicPreview>
    </div>

    <el-tabs  stretch v-model="activeNames">
      <el-tab-pane label="基础数据" name="0">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="选择版本" v-if="id">
            <el-select style="width: 200px" :disabled="id==='create'" class="filter-item" v-model="form.latest" value-key="id" filterable placeholder="请选择版本">
              <el-option v-for="v in form.versions" :key="v.id" :label="v.mainVersion+'.'+v.subVersion" :value="v">
              </el-option>
            </el-select>
          </el-form-item>
          <h3>全局属性</h3>
          <el-form-item label="URL别名">
            <el-input width="200" placeholder="URL别名" v-model="form.name"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="栏目">
                <el-select style="width: 200px" class="filter-item" v-model="form.category" value-key="id" filterable placeholder="请选择栏目">
                  <el-option v-for="c in categories.content" :key="c.id" :label="c.name" :value="c">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他设置">
                <el-checkbox v-model="form.multiLang">多语言</el-checkbox>
                <el-checkbox v-model="form.featured">高亮</el-checkbox>
              </el-form-item>
            </el-col>

          </el-row>



          <el-form-item label="标签">
            <el-select multiple allow-create style="width: 100%" class="filter-item" value-key="name" v-model="form.tags" filterable placeholder="请选择Tag"  @change="handleTagsChange">
              <el-option v-for="t in tags.content" :key="t.name" :label="t.name" :value="t">
              </el-option>
            </el-select>
          </el-form-item>

          <h3>版本属性</h3>

            <el-form-item label="文章名">
              <el-input width="200" placeholder="文章名" v-model="form.latest.title"></el-input>
            </el-form-item>
              <el-form-item label="缩略图">

                    <el-upload
                      class="avatar-uploader"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :action="uploadAction"
                      :headers="uploadToken"
                    >
                      <img v-if="form.latest.thumbnail" :src="form.latest.thumbnail" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                <el-col :span="12">
                  <el-input v-model="form.latest.thumbnail"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="简介">
                <el-input v-model="form.latest.summary"  type="textarea" autosize></el-input>
              </el-form-item>
          <el-row>

            <el-col :span="24">

              <el-form-item label="版本信息">
                {{versionLbl}}
              </el-form-item>
            </el-col>

          </el-row>
          <el-footer style="margin-top:30px">
            <el-button type="primary" @click="onSubmit">{{id ? '修改':'创建'}}</el-button>
            <el-button @click="onCancel">返回</el-button>
          </el-footer>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="正文" name="1">

              <el-form label-position="left" label-width="180px">

                <div class="editor-container">
                  <el-row>
                    <markdown-editor
                      v-if="!loading"
                      :id="id+''"
                      ref="contentEditor"
                      v-model="form.latest.content"
                      :preview-render=previewRender
                      :uniqueId=id
                      :height="300"
                      :zIndex="20"
                    ></markdown-editor>

                  </el-row>
                </div>
              </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>　
import {updateOne, getByIdAdmin} from "@/api/topic"
import {getList as getCategoryList} from "@/api/category"
import {getList as getTagsList} from "@/api/tag"
import {getUploadFileURL, getUploadToken} from '@/api/upload'
import MarkdownEditor from '@/components/MarkdownEditor'
import TopicPreview from './topic_preview'
const moment = require('moment')

export default {
  created() {
    this.id = this.$route.params.id === 'create' ? null : this.$route.params.id
    this.fetchData(this.id)
  },
  data() {
    return {
      render:false,
      fileList:[],
      loading:true,
      id:null,
      centerDialogVisible: false,
      html: '',
      form: {
        featured:false,
        category:{id:null},
        createdAt:Date.now(),
        latest:{title:'',content: '',thumbnail:'',mainVersion:0,subVersion:0,published:false,createdAt:Date.now()},
        tags:[]
      },
      uploadAction: getUploadFileURL(),
      uploadToken:getUploadToken(),
      activeNames: '0',
      tags: [],
      categories: []
    }
  },
  components: { MarkdownEditor, TopicPreview },
  computed: {
    versionLbl: function () {
      let version = '版本号:'+this.form.latest.mainVersion+'.'+this.form.latest.subVersion
      let publishStatus = this.form.latest.published ? (' 发布:' + moment(this.form.latest.publishedAt).format(' YYYY-MM-DD HH:mm')):' 未发布'
      let saveStatus = this.form.latest.savedAt ? ' 保存:' + moment(this.form.latest.savedAt).format(' YYYY-MM-DD HH:mm') : ''
      let createStatus = this.form.latest.createdAt ? ' 创建:' + moment(this.form.latest.createdAt).format(' YYYY-MM-DD HH:mm') : ''

      return version+publishStatus +saveStatus+createStatus
    },

  },
  methods: {
    previewRender(txt){
      console.log(this.$refs.contentEditor.simplemde.isPreviewActive())
      this.render = this.$refs.contentEditor.simplemde.isPreviewActive()
      return this.$refs.contentPreview.$el.outerHTML
    },
    handleTagsChange(val){
      let newVal = this.form.tags[this.form.tags.length-1]
      let str = typeof newVal === 'object' ? newVal.name : newVal;
      this.form.tags = this.form.tags.filter((tag,index)=>{if(index>=this.form.tags.length-1) return true; if(typeof tag === 'string') return tag!==str;else return tag.name!==str;})
    },
    onSubmit() {
      this.form.tags = this.form.tags.map(tag => {
        if (typeof tag === 'string') {
          return {
            name: tag,
          }
        } else {
          return tag
        }
      });
      updateOne(this.form).then(()=>{
          this.$message({
            message: '提交成功!',
            type: 'success'
          })
          this.onCancel()
        }
      )
    },
    handleAvatarSuccess(res, file) {
      this.form.latest.thumbnail = file.response.fileDownloadUri;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type.indexOf('image')>=0;
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error('只能上传图片!');
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isJPG && isLt5M;
    },
    onCancel() {
      this.$router.back(-1)
    },
    onPreview(){

    },
    fetchData(id) {
      this.loading = true
      getCategoryList().then(res=>{
        this.categories = res
      })
      getTagsList().then(res=>{
        this.tags = res
        if(this.tags.length > 1) this.handleTagsChange()
      })
      if(id) {
        getByIdAdmin(id).then(res => {
          this.form = res;
          this.loading = false
          if (!this.form.latest.mainVersion) {
            this.form.latest.mainVersion = 0;
            this.form.latest.subVersion = 0;
          }
        })
      }
      else{
        this.loading = false
      }

    }
  }
}
</script>

<style>
  .editor-container{
    position: relative;
    height: 100%;
  }
  .el-tabs__content{
    overflow: unset;
  }
  .previewHtml{
    display: none;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 356px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 356px;
    height: 178px;
    display: block;
  }
</style>

