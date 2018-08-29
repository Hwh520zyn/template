import '@/css/public.less'
import '@/css/interdetail.less'
import isMobile from '@/utils/isMobile'
import $ from 'jquery'
$(document).on('click', function (e) {
  if (!isMobile) {
    e.preventDefault()
  }
})

$('.head-box-wrapper-nav-list-txt').on('click', function () {
  window.location.href = '/'
})
$('.head-box-wrapper-nav-list-txt2').on('click', function () {
  window.location.href = '/channellist?news'
})
