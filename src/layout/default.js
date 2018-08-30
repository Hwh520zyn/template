import '@/css/reset.less'
import '@/css/layout.less'
import 'babel-polyfill'
import '@/font/iconfont.css'
import '@/css/dxy-article.less'
import '@/css/pagination.less'
import isMobile from '@/utils/isMobile'
import Api from '@/utils/api'
import Tabs from '@/components/tabs'
// import _daEvent from '@/utils/da.js'
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
  let u = location.pathname
  switch (u) {
    case '/': {
      $('.head-box-wrapper-nav-list-txt').addClass('style-fix').siblings().removeClass('style-fix')
      break
    }
    case '/channellist': {
      $('.head-box-wrapper-nav-list-txt2').addClass('style-fix').siblings().removeClass('style-fix')
      break
    }
    case '/case': {
      $('.head-box-wrapper-nav-list-txt2').removeClass('style-fix')
      break
    }
  }
  let config = {
    'news': 1,
    'character': 2,
    'hotspot': 3,
    'relation': 4,
    'manage': 5,
    'scholarship': 6
  }
  let url = location.search.slice(1)
  tabs(config[url])
  $('.head-box-wrapper-nav-list-txt2').addClass('style-fix').siblings().removeClass('style-fix')
})

//分享划过切换
$('.main-sharebox-share-hover-icon li').on('mouseenter', function () {
  const index = $(this).index()
  $('.main-sharebox-share-hover-cont li').eq(index).addClass('show-li').siblings().removeClass('show-li')
})

$('.main-sharebox-share').on('click', function () {
  $('.main-sharebox-share-hover').toggleClass('show-share')
  $(this).toggleClass('change-color-inter')
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
