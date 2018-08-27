import $ from 'jquery'
var _da = require('@dxy/dxy-analytics')
!(function () {
  // 如果使用场景是在浏览器端，那么 window 下回有 _da
  console.log(_da)
  // 配置
  _da.config({
    env: 'production', // 默认：production，可选值：production、develop
    // 必填，表明产品
    queryData: [
      ['_setAccount', 'da-10002-24']
    ],
    debug: true
  })
  // 手动触发 pv、uv 的统计
  _da.pageInit()
})()

/**
 * _daEvent
 * @param {*} actionWord - 关键字
 */
function _daEvent (actionWord) {
  _da.trackEvent(['hbd_biz_yyh', actionWord], function (info) {
    console.log(info)
  })
}

/**
 * 首页打点
 * 1、
 */

// $('.main-right-img').on('click', function () {
//   alert(222)
// })
export default _daEvent
