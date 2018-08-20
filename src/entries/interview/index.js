import '@/css/interview.less'
import '@/css/articlelist.less'
import PageList from '@/components/page-list'
import PullList from '@/components/pull-list'
import Loading from '@/components/loading'
// 引入工具函数
import Api from '@/utils/api'
import isMobile from '@/utils/isMobile'
import $ from 'jquery'

$('#arrow-box i').on('click', function () {
  $(this).css({'color': '#6B3EE0'}).siblings().css({'color': '#DDD'})
})

// 引入模版相关样式文件

function template (data) {
  return `<div class="hbd-articleLists">
  <div class="hbd-cardBox" id="hbd-cardBox">
      <a href="/interdetail">
          <div class="hbd-card1">
              <div class="hbd-card1-left">
                  <!-- img -->
                  <img class="hbd-card1-left_img" src="${data.img}" alt="">
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
                      本期专家：于小宝 吴俊 李力
                      </div>
                      <div class="hbd-card1-content-detail-experts-cont textRight">查看详情 <span></span> </div>
                  </div>
              </div>
          </div>
      </a>
  </div>
</div>`
}

let baseConfig = {
  listConfig: {
    container: '#exampleList',
    template
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
    if (!isMobile) return
    this.$loading = new Loading({
      el: '#examplePagination',
      type: 'ballLine',
      text: '正在加载中...'
    })
  },
  onStop () {
    this.$loading.dataless('没有更多了')
  }
}

let pcConfig = {
  ...baseConfig,
  pageConfig: {
    ele: '#examplePagination',
    cur: 1,
    limit: 10,
    total: 100
  },
  debounceTime: 500
}
let mobileConfig = {
  ...baseConfig,
  pullConfig: {
    distance: 0,
    ele: '#exampleList',
    maxError: 10
  }
}

if (isMobile) new PullList(mobileConfig)
else new PageList(pcConfig)

$('#focus input').on('focus', function () {
  $('#focus').addClass('focus').removeClass('blur')
})
$('#focus input').on('blur', function () {
  $('#focus').addClass('blue').removeClass('focus')
})