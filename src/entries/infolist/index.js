import '@/css/infolist.less'
import '@/css/interdetail.less'
import '@/css/info.less'
import '@/css/articlelist.less'
// import PageList from '@/components/page-list'
// import PullList from '@/components/pull-list'
// import Loading from '@/components/loading'
// import isMobile from '@/utils/isMobile'
// import Api from '@/utils/api'
// import $ from 'jquery'

// function template (data) {
//   return `<div class="hbd-articleLists">
//   <div class="hbd-cardBox" id="hbd-cardBox">
//       <a href="javascript:;">
//           <div class="hbd-card1">
//               <div class="hbd-card1-left">
//                   <!-- img -->
//                   <img class="hbd-card1-left_img" src="${data.img}" alt="">
//                   <!-- END img -->
//               </div>
//               <div class="hbd-card1-content">
//                   <div class="hbd-card1-content-head verticalCenter">${data.title}
//                       <div class="hbd-card1-content-head_time textRight">2018 6-5</div>
//                   </div>
//                   <div class="hbd-card1-content-describe textLeft">
//                           ${data.content}
//                   </div>
//                   <div class="hbd-card1-content-detail verticalCenter">
//                       <div class="hbd-card1-content-detail-experts">
//                               丁香园 2018-08-01
//                       </div>
//                       <div class="hbd-card1-content-detail-experts-cont textRight main-sharebox-like"><i class="iconfont icon-z-like"></i> <span>点赞</span> </div>
//                   </div>
//               </div>
//           </div>
//       </a>
//   </div>
// </div>`
// }

// let baseConfig = {
//   listConfig: {
//     container: '#bottom-list-infolist',
//     template
//   },
//   api: Api.pageList,
//   params: {
//     page: 1,
//     size: 5
//   },
//   onSuccess (res)  {
//     let items = res.results.items.map(item => {
//       let title = item.title
//       return { ...item,
//         title
//       }
//     })
//     res.results.items = items
//     return res
//   },
//   onError (err) {
//     console.log(err)
//     console.log('请求出错了')
//   },
//   onInit () {
//     if (!isMobile) return
//     this.$loading = new Loading({
//       el: '#bottomPagination-infolist',
//       type: 'ballLine',
//       text: '正在加载中...'
//     })
//   },
//   onStop () {
//     this.$loading.dataless('没有更多了')
//   }
// }

// let pcConfig = {
//   ...baseConfig,
//   pageConfig: {
//     ele: '#bottomPagination-infolist',
//     cur: 1,
//     limit: 10,
//     total: 100
//   },
//   debounceTime: 500
// }
// let mobileConfig = {
//   ...baseConfig,
//   pullConfig: {
//     distance: 0,
//     ele: '#bottom-list-infolist',
//     maxError: 10
//   }
// }

// if (isMobile) new PullList(mobileConfig)
// else new PageList(pcConfig)

