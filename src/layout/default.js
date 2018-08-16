import '@/css/reset.less'
import '@/css/layout.less'
import 'babel-polyfill'
import '@/font/iconfont.css'
// import isMobile from '@/utils/isMobile'
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper/dist/js/swiper.min.js'
import $ from 'jquery'
// $('.head-box').css({'z-index':2})
// const hei = $('.head-box').outerHeight()
// $('.place').outerHeight(hei)

$('.head-box-wrapper-nav').css({'zIndex': 2})
$('.back-top').css({'zIndex': 10})
$('.back-top-back').on('click', function () {
  $('html,body').animate({'scrollTop': 0}, 500)
})

$('.mobile-toggle-nav').on('click', function () {
  $('.mobile-toggle-nav').toggleClass('unfold')
  $('.head-box-wrapper-nav').toggleClass('show')
})

new Swiper('.swiper-container', {
  effect: 'fade',
  autoplay: {
    disableOnInteraction: false
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
})
