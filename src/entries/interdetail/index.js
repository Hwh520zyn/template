import '@/css/interdetail.less'
import HbdVideo from '@/utils/video.js'
import isMobile from '@/utils/isMobile.js'
import Tabs from '@/components/tabs'
import $ from 'jquery'
import DxyShare from '@dxy/pure-components/dist/dxyShare'
import Api from '@/utils/api'
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

$('.like-inter, .icon-z-like').on('click', function (e) {
  const id = location.href
  const newid = id.replace(/[^0-9]/ig, '')
  // console.log(newid)
  Api.likearticle({id: newid}).then((res) => {})
})

