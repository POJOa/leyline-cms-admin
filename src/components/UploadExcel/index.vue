<template>
  <div>
    <input id="excel-upload-input" ref="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div id="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      拖动Excel文件至此或
      <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">浏览文件</el-button>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  props: {
    beforeUpload: Function,
    onSuccess: Function
  },
  data() {
    return {
      loading: false,
      excelData: {
        season: null,
        results: null
      }
    }
  },
  methods: {
    extractData( header, results ) {
      let roomIndice = null
      let priceIndice = null
      let season = null
      for(let i = 0 ; i < header.length; i++){
          if(header[i].indexOf('房号')> -1){
              roomIndice = header[i]
          }else if(header[i].indexOf('月电费') > -1){
              priceIndice = header[i]
          }
      }

      this.season = Math.floor((parseInt(priceIndice.split('-')[0])-1)/3) + 1
      results =  results.map(i=>{return {room:i[roomIndice],price:i[priceIndice] ? Math.ceil(i[priceIndice]): undefined}}).filter(j=>j.room!==undefined && j.price!==undefined && j.room.indexOf('合计')<0)
      return results
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0] // only use files[0]
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      document.getElementById('excel-upload-input').click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel
      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const fixedData = this.fixdata(data)
          const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
          const sheetNames = workbook.SheetNames
          const worksheets = workbook.Sheets
        //   const header = worksheets.map(ws=>this.get_header_row(ws))
          this.results = sheetNames.map(sn=>{return {region:sn,data:this.extractData(this.get_header_row(worksheets[sn]),XLSX.utils.sheet_to_json(worksheets[sn]))}})
          this.loading = false
          this.excelData.season = this.season
          this.excelData.results = this.results
          this.onSuccess && this.onSuccess(this.excelData)
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    fixdata(data) {
      let o = ''
      let l = 0
      const w = 10240
      for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    get_header_row(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
        var hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    }
  }
}
</script>

<style scoped>
#excel-upload-input{
  display: none;
  z-index: -9999;
}
#drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>