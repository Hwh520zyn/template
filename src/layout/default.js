import '@/css/reset.less'
import '@/css/layout.less'
import 'babel-polyfill'
import '@/font/iconfont.css'
import '@/css/dxy-article.less'
import isMobile from '@/utils/isMobile'
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
  let url = this.location.search
  switch (url) {
    case '?news' : {
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