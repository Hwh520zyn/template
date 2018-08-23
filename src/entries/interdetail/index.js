import '@/css/interdetail.less'
import HbdVideo from '@/utils/video.js'
import isMobile from '@/utils/isMobile.js'
import Tabs from '@/components/tabs'
import $ from 'jquery'
import DxyShare from '@dxy/pure-components/dist/dxyShare'
// 分享
new DxyShare({
  container: '#dxy-share-sina',
  channels: ['sina']
})
new DxyShare({
  container: '#dxy-share-qzone',
  channels: ['qzone']
})

// 移动端分享
new DxyShare({
  container: '#icon-box-qzone',
  channels: ['sina']
})
new DxyShare({
  container: '#icon-box-wb',
  channels: ['qzone']
})
// new DxyShare({
//   container: '#dxy-share-idxy',
//   channels: ['idxy']
// })

// tabs 切换
new Tabs({
  el: '.main-interdebox-interde-contbox-cont-left',
  defaultActive: 1
})
// 视频
new HbdVideo({
  videoConfig: {
    width: isMobile ? 'auto' : 500,
    height: isMobile ? 'auto' : 330,
    stretch_patch: true
    // disable_drag: 1, // 禁止拖动
    // hide_h5_setting: true
  }
})
//分享划过切换
$('.main-sharebox-share-hover-icon li').on('mouseenter', function () {
  const index = $(this).index()
  $('.main-sharebox-share-hover-cont li').eq(index).addClass('show-li').siblings().removeClass('show-li')
})

$('.main-sharebox-share').on('click', function () {
  $('.main-sharebox-share-hover').toggleClass('show-share')
})

$('.mobile-share-brower').css({'zIndex': 999})

// 移动端分享

$('.other-nav-box-share').on('click', function () {
  $('.mobile-share-brower').show()
  $('body').addClass('over-body').removeClass('body-auto')
})

$('.mobile-share-brower ').on('click', '.share-cancle', function () {
  $('.share-box').show()
  $('.link-box').hide()
  $(this).parent().hide()
  $('body').addClass('body-auto').removeClass('over-body')
})

$('#icon-box-wx-friends, #icon-box-wx-circle').on('click', function () {
  const url = location.href
  $('.share-box').hide()
  $('.link-box').show()
  $('.link-box-textarea').html(url)
})

$('.prevent').on('click', function (e) {
  e.preventDefault()
})
