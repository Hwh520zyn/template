import '@/css/interview.less'
import '@/css/articlelist.less'
import PageList from '@/components/page-list'
import PullList from '@/components/pull-list'
import Loading from '@/components/loading'
import Api from '@/utils/api'
import isMobile from '@/utils/isMobile'
import $ from 'jquery'

$('#arrow-box i').on('click', function () {
  $(this).css({'color': '#6B3EE0'}).siblings().css({'color': '#DDD'})
})

function template (data) {
  return `<div class="hbd-articleLists">
  <div class="hbd-cardBox" id="hbd-cardBox">
      <a href="/interdetail/${data.id}">
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
                  ${data.description}
                  </div>
                  <div class="hbd-card1-content-detail verticalCenter">
                      <div class="hbd-card1-content-detail-experts">
                      本期专家：${data.author}
                      </div>
                      <div class="hbd-card1-content-detail-experts-cont textRight">查看详情 <span></span> </div>
                  </div>
              </div>
          </div>
      </a>
  </div>
</div>`
}
// --------------------------------------
// api = Api.pageList
// 排序 -- 正序
$('#sort-normal').on('click', async function () {
  const params = {
    page: 1,
    size: 10,
    sort: 1
  }
  const res = await Api.pageList(params)
  window.page_list.pageChangeToDo(1, res)
  // console.log('res', res)
})

// 排序 -- 倒序
$('#sort-reverse').on('click', async function () {
  const params = {
    page: 1,
    size: 10,
    sort: 2
  }
  const res = await Api.pageList(params)
  window.page_list.pageChangeToDo(1, res)
  // console.log('res', res)
})
// 搜索
$('.common-search').on('change', async function (e) {
  const val = $(this).val()
  const params = {
    page: 1,
    size: 10,
    keywords: val
  }
  const res = await Api.pageList(params)
  window.page_list.pageChangeToDo(1, res)
})
// function param ( params = {} ) {
//   return params
// }
// -------------------------------------------
let baseConfig = {
  listConfig: {
    container: '#exampleList',
    template
  },
  api: Api.pageList,
  params: {
    page: 1,
    size: 10
  }, // 发送的参数 -------------
  onSuccess (res) {
    const res2 = res.results.items
    let items = res2.map(item => {
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
else {
  window.page_list = new PageList(pcConfig)

}

// 搜索框
$('#focus input').on('focus', function () {
  $('#focus').addClass('focus').removeClass('blur')
})
$('#focus input').on('blur', function () {
  $('#focus').addClass('blue').removeClass('focus')
})
