import './index.less'
import $ from 'jquery'
import './font/iconfont.css'
class ToggleBtn {
  constructor (btn) {
    this.btn = btn // 点击按钮
    this.init()
  }
  /**
   * 初始化
   */
  init () {
    this.toggle()
  }
  /**
   * 切换
   */
  toggle () {
    this.btn.on('click', function () {
      $(this).addClass('active').siblings().removeClass('active')
      const index = $(this).index()
      $('.hbd-QRcode-info-code img').eq(index).addClass('show').siblings().removeClass('show')
    })
  }
}
new ToggleBtn($('.hbd-QRcode-info-txtbox-txt li'))
