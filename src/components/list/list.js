class List {
  /**
   * 列表
   * @constructor
   * @param {object} option - 配置项
   * @param {string} option.container - 列表的dom选择器
   * @param {template~callback} option.template
   * @param {initEvent~callback} option.initEvent
   * @param {any[]} [option.list=[]] - 列表的初始化数据
   *
   * @callback template~callback
   * @param {any} data - list数据的每一项
   * @returns {string} 要渲染的HTML字符串
   *
   * @callback initEvent~callback
   * @param {object} el - template渲染的每一个dom节点
   * @param {object} data - list数据的每一项
   * @description 为渲染好的节点添加事件，例如点击事件
   */
  constructor ({
    container,
    template = (() => ''),
    initEvent = () => { },
    list = []
  }) {
    Object.assign(this, { container, template, initEvent })
    this._list = list
    this.init()
  }
  /* ---------- 初始化函数 ---------- */
  /**
   * 初始化列表
   */
  init () {
    this.initEl()
    this.list = this._list
  }
  /**
   * 初始化 dom
   */
  initEl () {
    this.$el = document.querySelector(this.container)
    if (!this.$el) throw Error('创建 list 错误')
  }
  /* ---------- 状态存储 ---------- */
  /**
   * 列表数据
   * @description 设置该项会自动重新渲染 dom
   */
  get list () { return this._list }
  set list (value) {
    this._list = value
    this.setList()
  }
  /* ---------- 状态变更函数 ---------- */
  /**
   * list 的渲染函数
   */
  setList () {
    this.$list = this.$list || document.createElement('div')
    this.$list.innerHTML = ''
    this.$list.classList.add('hbd-list_content')
    this.list.forEach((item, index) => {
      let itemEl = document.createElement('div')
      itemEl.innerHTML = this.template(item, index)
      this.initEvent(itemEl, item)
      this.$list.appendChild(itemEl)
    })
    this.$el.appendChild(this.$list)
  }
}

export default List
