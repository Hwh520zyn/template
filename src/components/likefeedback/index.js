import './index.less'
import '@/htmlComponents/card'
import '@/htmlComponents/button'
import $ from 'jquery'

class VoteBtn {
  constructor (successBtn, cancelBtn) {
    this.successBtn = successBtn // 成功投票按钮
    this.cancelBtn = cancelBtn // 取消投票按钮
    this.init()
  }
  /**
   * 初始化
   */
  init () {
    this.success()
    this.cancel()
  }
  /**
   *  投票成功
   */
  success () {
    this.successBtn.on('click', function () {
      var num = $(this).prev().children().text() // 票数
      $(this).hide()
      $(this).prev().hide()
      $(this).next().hide()
      $(this).next().next().show()
      num++
      $(this).prev().children().text(num)
      const _this = this
      setTimeout(function () {
        $(_this).hide()
        $(_this).prev().show()
        $(_this).next().show()
        $(_this).next().next().hide()
      }, 3000)
    })
  }
  /**
   *  取消投票
   */
  cancel () {
    this.cancelBtn.on('click', function () {
      var num = $(this).prev().prev().children().text() // 票数
      $(this).hide()
      $(this).prev().show()
      $(this).prev().prev().show()
      num--
      $(this).prev().prev().children().text(num)
    })
  }
}

new VoteBtn($('.hbd-successVoted'), $('.hbd-cancleVoted'))
