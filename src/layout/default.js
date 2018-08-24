import '@/css/reset.less'
import '@/css/layout.less'
import 'babel-polyfill'
import '@/font/iconfont.css'
import '@/css/dxy-article.less'
import isMobile from '@/utils/isMobile'
import Tabs from '@/components/tabs'
import $ from 'jquery'
// import dxyshare from  '@/utils/snsapi-v2'
// $('.head-box').css({'z-index':2})
// const hei = $('.head-box').outerHeight()
// $('.place').outerHeight(hei)

$('.head-box-wrapper-nav').css({'zIndex': 2})
$('.back-top').css({'zIndex': 10})
$('.banner-btn').css({'zIndex': 10})
$('.foot-box').css({'zIndex': 10})

// 返回顶部
$('#back-top, #mobile-back').on('click', function () {
  $('html,body').animate({'scrollTop': 0}, 500)
})

// 移动端nav
$('.mobile-toggle-nav').on('click', function () {
  $('.mobile-toggle-nav').toggleClass('unfold')
  $('.head-box-wrapper-nav').toggleClass('show')
})

// 点赞
$('.main-sharebox-like').on('click', function () {
  $(this).addClass('active-like')
  $(this).find('span').html('已点赞')
})

if (window.location.pathname !== '`/`' && window.location.pathname !== '/') {
  $('.foot-place').hide()
}

$( function () {
  function tabs (num) {
    new Tabs({
      el: '.main-interdebox-interde-contbox-cont-left',
      defaultActive: num
    })
  }
  let url = this.location.search
  switch (url) {
    case '?news' :{
      tabs(1)
      break
    }
    case '?character': {
      tabs(2)
      break
    }
    case '?hotspot': {
      tabs(3)
      break
    }
    case '?relation': {
      tabs(4)
      break
    }
    case '?manage': {
      tabs(5)
      break
    }
    case '?scholarship': {
      tabs(6)
      break
    }
  }
})

// console.log(dxyshare)