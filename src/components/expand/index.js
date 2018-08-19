import './index.less'

class Expand {
  /**
   * @param {object} option 配置项
   * @param {boolean} [option.accordion=false] 是否为手风琴模式
   */
  constructor ({ el, accordion = false }) {
    Object.assign(this, { accordion })
    this.$el = document.querySelector(el)
    this.$items = this.$el.querySelectorAll('.hbd-expand-item')
    this.initClickEvent()
  }
  /**
   * 初始化点击事件
   */
  initClickEvent () {
    for (let item of this.$items) {
      let title = item.querySelector('.hbd-expand-item_header')
      let current = item.querySelector('.hbd-expand-item_current')
      let content = item.querySelector('.hbd-expand-item_content')
      title.addEventListener('click', () => {
        let isActive = item.classList.contains('active')
        if (isActive) {
          item.classList.remove('active')
          current.style.height = '0px'
        } else {
          if (this.accordion) {
            this.closeAll()
          }
          item.classList.add('active')
          current.style.height = content.offsetHeight + 'px'
        }
      })
    }
  }
  /**
   * 关闭所有展开项
   */
  closeAll () {
    for (let item of this.$items) {
      if (item.classList.contains('active')) {
        item.classList.remove('active')
        let current = item.querySelector('.hbd-expand-item_current')
        current.style.height = '0px'
      }
    }
  }
}

export default Expand
