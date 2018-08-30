import '@/css/public.less'
import '@/css/interdetail.less'
import isMobile from '@/utils/isMobile'
import $ from 'jquery'
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper/dist/js/swiper.min.js'
new Swiper('.swiper-container', {
  effect: 'fade',
  autoplay: {
    disableOnInteraction: false
  }
})
$(document).on('click', function (e) {
  if (!isMobile) {
    e.preventDefault()
  }
})

$('.head-box-wrapper-nav-list-txt, .head-box-wrapper-logobox-logo').on('click', function () {
  window.location.href = '/'
})
$('.head-box-wrapper-nav-list-txt2').on('click', function () {
  window.location.href = '/channellist?news'
})
