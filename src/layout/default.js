import '@/css/reset.less'
import '@/css/layout.less'
import 'babel-polyfill'
import '@/font/iconfont.css'
// import _daEvent from '@/utils/da.js'
import $ from 'jquery'

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
