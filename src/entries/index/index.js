import '@/css/index.less'
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper/dist/js/swiper.min.js'
import * as Validate from '@/utils/validateRegExp'
import isMobile from '@/utils/isMobile'
import $ from 'jquery'
import API from '@/utils/api'
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
if (isMobile) {
  new Swiper('#swiper-container', {
    autoplay: false,
    spaceBetween: 20,
    slidesOffsetBefore: 35
  })
} else {
  new Swiper('#swiper-container', {
    autoplay: false,
    spaceBetween: 20
  })
}
const oL = ($('#main-casebox-case-list').outerWidth() + $('.main-casebox-case-list-item').outerWidth() / 2) / 2
$('#main-casebox-case-list').scrollLeft(oL)

// 表单
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
        console.log(regExp)
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
    // console.log(res[0].value)
    let _formData = null
    if (window.location.href.indexOf('y.dxy.net') !== -1) {
      // 测试线
      _formData = {
        val_153665: res[0].value,
        val_153666: res[1].value,
        val_153667: res[2].value
      }
    } else {
      // 正式线
      _formData = {
        val_190059: res[0].value,
        val_190647: res[1].value,
        val_190061: res[2].value
      }
    }
    API.submitInfo(
      Object.assign(_formData, {
        token: res[3].value,
        token2: res[4].value,
        username: res[5].value,
        fid: res[6].value,
        sid: res[7].value
      })
     ).then(function (res) {
       if (res.success) {
         $('.submit-success').show()
         $('#btn-form').attr('disabled', 'disabled')
         $('#btn-form').css({'background': '#ccc'})
         $('#btn-form').on('hover', function () {
           $(this).css({'background': '#ccc'})
         })
         setTimeout(function () {
           $('.submit-success').hide()
         }, 3000)
       } else {
         alert('提交失败')
       }
     })
  }
})

$('#btn-form').on('click', function (e) {
  e.preventDefault()
  valiate.btnEvent()
})
// 下导航
window.onscroll = function (e) {
  // var ev = e || event
  var stop = document.body.scrollTop || document.documentElement.scrollTop
  // console.log(stop)
  if (stop > 5510) {
    $('.foot-box').hide()
  } else {
    $('.foot-box').show()
  }
}
// 刷新后下导航消失
window.onload = function () {
  window.scroll(0, 1)
}

