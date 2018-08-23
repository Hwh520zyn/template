export const renderFileListItem = ({ name, uploaded = false }) => `
<div class="file-name">
  <label>${name}</label>
  <em class="success"></em>
  <em class="delete"></em>
</div>
<div class="process-bar">
  <div class="percent" style="width: ${uploaded ? '100%' : '0%'}"></div>
</div>
`

export const emptyListHTML = '<div class="file-list-item empty">未选择</div>'

export const renderUploaderHTML = ({ accept, multiple }) => `
<div class="action">
  <input type="file" name="file" ${multiple ? 'multiple="multiple"' : ''} accept="${accept}">
  <button class="select">选择文件</button>
  <span class="tip">请使用指定的表单上传</span>
  <button class="upload" disabled="disabled">上 传</button>
  <button class="upload-loading">
    <div class=" lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </button>
</div>
<div class="file-list">
  ${emptyListHTML}
</div>
`
