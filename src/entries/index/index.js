import '@/css/index.less'
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper/dist/js/swiper.min.js'
import * as Validate from '@/utils/validateRegExp'
import $ from 'jquery'
new Swiper('.swiper-container', {
  effect: 'fade',
  autoplay: {
    disableOnInteraction: false
  }
//   pagination: {
//     el: '.swiper-pagination'
//   },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev'
//   }
})

class ValidateForm {
  constructor ({ el, validateReg, msgCallback = () => { } }) {
    Object.assign(this, {
      el: $(el) || [],
      validateReg: validateReg || [],
      result: null,
      sum: 0,
      msgCallback
    })
    this.init()
  }
  /**
   * 初始化
  */
  init () {
    this.validateEvent()
  }
  /**
   * 正则验证事件
   */
  validateEvent () {
    this.el.map((index, item) => {
      item.blur(() => {
        const regExp = this.validateReg[index]
        if (item.val() === '') {
          item.parent().addClass('empty-error').removeClass('error').removeClass('success')
        } else if (!regExp.test(item.val())) {
          item.parent().addClass('error').removeClass('success').removeClass('empty-error')
        } else {
          item.parent().addClass('success').removeClass('error').removeClass('empty-error')
        }
      })
    })
  }
  /**
   * 按钮提交事件
   */
  btnEvent () {
    this.sum = 0
    this.el.map((index, item) => {
      if (item.val() === '') {
        item.parent().addClass('empty-error').removeClass('success').removeClass('error')
      }
      if (item.parent().hasClass('error') || item.parent().hasClass('empty-error')) {
        console.log('hasClass error')
        this.sum++
      } else {
        // console.log(item.hasClass('error'))
        const info = item.parent().parent().serializeArray()
        this.result = info
      }
    })
    if (this.sum === 0) {
      this.msgCallback(this.result)
    }
  }
}
/**
 *  new
 */
const valiate = new ValidateForm({
  el: [
    $('#name-form'),
    $('#hosp-form'),
    $('#num-form')
  ],
  validateReg: [
    Validate.REALNAME,
    Validate.COMPANY,
    Validate.CELLPHONE
  ],
  btn: $('#btn-form'),
  msgCallback (res) {
    console.log(res)
  }
})

$('#btn-form').on('click', function (e) {
  e.preventDefault()
  valiate.btnEvent()
})

