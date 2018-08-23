import './index.less'
// 第三种web效果，当二级菜单显示的时候，底部加阴影
var mode3 = document.querySelector('.hbd-header-wrapper .hbd-second-nav-row')
if (mode3) {
  if (mode3.classList.contains('active')) {
    document.querySelector('.hbd-header-wrapper').classList.add('after-show')
  }
}
// 移动端菜单显示隐藏
document.querySelector('.open-nav-button').onclick = () => {
  document.querySelector('.hbd-header').classList.toggle('nav-open')
}

console.log('this message is from headerNav components!')
