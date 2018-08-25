import FileUploadSdk from '@dxy/file-upload-sdk'
import './index.less'
import { renderUploaderHTML, renderFileListItem, emptyListHTML } from './tpl'

export default class Uploader {
  constructor ({
    container,
    accept,
    limitSize,
    multiple,
    single,
    syncUpload,
    files,
    onDelete,
    onSuccess,
    beforeDelete,
    uploadConfig
  }) {
    this.accept = accept || 'image/*'
    this.limitSize = limitSize || 1024 * 1024 * 50 // 默认限制50M
    this.multiple = multiple || false
    this.syncUpload = syncUpload || false
    this.single = single || false
    this.onDelete = onDelete || function () {}
    this.onSuccess = onSuccess || function () {}
    this.uploadConfig = uploadConfig || {}
    this.files = files || []
    this.beforeDelete = beforeDelete
    this.initEl()
    this.initEvents()
    this.renderFileList()
    if (container) {
      try {
        document.querySelector(container).appendChild(this.$el)
      } catch (error) {
        throw Error(`${container} 此选择器不存在`)
      }
    }
  }

  eqFile = targetFile => file =>
    targetFile.name === file.name && targetFile.size === file.size

  initEl () {
    this.$el = document.createElement('div')
    this.$el.className = 'uploader'
    this.$el.innerHTML = renderUploaderHTML({
      accept: this.accept,
      multiple: this.multiple
    })
    this.$ulpoad = this.$el.querySelector('.upload')
    this.$select = this.$el.querySelector('.select')
    this.$input = this.$el.querySelector('input[type=file]')
    this.$fileList = this.$el.querySelector('.file-list')
  }
  getLimtSizeText () {
    if (this.limitSize < 1048576) {
      const limit = (this.limitSize / 1024).toFixed(2)
      return `${limit}K`
    } else {
      const limit = (this.limitSize / 1024 / 1024).toFixed(2)
      return `${limit}M`
    }
  }
  alert (message) {
    return alert(message)
  }
  checkLimit (file) {
    if (file.size > this.limitSize) {
      this.alert(`文件${file.name} 大小超过${this.getLimtSizeText()}，无法上传`)
      return false
    }
    return true
  }
  initEvents () {
    // 选择文件按钮点击
    this.$select.onclick = event => {
      event.stopPropagation()
      event.preventDefault()
      this.$input.click()
    }

    // 触发文件选择
    this.$input.onchange = event => {
      if (event.target.files.length && this.files.length && this.single) {
        this.$input.value = ''
        this.alert('只能上传一个文件，请先删除列表中文件')
        return
      }
      // event.target.files为一个类数组，不是真正的输入，故采取for in 循环加key判断，Array.from 兼容性较差
      for (let key in event.target.files) {
        key && // 存在key
        !isNaN(key) && // 且key为数字
        !this.files.find(this.eqFile(event.target.files[key])) && // 且不存在此文件
        this.checkLimit(event.target.files[key]) && // 且通过条件限制
          this.files.push(event.target.files[key]) // 则添加此文件
      }
      this.$input.value = ''
      this.renderFileList()
    }

    // 文件上传
    this.$ulpoad.onclick = event => {
      console.log(' this.$ulpoad.onclick ')
      event.stopPropagation()
      event.preventDefault()
      this.upload()
    }

    // 删除
    this.$el.addEventListener('click', event => {
      if (event.target.className.indexOf('delete') > -1) {
        this.deleteFile(event.target.parentNode.parentNode)
      }
    })
  }
  async upload () {
    const files = this.files.filter(f => !f.uploaded)
    if (this.syncUpload) {
      for (let i = 0; i < files.length; i++) {
        await this.uploadFile(files[i])
      }
    } else {
      files.forEach(this.uploadFile)
    }
  }
  resetFile (file) {
    file.uploaded = false
    file.$el.className = 'file-list-item'
    file.$el.querySelector('.percent').style.width = '0%'
  }
  uploadSuccess (file, result) {
    console.log('success')
    file.$el.className += ' completed'
    file.uploaded = true
    this.onSuccess(file, result)
  }
  uploadFail (file, code, message) {
    this.alert(message)
    this.resetFile(file)
  }
  deleteFile (fileEl) {
    const fileIndex = this.files.findIndex(f => f.$el === fileEl)
    const file = fileIndex >= 0 ? this.files[fileIndex] : { $el: fileEl }
    const rs = this.beforeDelete && this.beforeDelete(file)
    if (rs instanceof Promise) {
      rs.then(() => this.deleteFileAct(file, fileIndex))
    } else {
      this.deleteFileAct(file, fileIndex)
    }
  }
  deleteFileAct (file, fileIndex) {
    this.files.splice(fileIndex, 1)
    this.renderFileList()
    this.onDelete(file)
  }
  uploadFile = file => new Promise((resolve, reject) => {
    new FileUploadSdk().upload({
      file,
      type: 1,
      publicAccess: true,
      ...this.uploadConfig,
      callback: rs => {
        resolve(true)
        this.uploadSuccess(file, rs)
      },
      process: (event, complete) => {
        file.$el.querySelector('.percent').style.width = `${complete}%`
        // console.log('loading', document.querySelector('.upload-loading'))
        document.querySelector('.upload-loading').style.display = 'block'
        document.querySelector('.upload').style.display = 'none'
        if (complete === 100 || '100') {
          document.querySelector('.upload-loading').style.display = 'none'
          document.querySelector('.upload').style.display = 'block'
        }
      },
      error: (code, message) => {
        reject(code)
        this.uploadFail(file, code, message)
      }
    })
  })
  renderFileList () {
    this.$fileList.innerHTML = this.files.length ? '' : emptyListHTML
    this.files.forEach(file => {
      file.$el = document.createElement('div')
      file.$el.className = 'file-list-item'
      if (file.uploaded) file.$el.className += ' completed'
      file.$el.innerHTML = renderFileListItem(file)
      this.$fileList.appendChild(file.$el)
    })
    if (this.files.length) {
      this.$ulpoad.disabled = false
    } else {
      this.$ulpoad.disabled = true
    }
  }
}
console.log('this message is from uploader components!')
