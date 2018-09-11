import '@/css/infodetail.less'
import '@/css/info.less'
import '@/css/publicdetail.less'
import '@/css/casedetail.less'
import '@/css/interdetail.less'
import Tabs from '@/components/tabs'
import $ from 'jquery'
// import DxyShare from '@dxy/pure-components/dist/dxyShare'
import Api from '@/utils/api'
new Tabs({
  el: '.main-interdebox-interde-contbox-cont-left',
  defaultActive: 1
})
$('.prevent').on('click', function (e) {
  e.preventDefault()
})
let num = 14
$('.plus').on('click', function () {
  let numplus = ++num
  $('.main-bottom-list-item-txtbox p').css({'fontSize': numplus + 'px'})
})
$('.less').on('click', function () {
  let numplus = --num
  $('.main-bottom-list-item-txtbox p').css({'fontSize': numplus + 'px'})
})
// // 分享
// new DxyShare({
//   container: '#dxy-share-sina',
//   channels: ['sina']
// })
// new DxyShare({
//   container: '#dxy-share-qzone',
//   channels: ['qzone']
// })

// // 移动端分享
// new DxyShare({
//   container: '#icon-box-qzone',
//   channels: ['sina']
// })
// new DxyShare({
//   container: '#icon-box-wb',
//   channels: ['qzone']
// })

$('.like-inter, .icon-z-like').on('click', function (e) {
  const id = location.href
  const newid = id.replace(/[^0-9]/ig, '')
  // console.log(newid)
  Api.likearticle({id: newid}).then((res) => {})
})
