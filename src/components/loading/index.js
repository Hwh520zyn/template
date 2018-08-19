import './index.less'

/**
 * 不同类型加载
 * @param {String} el - 容器
 * @param {String} type - 类型
 * @param {String} text - 提示文字
 */
export default class Loading {
  constructor ({
    el,
    type = 'ballLine',
    text = '努力加载中...'
  }) {
    Object.assign(this, {
      el: el,
      type: type,
      text: text
    })
    this.init()
  }

  init () {
    if (!this.el) {
      throw new Error('missing container')
    }
    this.loadingContainer = document.querySelector(this.el)
    this.assemblyComponent()
  }

  /**
   * loading 分类别， 合并生成最终结果
   */
  assemblyComponent () {
    let innerGraphic = ''
    switch (this.type) {
      case 'ballLine':
        innerGraphic = this.createType(2, 'ball_line_rotate')
        break
      case 'squareSpin':
        innerGraphic = this.createType(8, 'square_spin_fade')
        break
      default:
        throw new Error('there is no such type')
    }

    // 如果用户初始化设置文本信息
    if (this.text) {
      innerGraphic
        .appendChild(this.initText())
    }

    this
      .loadingContainer
      .appendChild(innerGraphic)
  }

  /**
   * @return 成样式一、样式二，返回内层左侧动画 div 容器（字符串形式）
   * @param {Number} num - 需要的 div 数量，补充 dom 节点
   * @param {String} outerClass - 最外层节点的 class
   */
  createType (num, outerClass) {
    let HBDLOADING = this.initLoadingContainer()
    let DIVS = this.getMoreDiv(num, outerClass)

    HBDLOADING
      .innerHTML = DIVS

    return HBDLOADING
  }

  /**
   * return 返回组件内层容器 含有class: hbd-loading hbd-loading__this.type
   */
  initLoadingContainer () {
    let container = document.createElement('div')

    container
      .classList
      .add('hbd-loading', 'hbd-loading__' + this.type)

    return container
  }

  /**
   * return - 返回文本信息部分
   */
  initText () {
    let textDiv = document.createElement('div')
    textDiv
      .classList
      .add('ball_line_hint')
    textDiv.innerHTML = '<span>' + this.text + '</span>'

    return textDiv
  }

  /**
   * @param {Number} num - 需要的 div 数量
   * @param {String} outerClass - 最外层节点的 class
   * @return - 返回对应数量的 div 闭合标签
   */
  getMoreDiv (num, outerClass) {
    let html = ''
    html += '<div class="' + outerClass + '">'
    for (var i = 0; i < num; i++) {
      html += '<div></div>'
    }
    html += '</div>'
    return html
  }

  /**
   * 当没有更多内容时，只显示的文字
   * @param {String}
   */
  dataless (dataLessText = '没有更多数据了') {
    this.loadingContainer
      .firstElementChild
      .childNodes[0]
      .style
      .display = 'none'

    let lineHint = this
      .loadingContainer
      .querySelector('.ball_line_hint')

    let lineHintSpan = this
      .loadingContainer
      .querySelector('.ball_line_hint span')

    lineHint.style.left = 0

    lineHintSpan.innerText = dataLessText
  }
}
