import './index.less'
import List from '../list/list'
import debounce from '@/utils/debounce'

class Search {
  /**
   * @param {object} config 配置项
   * @param {string} config.el 要挂载的 dom 选择器
   * @param {boolean} [config.showSearchList=true] 是否显示搜索列表
   * @param {string} [config.placeholder='搜索关键词'] 输入框的 placeholder
   * @param {function} [config.onSubmit] 提交表单事件，接受一个参数 value 为当前输入框的值
   * @param {function} [config.onChange] 输入修改时触发，接受一个参数 value 为当前输入框的值
   * @param {function} [config.onFocus] 输入框获取到焦点后触发
   * @param {function} [config.onBlur] 点击取消按钮后触发
   */
  constructor ({
    el,
    useSearchList = false,
    searchListKey = 'value',
    searchListItemKey = 'value',
    searchListApi = () => { },
    searchListDebounceTime = 500,
    searchListConfig = null,
    placeholder = '搜索关键词',
    onSubmit = () => { },
    onChange = () => { },
    onFocus = () => { },
    onBlur = () => { },
    onSuccess = () => { },
    onError = () => { },
    api = null,
    payloadKey = 'value'
  }) {
    Object.assign(this, {
      el,
      onSubmit,
      onChange,
      onBlur,
      onFocus,
      useSearchList,
      searchListConfig,
      searchListKey,
      searchListItemKey,
      searchListApi,
      searchListDebounceTime,
      api,
      payloadKey,
      onSuccess,
      onError
    })
    this.$el = document.querySelector(el)
    this.$container = this.$el.querySelector('.hbd-search')
    this.$form = this.$container.querySelector('.hbd-search_input .hbd-search-form')
    this.$input = this.$form.querySelector('input.hbd-search-form_input')
    this.$cancel = this.$container.querySelector('.hbd-search_cancel')
    this.$close = this.$container.querySelector('.hbd-search_input .icon-close')
    this.$content = this.$container.querySelector('.hbd-search_content')
    this.$list = this.$container.querySelector('.hbd-search_content .hbd-search-list')
    this._state = 'blur'
    this.initList()
    this.initSearchListToDo()
    this.initFormEvent()
    this.initInputEvent()
    this.initCancelEvent()
    this.initCloseEvent()
    this.placeholder = placeholder
    if (!useSearchList) this.showSearchList = false
  }
  /* ---------- 初始化各种事件 ---------- */
  /**
   * 初始化 form 事件
   */
  initFormEvent () {
    this.$form.addEventListener('click', e => {
      let state = this.state
      if (state === 'blur') this.state = 'focus'
    })
    this.$form.addEventListener('submit', e => {
      e.preventDefault()
      this.submitToDo()
    })
  }
  /**
   * 初始化 input 事件
   */
  initInputEvent () {
    this.$input.addEventListener('input', e => {
      let inputValue = this.value
      if (inputValue) this.state = 'input'
      else this.state = 'focus'
    })
  }
  /**
   * 初始化 取消按钮 事件
   */
  initCancelEvent () {
    this.$cancel.addEventListener('click', e => {
      this.state = 'blur'
    })
  }
  /**
   * 初始化 清空按钮事件
   */
  initCloseEvent () {
    this.$close.addEventListener('click', e => {
      this.$input.value = ''
      this.$input.focus()
      this.onChange(this.value)
    })
  }
  /* ---------- list 相关 ---------- */
  /**
   * 初始化搜索列表，操作搜索列表实例使用 this.SearchList
   */
  initList () {
    let baseConfig = {
      container: `${this.el} .hbd-search-list`,
      template: (data) => {
        return `<div class="hbd-search-list_item">${data[this.searchListItemKey] || ''}</div>`
      },
      initEvent: ($el, item) => {
        $el.addEventListener('click', () => {
          let value = item[this.searchListKey]
          this.$input.value = value
          this.submitToDo()
        })
      }
    }
    this.SearchList = new List({
      ...baseConfig,
      ...this.searchListConfig
    })
  }
  /**
   * 初始化搜索列表函数
   */
  initSearchListToDo () {
    this.searchListToDo = debounce(async () => {
      let res = await this.searchListApi({ [this.searchListKey]: this.value })
      if (!res || !res.success) throw Error(res)
      let list = res.results.items
      this.SearchList.list = list
    }, this.searchListDebounceTime).bind(this)
  }
  /**
   * 是否显示 搜索列表
   */
  get showSearchList () { return this._showSearchList }
  set showSearchList (val) {
    this._showSearchList = val
    if (!this.useSearchList) {
      this.$list.style.display = 'none'
      return
    }
    if (val) this.$list.style.display = 'block'
    else this.$list.style.display = 'none'
  }
  /**
   * 搜索组件的状态 共三种：blur，focus，input
   */
  get state () { return this._state }
  set state (val) {
    this._state = val
    if (val === 'blur') this.blurToDo()
    else if (val === 'focus') this.focusToDo()
    else if (val === 'input') this.inputToDo()
    else return
  }
  /**
   * 获取当前搜索输入框的值
   */
  get value () { return this.$input.value }
  get placeholder () { return this._placeholder }
  set placeholder (val) {
    this._placeholder = val
    this.$input.placeholder = val
  }
  /**
   * blur 触发
   */
  blurToDo () {
    this.$input.blur()
    this.$container.classList.remove('active')
    this.$input.value = ''
    this.onBlur()
    this.SearchList.list = []
  }
  /**
   * focus 触发
   */
  focusToDo () {
    this.showSearchList = true
    this.$input.focus()
    this.$container.classList.add('active')
    this.onFocus()
  }
  /**
   * 输入触发
   */
  inputToDo () {
    this.showSearchList = true
    let value = this.value
    this.onChange(value)
    if (this.useSearchList) {
      this.searchListToDo()
    }
  }
  /**
   * 提交表单
   */
  async submitToDo () {
    this.$input.blur()
    this.showSearchList = false
    this.onSubmit(this.value)
    if (!this.api) return
    try {
      let res = await this.api({ [this.payloadKey]: this.value })
      if (!res.success) throw Error(res)
      this.onSuccess(res)
      return res
    } catch (err) {
      this.onError(err)
    }
  }
}

export default Search
