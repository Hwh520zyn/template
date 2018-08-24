import '@/css/publicdetail.less'
import '@/css/interdetail.less'
import '@/css/info.less'
import Tabs from '@/components/tabs'
import $ from 'jquery'
new Tabs({
  el: '.main-interdebox-interde-contbox-cont-left',
  defaultActive: 1
})

// let num = 14
// $('.plus').on('click', function () {
//   let numplus = ++num
//   if (numplus >= 20) {
//     alert('不能再大了哦')
//     return
//   }
//   $('.main-bottom-list-item-txtbox p').css({'fontSize': numplus + 'px'})
// })
// $('.less').on('click', function () {
//   let numplus = --num
//   $('.main-bottom-list-item-txtbox p').css({'fontSize': numplus + 'px'})
//   if (numplus <= 10) {
//     alert('不能再小了哦')
//     return
//   }
// })
