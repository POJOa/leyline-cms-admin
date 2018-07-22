<template>
  <div class="simplemde-container" :style="{height:height+'px',zIndex:zIndex}">
    <textarea :id="id">
    </textarea>
  </div>
</template>

<script>
  import 'font-awesome/css/font-awesome.min.css'
  import 'simplemde/dist/simplemde.min.css'
  import SimpleMDE from 'simplemde'
  import {getUploadFileURL, getUploadToken} from '@/api/upload'

  require('./inline-attachment.min')
  require('./codemirror-4.inline-attachment.min')

  export default {
    name: 'simplemde-md',
    props: {
      previewRender: {
        type: Function
      },
      value: String,
      id: {
        type: String
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      },
      height: {
        type: Number,
        default: 150
      },
      zIndex: {
        type: Number,
        default: 10
      }
    },
    data() {
      return {
        simplemde: null,
        hasChange: false,
      }
    },
    watch: {
      value(val) {
        if (val === this.simplemde.value() && !this.hasChange) return
        this.simplemde.value(val)
        setTimeout(()=> this.simplemde.codemirror.refresh(),2000);

      }
    },
    mounted() {
      this.simplemde = new SimpleMDE({
        element: document.getElementById(this.id || 'markdown-editor-' + +new Date()),
        autoDownloadFontAwesome: false,
        autosave:{enabled:true,uniqueId:this.id},
        autofocus: this.autofocus,
        toolbar: this.toolbar,
        spellChecker: false,
        initialValue: this.value,
        insertTexts: {
          horizontalRule: ["", "\n\n-----\n\n"],
          image: ["![](", ")"],
          link: ["[", "]()"],
          table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
        },
        showIcons: ["undo","redo","code", "table", "horizontal-rule","heading-2","heading-3","strikethrough"],
        previewRender: this.previewRender,
        // hideIcons: ['guide', 'heading', 'quote', 'image', 'preview', 'side-by-side', 'fullscreen'],
        placeholder: this.placeholder
      })

      inlineAttachment.editors.codemirror4.attach(this.simplemde.codemirror, {
        uploadUrl:getUploadFileURL(),
        progressText:'![uploading file...]()',
        urlText:'![]({filename})',
        errorText:'Error uploading file',
        jsonFieldName:'fileDownloadUri',
        uploadFieldName:'file',
        // extraParams:{
        //   'referrer':referrer || 'default upload image',
        // },
        extraHeaders:getUploadToken(),
        onFileUploadResponse: function(xhr) {
          var result = JSON.parse(xhr.responseText),
            filename = result[this.settings.jsonFieldName];

          if (result && filename) {
            var newValue;
            if (typeof this.settings.urlText === 'function') {
              newValue = this.settings.urlText.call(this, filename, result);
            } else {
              newValue = this.settings.urlText.replace(this.filenameTag, filename);
            }
            var text = this.editor.getValue().replace(this.lastValue, newValue);
            this.editor.setValue(text);
            this.settings.onFileUploaded.call(this, filename);
          }
          return false;
        },
        onFileUploadError:function(data){
          console.log('err',data);
        }
      });

      this.simplemde.codemirror.on('change', () => {
        if (this.hasChange) {
          this.hasChange = true
        }
        this.$emit('input', this.simplemde.value())
        setTimeout(()=> this.simplemde.codemirror.refresh(),2000);

      })

      setTimeout(()=> this.simplemde.codemirror.refresh(),2000);

      },
    destroyed() {
      this.simplemde.toTextArea()
      this.simplemde = null
    }
  }
</script>

<style scoped>
  .simplemde-container>>>.CodeMirror {
    min-height: 150px;
  }

  .simplemde-container>>>.CodeMirror-scroll {
    min-height: 150px;
  }

  .simplemde-container>>>.CodeMirror-code {
    padding-bottom: 40px;
  }

  .simplemde-container>>>.editor-statusbar {
    /*display: none;*/
  }

  .simplemde-container>>>.CodeMirror .CodeMirror-code .cm-link {
    color: #1890ff;
  }

  .simplemde-container>>>.CodeMirror .CodeMirror-code .cm-string.cm-url {
    color: #2d3b4d;
  }

  .simplemde-container>>>.CodeMirror .CodeMirror-code .cm-formatting-link-string.cm-url {
    padding: 0 2px;
    color: #E61E1E;
  }
  .simplemde-container >>> .editor-toolbar.fullscreen,
  .simplemde-container >>> .CodeMirror-fullscreen {
    z-index: 1003;
  }

  .simplemde-container >>> .editor-preview-side{
    background: #ffffff!important;
  }

  .simplemde-container >>> .editor-preview{
    background: #ffffff!important;
  }
</style>
