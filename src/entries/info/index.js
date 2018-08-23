import '@/css/info.less'
import Tabs from '@/components/tabs'
import '@/css/articlelist.less'
import PageList from '@/components/page-list'
// import PullList from '@/components/pull-list'
// import Loading from '@/components/loading'
// import isMobile from '@/utils/isMobile'
import Api from '@/utils/api'
import $ from 'jquery'
new Tabs({
  el: '.main-interdebox-interde-contbox-cont-left',
  defaultActive: 1
})

let baseConfig = {
  listConfig: {
    container: '#bottom-list',
    template (data) {
      return `<div class="hbd-articleLists">
      <div class="hbd-cardBox" id="hbd-cardBox">
              <div class="hbd-card1">
                  <div class="hbd-card1-left">
                      <!-- img -->
                    <a href="/infodetail/${data.id}" class="set">
                      <img class="hbd-card1-left_img" src="${data.img}" alt="">
                     </a>
                      <!-- END img -->
                  </div>
                  <div class="hbd-card1-content">
                      <div class="hbd-card1-content-head verticalCenter">${data.title}
                          <div class="hbd-card1-content-head_time textRight">2018 6-5</div>
                      </div>
                      <div class="hbd-card1-content-describe textLeft">
                              ${data.content}
                      </div>
                      <div class="hbd-card1-content-detail verticalCenter">
                          <div class="hbd-card1-content-detail-experts">
                                  丁香园 2018-08-01
                          </div>
                          <div class="hbd-card1-content-detail-experts-cont textRight main-sharebox-like"><i class="iconfont icon-z-like"></i> <span>点赞</span> </div>
                      </div>
                  </div>
              </div>
      </div>
    </div>`
    }
  },
  api: Api.pageList,
  params: {
    page: 1,
    size: 5
  },
  onSuccess (res)  {
    let items = res.results.items.map(item => {
      let title = item.title
      return { ...item,
        title
      }
    })
    res.results.items = items
    return res
  },
  onError (err) {
    console.log(err)
    console.log('请求出错了')
  },
  onInit () {
    // if (!isMobile) return
    // this.$loading = new Loading({
    //   el: '#bottomPagination',
    //   type: 'ballLine',
    //   text: '正在加载中...'
    // })
  },
  onStop () {
    this.$loading.dataless('没有更多了')
  }
}

let pcConfig = {
  ...baseConfig,
  pageConfig: {
    ele: '#bottomPagination',
    cur: 1,
    limit: 10,
    total: 100
  },
  debounceTime: 500
}
// let mobileConfig = {
//   ...baseConfig,
//   pullConfig: {
//     distance: 0,
//     ele: '#bottom-list',
//     maxError: 10
//   }
// }

// if (isMobile) new PullList(mobileConfig)
// else
new PageList(pcConfig)

$('#focus input').on('focus', function () {
  $('#focus').addClass('focus').removeClass('blur')
})
$('#focus input').on('blur', function () {
  $('#focus').addClass('blur').removeClass('focus')
})

// 点赞  .getAttribute('href') firstElementChild
$('.hbd-list_content').on('click', function (e) {
  var ev = e || event
  var target = ev.target || ev.srcElement
  const id = target.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.set').getAttribute('href')
  console.log(id)
  const newid = id.replace(/[^0-9]/ig, '')
  console.log(newid)
  if (target.nodeName.toLowerCase() === 'span') {
    target.innerHTML = '已点赞'
    target.parentElement.className += ' ' + 'active-like'
  }
})

