import { getScrollTop, getClientHeight } from '@/utils/common'

/**
 * @constructor 无限加载组件
 * @param {Number} distance - 触发加载的距离
 * @param {String} ele - 无限加载触发元素
 * @param {function} onChange - 触发之后的回掉函数
 * @param {number} maxError - 最多请求失败多少次
 */
export default class InfiniteLoad {
  constructor ({
    distance = 0,
    ele,
    onChange = () => { },
    maxError = 10
  }) {
    Object.assign(this, {
      distance,
      ele,
      onChange,
      elHeight: 0,
      maxError
    })
    this.page = 0
    this.loading = false
    this.stop = false
    this._error = false
    this.errorTimes = 0
    this.init()
  }
  /**
   * 初始化
   */
  init () {
    this.initEvent()
  }
  /**
   * 初始化事件
   */
  initEvent () {
    let oldScroll = window.onscroll || (() => { })
    window.onscroll = () => {
      oldScroll()
      this.scrollToDo()
    }
  }
  /**
   * 滚动后出发的事件
   * @param {boolean} isInit - 是否为第一次
   */
  scrollToDo (isInit = false) {
    if (this.stop) {
      this.loading = false
      return
    }
    if (this.loading) return
    if (this.isThreshold()) {
      this.updateToDo(isInit)
    }
  }
  /**
   * 错误状态，如果错误，把 page - 1
   */
  get error () { return this._error || false }
  set error (val) {
    this._error = val
    if (val) {
      this.errorTimes++
      console.log('errorTimes', this.errorTimes)
      this.page > 0 && this.page--
    }
  }
  /**
   * 触发后需要调用的
   * @param {boolean} isInit - 是否为第一次请求
   */
  async updateToDo (isInit = false) {
    if (this.errorTimes >= this.maxError) return
    this.loading = true
    let old = this.page++
    try {
      await this.onChange(this.page, old, this.page === 1)
    } finally {
      if (!this.stop) {
        this.loading = false
        if (this.isThreshold()) this.updateToDo(isInit)
      }
    }
  }
  /**
   * 判断是否需要加载
   */
  isThreshold () {
    this.elHeight = document.querySelector(this.ele).offsetHeight
    return this.elHeight - this.distance <= getScrollTop() + getClientHeight()
  }
}
