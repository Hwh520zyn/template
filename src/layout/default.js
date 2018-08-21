import '@/css/reset.less'
import '@/css/layout.less'
import 'babel-polyfill'
import '@/font/iconfont.css'
import '@/css/dxy-article.less'
import isMobile from '@/utils/isMobile'

import $ from 'jquery'
// $('.head-box').css({'z-index':2})
// const hei = $('.head-box').outerHeight()
// $('.place').outerHeight(hei)

$('.head-box-wrapper-nav').css({'zIndex': 2})
$('.back-top').css({'zIndex': 10})
$('.banner-btn').css({'zIndex': 10})
$('.foot-box').css({'zIndex': 10})
if (isMobile) {
  $('.foot-place').outerHeight(0)
} else {
  const Hei = $('.main-copybox').outerHeight()
  $('.foot-place').outerHeight(Hei)
}

$('#back-top, #mobile-back').on('click', function () {
  $('html,body').animate({'scrollTop': 0}, 500)
})

$('.mobile-toggle-nav').on('click', function () {
  $('.mobile-toggle-nav').toggleClass('unfold')
  $('.head-box-wrapper-nav').toggleClass('show')
})

// 点赞
$('.main-sharebox-like').on('click', function () {
  $(this).addClass('active-like')
  $(this).find('span').html('已点赞')
})

// if (window.location.pathname !== '`/`' && window.location.pathname !== '/') {
//   $('.foot-place').hide()
// }

// if( isMobile ) {
// if (window.location.pathname !== '``' && window.location.pathname !== '') {
//   $('.mobile-search').show()
//   $('.head-box-wrapper-nav').hide()
// }
// }

// $('.index').on('click', function () {
//   window.location.href = '/'
// })
// $('.info').on('click', function () {
//   window.location.href = '/info'
// })
