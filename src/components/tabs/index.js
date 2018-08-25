import './index.less'
class Tabs {
  /**
   * constructor
   * @param {object} options - 配置项
   * @param {string} options.el - 所属容器的选择器
   * @param {string} [options.tabSelector=.hbd-tabs-header] - tabs选择器
   * @param {string} [options.tabSelector=.hbd-tabs-header li] - tab选择器
   * @param {string} [options.contentSelector=.hbd-tabs-content_item] - 内容选择器
   * @param {string} options.activeClass - 选中要添加的class
   * @param {function} options.onChange - 切换时触发
   * @param {function} options.onInit - 初始化时触发
   * @param {function} options.getActive - 获取当前选中元素的函数
   * @param {function} options.defaultActive - 初始化要选中的 active
   */
  constructor ({
    el,
    tabsSelector = '.hbd-tabs-header',
    tabSelector = '.hbd-tabs-header li',
    contentSelector = '.hbd-tabs-content_item',
    activeClass = 'active',
    onChange = () => { },
    onInit = () => { },
    getActive,
    defaultActive
  }) {
    getActive = getActive || this.getActiveDefault
    Object.assign(this, { el, tabsSelector, tabSelector, contentSelector, activeClass, onChange, onInit, getActive, defaultActive })
    this.$tabs = {}
    this.init()
  }
  /* ---------- 初始化 ---------- */
  /**
   * 初始化函数
   */
  init () {
    this.initEl()
    this.initTabClickEvent()
    if (this.defaultActive !== null && this.defaultActive !== undefined) this.setActiveClass(this.defaultActive)
    let activeTab = this.active ? this.$tabs[this.active] : {}
    this.onInit(activeTab)
  }
  /**
   * 初始化 dom
   */
  initEl () {
    this.$el = document.querySelector(this.el)
    if (!this.$el) throw Error('Tabs initEl error')
    this.$tabsEl = this.$el.querySelector(this.tabsSelector)
    this.$el.querySelectorAll(this.tabSelector)
      .forEach(tab => {
        let active = this.getActive(tab)
        let content = this.getContentEl(active)
        let isDefaultActive = this.isDefaultDomActive(tab)
        if (active !== null && active !== undefined) {
          this.$tabs[active] = { tab, content }
        }
        if (isDefaultActive) {
          this._active = active
          content.classList.add(this.activeClass)
        } else {
          content.classList.remove(this.activeClass)
        }
      })
  }
  /**
   * 初始化 tab 的 click 事件
   */
  initTabClickEvent () {
    let tabs = this.$tabs
    for (let key in tabs) {
      let tab = tabs[key].tab
      tab.addEventListener('click', () => {
        this.active = this.getActive(tab)
      })
    }
  }
  /* ---------- 监测函数 ---------- */
  /**
   * 当前选择项
   */
  get active () { return this._active }
  set active (value) {
    let { current, old } = this.setActiveClass(value)
    this.onChange(current, old)
  }
  /**
   * 当前选择项选择后的操作
   * @param {any} value - 设置要选择的 key
   */
  setActiveClass (value) {
    let tabs = this.$tabs
    let old = tabs[this.active]
    let current = tabs[value]
    let activeClass = this.activeClass
    this._active = value
    if (old) {
      old.tab.classList.remove(activeClass)
      old.content.classList.remove(activeClass)
    }
    if (current) {
      current.tab.classList.add(activeClass)
      this.scrollToCenter(current.tab)
      current.content.classList.add(activeClass)
    }
    return { current, old }
  }
  /* ---------- 工具函数 ---------- */
  /**
   * 默认的，获取当前项的 active 值的函数
   * @param {HTMLelement} el - 要判断的 dom 节点
   */
  getActiveDefault (el) {
    return el.getAttribute('active')
  }
  /**
   *
   * @param {any} active - 当前选择项的 key
   */
  getContentEl (active) {
    let contentSelector = this.contentSelector
    let contents = this.$el.querySelectorAll(contentSelector)
    return [].find.call(contents, content => this.getActive(content) === active)
  }
  /**
   * 判断某个 dom 是否是默认的选中节点
   * @param {HTMLelement} el - 要判断的 dom 节点
   */
  isDefaultDomActive (el) {
    let activeClass = this.activeClass
    return [].includes.call(el.classList, activeClass)
  }
  scrollToCenter ($tab) {
    let allWidth = this.$tabsEl.offsetWidth
    let currentWidth = $tab.offsetWidth
    let currentLeft = $tab.offsetLeft
    this.$tabsEl.scrollLeft = currentLeft + currentWidth / 2 - allWidth / 2
  }
}

export default Tabs
