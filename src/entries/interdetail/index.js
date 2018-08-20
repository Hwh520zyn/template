import '@/css/interdetail.less'
import HbdVideo from '@/utils/video.js'
import isMobile from '@/utils/isMobile.js'
import Tabs from '@/components/tabs'
import $ from 'jquery'
new Tabs({
  el: '.main-interdebox-interde-contbox-cont-left',
  defaultActive: 1
})
new HbdVideo({
  videoConfig: {
    width: isMobile ? 'auto' : 500,
    height: isMobile ? 'auto' : 330,
    stretch_patch: true
    // disable_drag: 1, // 禁止拖动
    // hide_h5_setting: true
  }
})

$('.main-sharebox-share-hover-icon li').on('mouseenter', function () {
  const index = $(this).index()
  $('.main-sharebox-share-hover-cont li').eq(index).addClass('show-li').siblings().removeClass('show-li')
})

$('.main-sharebox-share').on('click', function () {
  $('.main-sharebox-share-hover').toggleClass('show-share')
})
